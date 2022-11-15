import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { fetchInitialData, selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

function Channels() {
  const channels = useSelector(channelsSelectors.selectEntities);

  return (
    <Col xs={4} md={2} className="my-bg-sidebar pt-5 px-0 border-end border-3">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>channels</span>
        <button type="button" className="my-icon-btn text-light btn btn-group-vertical p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1
              1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0
              0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
            />
          </svg>
        </button>
      </div>
      <Nav as="ul" variant="px-2 flex-column" fill>
        {Object.values(channels).map((channel) => (
          <Nav.Item as="li" key={channel.id}>
            <Button variant={channel.isSelected ? 'secondary' : 'outline-secondary border-0'} className="rounded-0 w-100 text-start text-light">
              <span className="me-1">
                #
              </span>
              {channel.name}
            </Button>
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}

function Messages() {
  const messages = useSelector(messagesSelectors.selectEntities);

  return (
    <Col className="my-bg-main d-flex flex-column p-0">
      <div className="mb-4 p-3 shadow my-channel-header">
        <p className="m-0"># channel-name</p>
        <span>message count</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5 ">
        {Object.values(messages).map((msg) => (
          <div className="text-break mb-2">
            <b>
              {msg.username}
            </b>
            {`: ${msg.body}`}
          </div>
        ))}
      </div>
    </Col>
  );
}

export default function Chat() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialData());
  }, []);
  return (
    <Container className="my-shadow h-100 my-4 overflow-hidden text-light rounded-4">
      <Row className="h-100">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
}
