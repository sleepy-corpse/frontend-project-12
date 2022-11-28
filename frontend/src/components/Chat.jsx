import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { fetchInitialData } from '../slices/channelsSlice';
import { useAuth } from '../hooks';
import Channels from './Channels';
import Messages from './Messages';

export default function Chat() {
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const dispatch = useDispatch();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchInitialData());
    } else {
      navigate('/login');
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
