import style from './Main.module.css';
import Layout from '../Layout';
import { Route, Routes, useLocation } from 'react-router-dom';
import Auth from './Auth';
import List from './List';
import Account from './Account';
import Exchange from './Exchange';

export const Main = () => {
  const location = useLocation();
  const isNotAuth = location.pathname !== '/';

  return (
    <main className={`${style.main} ${isNotAuth ?
      style.noBackgroundImage : ''}`}>
      <Layout>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/crypto' element={<List />} />
          <Route path='/crypto/account/:id' element={<Account />} />
          <Route path='/exchange' element={<Exchange/>} />
        </Routes>
      </Layout>
    </main>
  );
};
