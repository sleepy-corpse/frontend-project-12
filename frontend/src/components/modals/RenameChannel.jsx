import React, { useRef, useMemo, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik';
import { actions as modalActions } from '../../slices/modalSlice';
import { useFilter, useSocket } from '../../hooks';
import { selectors as channelsSelectors } from '../../slices/channelsSlice';

function RenameChannelModal() {
  const filter = useFilter();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const modal = useSelector((state) => state.modal);
  const channels = useSelector(channelsSelectors.selectEntities);
  const currentChannelId = modal.type === 'renameChannel' ? modal.extra.channelId : null;
  const channelName = modal.type === 'renameChannel' ? channels[currentChannelId].name : '';
  const channelsNames = Object.values(channels).map((channel) => channel.name);
  const show = useMemo(() => modal.isOpened && modal.type === 'renameChannel');
  const inputRef = useRef(null);

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  }, [show]);

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
          {t('modals.rename.header')}
        </span>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{ channelName }}
          validationSchema={yup.object({
            channelName: yup.string()
              .required(t('modals.errors.nameRequired'))
              .min(3, t('modals.errors.nameLength'))
              .max(20, t('modals.errors.nameLength'))
              .notOneOf(channelsNames, t('modals.errors.nameUnique')),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            socket.renameChannel(
              {
                id: currentChannelId,
                name: filter.clean(values.channelName),
              },
              (err) => {
                if (err) {
                  setSubmitting(false);
                  return;
                }
                resetForm();
                setSubmitting(false);
                dispatch(modalActions.closeModal());
                toast.success(t('toasts.renameChannel'));
              },
            );
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label visuallyHidden>
                  {t('modals.rename.header')}
                </Form.Label>
                <Form.Control
                  name="channelName"
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  placeholder={t('modals.rename.inputPlaceholder')}
                  disabled={formik.isSubmitting}
                  isInvalid={!formik.isValid}
                  ref={inputRef}
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
                  {t('modals.buttons.cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="border-0 my-submit-button"
                >
                  {t('modals.buttons.submit')}
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default RenameChannelModal;
