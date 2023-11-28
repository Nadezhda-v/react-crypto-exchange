/* eslint-disable no-undef */
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

describe('Список счетов и открытие нового', () => {
  it('Счета', () => {
    cy.visit('http://crypto-swift.vercel.app');

    cy.get('#login').type('developer');
    cy.get('#password').type('methed');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/crypto');

    cy.intercept('GET', '**/accounts').as('getAccounts');
    cy.wait('@getAccounts');

    // Список счетов
    cy.get('#list li')
      .should('have.length.above', 0);

    // Текущее количество счетов в списке
    let initialCardCount;
    cy.get('#list li').then(($listItems) => {
      initialCardCount = $listItems.length;
    });

    cy.get('#open-new-account').click();
    cy.get('#list li').should('have.length', initialCardCount + 1);
  });
});
