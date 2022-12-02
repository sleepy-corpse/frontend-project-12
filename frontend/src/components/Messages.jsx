import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';
import { useFilter, useSocket } from '../hooks';

export default function Messages() {
  const filter = useFilter();
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectEntities);
  const lastId = useSelector(messagesSelectors.selectIds).at(-1);
  const lastMsg = messages[lastId];
  const selectedChannelId = useSelector((state) => state.channels.selectedChannelId);
  const selectedChannel = useSelector(channelsSelectors.selectEntities)[selectedChannelId];
  const currentMessages = Object.values(messages)
    .filter(({ channelId }) => channelId === selectedChannelId)
    .map((msg) => (
      <div className="text-break mb-2" key={msg.id}>
        <b>
          {msg.username}
        </b>
        {`: ${msg.body}`}
      </div>
    ));
  const messagesCount = currentMessages.length;

  const socket = useSocket();
  const messagesBox = useRef(null);

  useEffect(() => {
    if (lastMsg && lastMsg.channelId === selectedChannelId) {
      messagesBox.current.scrollTop = messagesBox.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Col className="my-bg-main d-flex flex-column p-0 h-100">
      <div className="mb-4 p-3 shadow my-channel-header">
        <p className="m-0">
          {'# '}
          <span>
            {selectedChannel ? selectedChannel.name : ''}
          </span>
        </p>
        <span>
          {t('chat.messagesCount', {
            count: messagesCount,
          })}
        </span>
      </div>
      <div ref={messagesBox} id="messages-box" className="chat-messages h-100 overflow-auto px-5 ">
        {currentMessages}
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
            body: filter.clean(values.messageBody),
            username: JSON.parse(localStorage.getItem('user')).username,
          }, (err) => {
            if (err) {
              setSubmitting(false);
              return;
            }
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
                <Form.Label htmlFor="messageBody" visuallyHidden>
                  {t('chat.messageInputLabel')}
                </Form.Label>
                <Form.Control
                  id="messageBody"
                  name="messageBody"
                  value={formik.values.messageBody}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder={t('chat.messageInputPlaceholder')}
                  disabled={formik.isSubmitting}
                  aria-label="Новое сообщение"
                />
              </Col>
              <Col>
                <Button
                  className="border-0 my-main-button"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t('chat.sendBtn')}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Col>
  );
}
