import style from './Header.module.css';
import Layout from '../Layout';
import Logout from './Logout';
import Menu from './Menu';
import Logo from './Logo';

export const Header = () => (
  <header className={style.header}>
    <Layout>
      <div className={style.сontainer}>
        <Logo />
        <div className={style.right}>
          <Menu />
          <Logout />
        </div>
      </div>
    </Layout>
  </header>
);
