import {
  React,
  useState,
  useMemo,
} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../contexts';
import AddChannelModal from './modals/AddChannel';
import RenameChannelModal from './modals/RenameChannel';
import RemoveChannelModal from './modals/RemoveChannel';

function Root() {
  const { t } = useTranslation();
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.user);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  const authContext = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);
  const navigate = useNavigate();
  const vdom = (
    <Button
      className="me-3"
      onClick={() => {
        logOut();
        navigate('/login');
      }}
    >
      {t('chat.logOutBtn')}
    </Button>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Navbar className="border-bottom border-3 my-header fst-italic fw-bold justify-content-between">
        <Navbar.Brand href="/" className="fs-4 text-light ms-3 ">
          Hexlet Chat
        </Navbar.Brand>
        {isLoggedIn ? vdom : null}
      </Navbar>
      <Outlet />
      <AddChannelModal />
      <RenameChannelModal />
      <RemoveChannelModal />
    </AuthContext.Provider>
  );
}

export default Root;
