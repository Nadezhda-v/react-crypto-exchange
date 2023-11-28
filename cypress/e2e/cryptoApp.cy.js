/* eslint-disable no-undef */
import { round } from '../../src/utils/roundNumber';

describe('Форма авторизации', () => {
  beforeEach(() => {
    cy.visit('http://crypto-swift.vercel.app');
  });

  it('Некорректный ввод логина', () => {
    cy.get('#login').type('login');
    cy.get('#password').type('validPassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Логин некорректный').should('exist');
  });

  it('Некорректный ввод пароля', () => {
    cy.get('#login').type('validLogin');
    cy.get('#password').type('word');
    cy.get('button[type="submit"]').click();

    cy.contains('Пароль некорректный').should('exist');
  });

  it('Проверка на пустые поля', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Введите пароль').should('exist');
    cy.contains('Введите логин').should('exist');
  });

  it('Ввод логина/пароля незарегистрированного пользователя', () => {
    cy.get('#login').type('nullLogin');
    cy.get('#password').type('nullPassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Неверный логин или пароль').should('exist');
  });

  it('Ввод данных зарегистрированного пользователя', () => {
    cy.get('#login').type('developer');
    cy.get('#password').type('methed');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/crypto');
  });
});

describe('Форма перевода средств', () => {
  let initialBalanceFrom;
  let initialBalanceTo;
  let amount;

  beforeEach(() => {
    cy.visit('http://crypto-swift.vercel.app');

    cy.get('#login').type('developer');
    cy.get('#password').type('methed');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crypto');

    // Начальный баланс счета с которого переводятся средства
    cy.contains('#list li a', '24051911200915061003240821')
      .parent()
      .find('.Account_balance__1jt-C')
      .invoke('text')
      .then((text) => {
        initialBalanceFrom = parseFloat(text.replace(/[^\d.]/g, ''));
      });

    // Извлекаем баланс счета, на который переводятся средства
    cy.contains('#list li a', '74213041477477406320783754')
      .parent()
      .find('.Account_balance__1jt-C')
      .invoke('text')
      .then((text) => {
        initialBalanceTo = parseFloat(text.replace(/[^\d.]/g, ''));
      });

    // Переход на страницу с подробной информацией о счёте
    cy.contains('#list li a', '24051911200915061003240821').click();
    cy.url().should('include', '/crypto/account/24051911200915061003240821');
  });

  it('Некорректный счет', () => {
    cy.get('#to').type('12345678');
    cy.get('button[type="submit"]').click();

    cy.contains('Счет некорректный').should('exist');
  });

  it('Некорректная сумма перевода', () => {
    cy.get('#amount').type('45.');
    cy.get('button[type="submit"]').click();

    cy.contains('Неверный формат').should('exist');
  });

  it('Проверка на пустые поля', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Заполните поле').should('exist');
  });

  it('Проверка на перевод суммы не превышающей баланс', () => {
    const amountMoreThanBalance = initialBalanceFrom + 100;

    cy.get('#to').type('74213041477477406320783754');
    cy.get('#amount').type(amountMoreThanBalance);
    cy.get('button[type="submit"]').click();

    cy.contains('Недостаточно средств').should('exist');
  });

  it('Перевод средств', () => {
    amount = round(initialBalanceFrom * 0.01);

    cy.get('#to').type('74213041477477406320783754');
    cy.get('#amount').type(amount);
    cy.get('button[type="submit"]').click();

    // Проверка баланса после перевода
    initialBalanceFrom -= amount;
    initialBalanceTo += amount;
    let balanceFrom;
    let balanceTo;

    cy.get('#back').click();

    cy.contains('#list li a', '24051911200915061003240821')
      .parent()
      .find('.Account_balance__1jt-C')
      .invoke('text')
      .then((text) => {
        balanceFrom = parseFloat(text.replace(/[^\d.]/g, ''));
      });

    cy.contains('#list li a', '74213041477477406320783754')
      .parent()
      .find('.Account_balance__1jt-C')
      .invoke('text')
      .then((text) => {
        balanceTo = parseFloat(text.replace(/[^\d.]/g, ''));
      });

    expect(initialBalanceFrom).to.eq(balanceFrom);
    expect(initialBalanceTo).to.eq(balanceTo);
  });
});
