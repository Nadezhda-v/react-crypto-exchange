import style from './Main.module.css';
import Layout from '../Layout';
import { Route, Routes } from 'react-router-dom';
import Auth from './Auth';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Routes>
        <Route path='/' element={<Auth />} />
        {/* <Route path='/crypto' element={<List />}>
          <Route path='account/:id' element={<Account />} />
          </Route>
          <Route path='/exchange' element={<Exchange/>} />
          <Route path='*' element={<NotFound />} />*/}
      </Routes>
    </Layout>
  </main>
);
