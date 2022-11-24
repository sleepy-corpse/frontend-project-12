import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../slices/modalSlice';
import { useSocket } from '../../hooks';

function RemoveChannelModal() {
  const [isSubmitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const socket = useSocket();
  const modal = useSelector((state) => state.modal);
  const currentChannelId = modal.type === 'removeChannel' ? modal.extra.channelId : null;
  const show = modal.isOpened && modal.type === 'removeChannel';
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
      >
        <span className="fw-bold fs-4 fst-italic">
          Remove the channel
        </span>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          socket.removeChannel(currentChannelId, () => {
            setSubmitting(false);
            dispatch(modalActions.closeModal());
          });
        }}
        >
          <p className="text-light fs-5 mb-4">
            Are you sure?
          </p>
          <Form.Group className="d-flex mt-2 justify-content-end">
            <Button
              autoFocus
              type="button"
              disabled={isSubmitting}
              className="me-2 border-0"
              variant="secondary"
              onClick={() => dispatch(modalActions.closeModal())}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="border-0 btn-danger"
            >
              Delete
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveChannelModal;
