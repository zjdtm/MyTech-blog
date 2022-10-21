import AuthForm from 'components/auth/AuthForm';
import AuthTemplate from 'components/auth/AuthTemplate';
import React from 'react';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type="login" />
    </AuthTemplate>
  );
};

export default LoginPage;
