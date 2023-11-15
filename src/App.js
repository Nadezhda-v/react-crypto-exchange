import Header from './components/Header';
import Main from './components/Main';
import { Route, Routes, useLocation } from 'react-router-dom';

export const App = () => {
  const location = useLocation();
  const isAuth = location.pathname === '/';

  return (
    <Routes>
      <Route path='*' element={
        <>
          {!isAuth && <Header />}
          <Main />
        </>
      } />
    </Routes>
  );
};
