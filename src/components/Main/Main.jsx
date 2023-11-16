import style from './Main.module.css';
import Layout from '../Layout';
import { Route, Routes, useLocation } from 'react-router-dom';
import Auth from './Auth';
import List from './List';

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
          {/* <Route path='account/:id' element={<Account />} />
            </Route>
            <Route path='/exchange' element={<Exchange/>} />
            <Route path='*' element={<NotFound />} />*/}
        </Routes>
      </Layout>
    </main>
  );
};
