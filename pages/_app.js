import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import {PAYPAL_CLIENT_ID} from '../utils/constants'
import { Layout } from '../components';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';



function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <PayPalScriptProvider options= {{"client-id": PAYPAL_CLIENT_ID.clientId }}> 
        <Component {...pageProps} />
        </PayPalScriptProvider>
      </Layout>
    </StateContext>
  )
}

export default MyApp
