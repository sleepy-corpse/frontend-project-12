/* eslint-disable react/prop-types */
import { React, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { actions as channelsActions, selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { actions as modalActions } from '../slices/modalSlice';
import { useSocket } from '../hooks';

function Channels() {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectEntities);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const addChannel = () => {
    dispatch(modalActions.openModal({ type: 'addChannel' }));
  };

  const renameChannel = (id) => {
    dispatch(modalActions.openModal({
      type: 'renameChannel',
      extra: {
        channelId: id,
      },
    }));
  };

  const removeChannel = (id) => {
    dispatch(modalActions.openModal({
      type: 'removeChannel',
      extra: {
        channelId: id,
      },
    }));
  };

  const handleChannelSwitch = (id) => () => {
    dispatch(channelsActions.switchChannel(id));
  };

  const renderDropdown = (channel) => (
    <Dropdown as={ButtonGroup} className="d-flex">
      <Button
        variant={channel.id === selectedChannelId ? 'secondary' : ''}
        className="w-100 text-light text-truncate rounded-0 text-start"
        onClick={handleChannelSwitch(channel.id)}
      >
        <span className="me-1">
          #
        </span>
        {channel.name}
      </Button>
      <Dropdown.Toggle
        split
        variant={channel.id === selectedChannelId ? 'secondary' : ''}
        className="text-light"
      />
      <Dropdown.Menu className="super-colors">
        <Dropdown.Item onClick={() => renameChannel(channel.id)}>Rename</Dropdown.Item>
        <Dropdown.Item onClick={() => removeChannel(channel.id)}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderButton = (channel) => (
    <Button
      variant={channel.id === selectedChannelId ? 'secondary' : ''}
      className="w-100 text-light text-truncate rounded-0 text-start"
      onClick={handleChannelSwitch(channel.id)}
    >
      <span className="me-1">
        #
      </span>
      {channel.name}
    </Button>
  );

  return (
    <Col xs={4} md={2} className="my-bg-sidebar pt-5 px-0 border-end border-3 h-100 overflow-y-auto">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>channels</span>
        <button type="button" onClick={addChannel} className="my-icon-btn text-light btn btn-group-vertical p-0">
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
          <Nav.Item as="li" key={channel.id} className="w-100">
            {channel.removable ? renderDropdown(channel) : renderButton(channel)}
          </Nav.Item>
        ))}
      </Nav>
    </Col>
  );
}

function Messages() {
  const messages = useSelector(messagesSelectors.selectEntities);
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const selectedChannel = useSelector(channelsSelectors.selectEntities)[selectedChannelId];

  const socket = useSocket();
  const messagesBox = useRef(null);

  useEffect(() => {
    messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
  }, [messages]);

  return (
    <Col className="my-bg-main d-flex flex-column p-0 h-100">
      <div className="mb-4 p-3 shadow my-channel-header">
        <p className="m-0">
          #
          <span>
            {selectedChannel.name}
          </span>
        </p>
        <span>message count</span>
      </div>
      <div ref={messagesBox} id="messages-box" className="chat-messages h-100 overflow-auto px-5 ">
        {Object.values(messages)
          .filter(({ channelId }) => channelId === selectedChannelId)
          .map((msg) => (
            <div className="text-break mb-2" key={msg.id}>
              <b>
                {msg.username}
              </b>
              {`: ${msg.body}`}
            </div>
          ))}
      </div>
      <Formik
        initialValues={{
          messageBody: '',
        }}
        validationSchema={yup.object({
          messageBody: yup.string().required(),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setSubmitting(true);
          socket.addNewMessage({
            channelId: selectedChannelId,
            body: values.messageBody,
            username: JSON.parse(localStorage.getItem('user')).username,
          }, () => {
            resetForm();
            setSubmitting(false);
          });
        }}
      >
        {(formik) => (
          <Form
            className="p-4 border-top"
            onSubmit={formik.handleSubmit}
          >
            <Row>
              <Col xs={12} md={10} className="mb-1">
                <Form.Control
                  name="messageBody"
                  value={formik.values.messageBody}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Enter message"
                  disabled={formik.isSubmitting}
                />
              </Col>
              <Col>
                <Button
                  className="border-0 my-main-button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Send
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
}

export default function Chat() {
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
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
