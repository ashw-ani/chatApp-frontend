import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
