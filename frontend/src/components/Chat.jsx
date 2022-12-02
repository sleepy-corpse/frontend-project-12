import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { useAuth } from '../hooks';
import Channels from './Channels';
import Messages from './Messages';
import { actions as channelsActions } from '../slices/channelsSlice';
import routes from '../routes';

export default function Chat() {
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, logOut } = useAuth();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchInitialData = async () => {
      console.log(1);
      const { token } = JSON.parse(localStorage.getItem('user'));
      const AuthHeader = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response = await axios.get(routes.dataPath(), {
          headers: AuthHeader,
        });
        dispatch(channelsActions.initChannels(response.data));
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          console.log(err);
          logOut();
        } else {
          console.log(err);
          toast.error(t('toasts.networkError'));
        }
      }
    };
    if (!isLoggedIn) {
      navigate(routes.loginPage());
    } else {
      fetchInitialData();
    }
  }, []);
  return (
    <Container className="my-shadow h-100 my-4 overflow-hidden text-light rounded-4">
      <Row className="h-100">
        {selectedChannelId
          ? (
            <>
              <Channels />
              <Messages />
            </>
          )
          : null}
      </Row>
    </Container>
  );
}
