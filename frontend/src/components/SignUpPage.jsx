import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useAuth } from '../hooks';
import routes from '../routes';
import 'bootstrap';

export default function SignUpPage() {
  const { isLoggedIn } = useAuth();
  return (
    <Container
      className="d-flex align-items-center justify-content-center h-100"
    >
      {isLoggedIn ? <Navigate to="/" /> : <SignUpForm />}
    </Container>
  );
}

function SignUpForm() {
  const { t } = useTranslation();
  const { logIn } = useAuth();
  const [serverError, setServerError] = useState('');
  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={yup.object({
        login: yup.string()
          .min(3, t('signUpPage.errors.usernameLength'))
          .max(20, t('signUpPage.errors.usernameLength')),
        password: yup.string().min(6, t('signUpPage.errors.passwordLength')),
        confirmPassword: yup.string().oneOf([yup.ref('password')], t('signUpPage.errors.passwordConfirm')),
      })}
      onSubmit={async ({ login, password }, { setSubmitting }) => {
        setSubmitting(true);
        setServerError('');
        try {
          const resp = await axios.post(routes.signupPath(), { username: login, password });
          window.localStorage.user = JSON.stringify(resp.data);
          logIn();
        } catch (error) {
          setSubmitting(false);
          if (error.code === 'ERR_BAD_RESPONSE') {
            toast.error(t('toasts.networkError'));
            return;
          }
          setServerError(t('signUpPage.errors.usernameUnique'));
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
            {t('signUpPage.header')}
          </div>
          <Form.Group className="position-relative">
            <Form.Label className="fw-bold fs-5 fst-italic text-light">{t('signUpPage.username')}</Form.Label>
            <Form.Control
              name="login"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder={t('signUpPage.usernamePlaceholder')}
              required
              isInvalid={(formik.touched.login && formik.errors.login) || serverError}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.login || serverError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 position-relative">
            <Form.Label className="fw-bold fs-5 fst-italic text-light">{t('signUpPage.password')}</Form.Label>
            <Form.Control
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder={t('signUpPage.passwordPlaceholder')}
              required
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 position-relative">
            <Form.Label className="fw-bold fs-5 fst-italic text-light">{t('signUpPage.confirmPassword')}</Form.Label>
            <Form.Control
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder={t('signUpPage.confirmPlaceholder')}
              required
              isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button
              className="mt-3 border-0 my-main-button"
              type="submit"
            >
              {t('signUpPage.signUpBtn')}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
