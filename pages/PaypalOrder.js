import React from "react";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import PayPalButton from "./PaypalButton";
import {PAYPAL_CLIENT_ID} from '../utils/constants';

const PaypalOrder = () => {
  const initialOptions = {
    "client-id": PAYPAL_CLIENT_ID.clientId,
    currency: "EURO",
    intent: "capture"
  };

  const createOrderHandler = (data, actions) => {
    // Set up the transaction
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "15"
          }
        }
      ]
    });
  };

  const onApproveHandler = (data, actions) => {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function (details) {
      // This function shows a transaction success message to your buyer.
      alert("Transaction completed by " + details.payer.name.given_name);
    });
  };

  return (
    <>
    <br />
    <br />
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButton
          createOrder={createOrderHandler}
          onApprove={onApproveHandler}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalOrder;
