// pages/login.tsx
import React from 'react';
import Login from '@/app/components/Login'; // Adjust the import path as needed
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';


const LoginPage = () => {
  return (
    <AuthProvider>
    <Layout>
    <div>
      <Login />
    </div>
    </Layout>
    </AuthProvider>
  );
};

export default LoginPage;
