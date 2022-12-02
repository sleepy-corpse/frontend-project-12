import { React, useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes';
import { useAuth } from '../hooks';

export default function LoginPage() {
  const { isLoggedIn } = useAuth();
  return (
    <Container
      className="d-flex align-items-center justify-content-center h-100"
    >
      {isLoggedIn ? <Navigate to={routes.rootPage()} /> : <LoginForm />}
    </Container>
  );
}

function LoginForm() {
  const { t } = useTranslation();
  const [isInvalid, setIsInvalid] = useState(false);
  const { logIn } = useAuth();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={yup.object({
        username: yup.string().required(),
        password: yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setIsInvalid(false);
        setSubmitting(true);
        try {
          const resp = await axios.post(routes.loginPath(), values);
          window.localStorage.user = JSON.stringify(resp.data);
          logIn();
        } catch (error) {
          if (error.code === 'ERR_BAD_RESPONSE') {
            toast.error(t('toasts.networkError'));
            return;
          }
          setIsInvalid(true);
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form
          className="p-4 border rounded-4 border-5 my-form"
          onSubmit={formik.handleSubmit}
        >
          <div
            className="fw-bold fst-italic text-light text-end fs-2 border-bottom"
          >
            {t('loginPage.header')}
          </div>
          <Form.Group controlId="username" className="position-relative">
            <Form.Label className="fw-bold fs-4 fst-italic text-light">{t('loginPage.username')}</Form.Label>
            <Form.Control
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder={t('loginPage.usernamePlaceholder')}
              required
              isInvalid={isInvalid}
            />
          </Form.Group>
          <Form.Group className="mt-2 position-relative" controlId="password" md="3">
            <Form.Label className="fw-bold fs-4 fst-italic text-light">{t('loginPage.password')}</Form.Label>
            <Form.Control
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder={t('loginPage.passwordPlaceholder')}
              required
              isInvalid={isInvalid}
            />
            <Form.Control.Feedback tooltip type="invalid">{t('loginPage.error')}</Form.Control.Feedback>
          </Form.Group>
          <Button
            className="mt-4 border-0 my-main-button mx-0"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {t('loginPage.signInBtn')}
          </Button>
          <div className="mt-4 text-light text-center border-top border-3 mx-0">
            <p className="mb-0 mt-3">
              {t('loginPage.signUpText')}
              <a href={routes.signupPage()}>{t('loginPage.signUpLink')}</a>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
