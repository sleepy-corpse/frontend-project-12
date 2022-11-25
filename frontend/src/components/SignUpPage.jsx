import React, { useState } from 'react';
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
          .min(3, 'Username must be 3-20 characters long')
          .max(20, 'Username must be 3-20 characters long'),
        password: yup.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
      })}
      onSubmit={async ({ login, password }) => {
        setServerError('');
        try {
          const resp = await axios.post(routes.signupPath(), { username: login, password });
          window.localStorage.user = JSON.stringify(resp.data);
          logIn();
        } catch (e) {
          if (e.isAxiosError) {
            setServerError('User already exists');
          }
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
            Registration
          </div>
          <Form.Group className="position-relative">
            <Form.Label className="fw-bold fs-5 fst-italic text-light">Username</Form.Label>
            <Form.Control
              name="login"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Enter email"
              required
              isInvalid={(formik.touched.login && formik.errors.login) || serverError}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.login || serverError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 position-relative">
            <Form.Label className="fw-bold fs-5 fst-italic text-light">Password</Form.Label>
            <Form.Control
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Enter password"
              required
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 position-relative">
            <Form.Label className="fw-bold fs-5 fst-italic text-light">Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Confirm password"
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
              Sign Up
            </Button>
          </div>
          <div className="mt-4 fs-6 text-light text-center border-top mx-0">
            <p className="mb-0 mt-3">
              {'Already have an account? '}
              <a href="/login">Sign In</a>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
