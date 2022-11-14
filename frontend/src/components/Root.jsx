import {
  React,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts';

function Root() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  const context = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.user) {
      navigate('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={context}>
      <header className="fixed-top border-bottom border-3 py-2 my-header fst-italic fw-bold">
        <a href="/" className="fs-4 text-decoration-none text-light">
          <span className="ms-3">
            Smack
          </span>
        </a>
      </header>
      <main>
        <Outlet />
      </main>
    </AuthContext.Provider>
  );
}

export default Root;
