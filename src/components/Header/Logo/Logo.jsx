import style from './Logo.module.css';
import { ReactComponent as LogoIcon } from './img/logo.svg';

export const Logo = () => (
  <div className={style.wrapper}>
    <LogoIcon className={style.logo} />
    <span className={style.text}>CryptoSwift</span>
  </div>
);
