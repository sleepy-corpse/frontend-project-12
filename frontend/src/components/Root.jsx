import {
  React,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
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
      <Navbar className="border-bottom border-3 my-header fst-italic fw-bold">
        <Navbar.Brand href="/" className="fs-4 text-light ms-3 ">
          Smack
        </Navbar.Brand>
      </Navbar>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default Root;
