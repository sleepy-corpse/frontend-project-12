import React from 'react';
import Container from 'react-bootstrap/Container';
import LoginFrom from '../components/LoginForm';

function Login() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <LoginFrom />
    </Container>
  );
}

export default Login;
