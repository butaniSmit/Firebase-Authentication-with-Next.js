import Navbar from '@/components/common/elements/navbar'
import '@/styles/globals.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from "../context/AuthContext";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
  <ToastContainer/>
  <Component {...pageProps} />
  </AuthContextProvider>
  )
}
