import Button from 'react-bootstrap/Button';
import { React, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Navigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes';
import { useAuth } from '../hooks';
// import 'bootstrap';

/* <Card>
        <Card.Body as={Row} className="p-4 border rounded-4 border-5 my-form">
          <Col lg={12} />
          <Col lg={12}>
            <LoginForm />
          </Col>
        </Card.Body>
        <Card.Footer>
          <div className="mt-4 text-light text-center border-top mx-0">
            <p className="mb-0 mt-3">
              {'Don\'t have an account? '}
              <a href="/signup">Sign Up</a>
            </p>
          </div>
        </Card.Footer>
      </Card>
*/
export default function LoginPage() {
  const { isLoggedIn } = useAuth();
  return (
    <Container
      className="d-flex align-items-center justify-content-center h-100"
    >
      {isLoggedIn ? <Navigate to="/" /> : <LoginForm />}
    </Container>
  );
}

function LoginForm() {
  const [isInvalid, setIsInvalid] = useState(false);
  const { logIn } = useAuth();
  // const navigate = useNavigate();

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
      onSubmit={async (values) => {
        setIsInvalid(false);
        try {
          const resp = await axios.post(routes.loginPath(), values);
          window.localStorage.user = JSON.stringify(resp.data);
          logIn();
          // navigate('/');
        } catch (error) {
          setIsInvalid(true);
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
            Please login
          </div>
          <Form.Group className="position-relative">
            <Form.Label className="fw-bold fs-4 fst-italic text-light">Username</Form.Label>
            <Form.Control
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Enter email"
              required
              isInvalid={isInvalid}
            />
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
              isInvalid={isInvalid}
            />
            <Form.Control.Feedback tooltip type="invalid">Invalid username or password</Form.Control.Feedback>
          </Form.Group>
          <Button
            className="mt-4 border-0 my-main-button mx-0"
            type="submit"
          >
            Sign In
          </Button>
          <div className="mt-4 text-light text-center border-top border-3 mx-0">
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
