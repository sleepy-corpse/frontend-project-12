import {
  React,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../contexts';
import AddChannelModal from './modals/AddChannel';
import RenameChannelModal from './modals/RenameChannel';
import RemoveChannelModal from './modals/RemoveChannel';
import { fetchInitialData } from '../slices/channelsSlice';

function Root() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };
  const authContext = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
    if (!localStorage.user) {
      navigate('/login');
    }
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <Navbar className="border-bottom border-3 my-header fst-italic fw-bold">
        <Navbar.Brand href="/" className="fs-4 text-light ms-3 ">
          Smack
        </Navbar.Brand>
      </Navbar>
      <Outlet />
      <AddChannelModal />
      <RenameChannelModal />
      <RemoveChannelModal />
    </AuthContext.Provider>
  );
}

export default Root;
