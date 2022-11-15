import Button from 'react-bootstrap/Button';
import React from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import 'bootstrap';

export default function SignUpForm() {
  return (
    <Formik
      initialValues={{
        login: '',
        password: '',
      }}
      validationSchema={yup.object({
        login: yup.string().min(3).max(20),
        password: yup.string().min(6, 'Minimum length is 6 characters'),
      })}
      onSubmit={() => {

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
            Please login
          </div>
          <Form.Group className="position-relative">
            <Form.Label className="fw-bold fs-4 fst-italic text-light">Username</Form.Label>
            <Form.Control
              name="login"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Enter email"
              required
              isInvalid={formik.touched.login && formik.errors.login}
            />
            <Form.Control.Feedback tooltip type="invalid">{formik.errors.login}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mt-2 position-relative" controlId="validationFormik05" md="3">
            <Form.Label className="fw-bold fs-4 fst-italic text-light">Password</Form.Label>
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
          <div className="d-flex justify-content-center">
            <Button
              className="mt-3 border-0 my-main-button"
              type="submit"
            >
              Sign In
            </Button>
          </div>
          <div className="mt-4 fs-5 text-light text-center border-top mx-0">
            <p className="mb-0 mt-3">
              {'Don\'t have an account? '}
              <a href="/signup">Sign Up</a>
            </p>
          </div>
        </Form>
      )}
    </Formik>
  );
}
