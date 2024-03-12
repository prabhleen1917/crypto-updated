import { AuthProvider } from "@/app/contexts/AuthContext";
import { AppProps } from 'next/app';
import Layout from "@/app/components/Layout";
import "@app/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
