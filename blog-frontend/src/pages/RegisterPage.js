import AuthForm from 'components/auth/AuthForm';
import AuthTemplate from 'components/auth/AuthTemplate';
import Navbar from 'components/common/Navbar';
import React from 'react';

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <AuthTemplate>
        <AuthForm type="register" />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
