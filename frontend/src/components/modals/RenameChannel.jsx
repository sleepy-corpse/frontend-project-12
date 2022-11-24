import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { actions as modalActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

function MyModal() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const modal = useSelector((state) => state.modal);
  const channels = useSelector(channelsSelectors.selectEntities);
  const currentChannelId = modal.type === 'renameChannel' ? modal.extra.channelId : null;
  const channelName = modal.type === 'renameChannel' ? channels[currentChannelId].name : '';
  const channelsNames = Object.values(channels).map((channel) => channel.name);
  const show = modal.isOpened && modal.type === 'renameChannel';
  return (
    <Modal
      show={show}
      centered
      onHide={() => dispatch(modalActions.closeModal())}
      contentClassName="my-bg-main text-light"
    >
      <Modal.Header
        closeButton
        closeVariant="white"
        className=""
      >
        <span className="fw-bold fs-4 fst-italic">
          Rename the channel
        </span>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ channelName }}
          validationSchema={yup.object({
            channelName: yup.string()
              .required('The name is required')
              .min(3, 'The name has to be 3-20 characters long')
              .max(20, 'The name has to be 3-20 characters long')
              .notOneOf(channelsNames, 'The name must be unique'),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            socket.renameChannel({ id: currentChannelId, name: values.channelName }, () => {
              resetForm();
              setSubmitting(false);
              dispatch(modalActions.closeModal());
            });
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label visuallyHidden>
                  Channel Name
                </Form.Label>
                <Form.Control
                  autoFocus
                  name="channelName"
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder="Enter channel name"
                  disabled={formik.isSubmitting}
                  isInvalid={!formik.isValid}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.channelName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="d-flex mt-2 justify-content-end">
                <Button
                  type="button"
                  disabled={formik.isSubmitting}
                  className="me-2 border-0"
                  variant="secondary"
                  onClick={() => dispatch(modalActions.closeModal())}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="border-0 my-submit-button"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default MyModal;
