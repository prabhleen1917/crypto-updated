// pages/login.tsx
import React from 'react';
import Register from '@/app/components/Register';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';

const RegisterPage = () => {
  return (
    <AuthProvider>
    <Layout>
    <div>
      <Register />
    </div>
    </Layout>
    </AuthProvider>
  );
};

export default RegisterPage;