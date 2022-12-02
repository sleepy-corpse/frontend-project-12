import {
  React,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { AuthContext } from '../contexts';
import { actions as channelsActions } from '../slices/channelsSlice';
import AddChannelModal from './modals/AddChannel';
import RenameChannelModal from './modals/RenameChannel';
import RemoveChannelModal from './modals/RemoveChannel';
import routes from '../routes';

function Root() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.user);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    dispatch(channelsActions.reset());
    setLoggedIn(false);
  };
  const authContext = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(routes.loginPage());
    }
  }, [isLoggedIn]);
  const vdom = (
    <Button
      className="me-3"
      onClick={() => {
        logOut();
        navigate(routes.loginPage());
      }}
    >
      {t('chat.logOutBtn')}
    </Button>
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Navbar className="border-bottom border-3 my-header fst-italic fw-bold justify-content-between">
        <Navbar.Brand href={routes.rootPage()} className="fs-4 text-light ms-3 ">
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
