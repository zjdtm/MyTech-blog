import AuthForm from 'components/auth/AuthForm';
import AuthTemplate from 'components/auth/AuthTemplate';
import Navbar from 'components/common/Navbar';
import React from 'react';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <AuthTemplate>
        <AuthForm type="login" />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
