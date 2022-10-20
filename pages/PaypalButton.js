import React from "react";
import PropTypes from "prop-types";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import Loader from "./Loading";

const PaypalButton = ({ createOrder, createSubscription, onApprove }) => {
  const [{ options, isResolved }] = usePayPalScriptReducer();

  if (!isResolved) return <Loader />;

  const oderOptions = {
    createOrder: createOrder
  };

  const subscriptionOptions = {
    createSubscription: createSubscription,
    style: {
      label: "subscribe"
    }
  };

  const buttonOptions =
    options.intent === "subscription" ? subscriptionOptions : oderOptions;

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
            [currency, showSpinner]
        })
    }

  return (
    <PayPalButtons
      style={{ layout: "horizontal" }}
      {...buttonOptions}
      ButtonWrapper={ButtonWrapper}
      onApprove={onApprove}
    />
  );
};

PaypalButton.propTypes = {
  createOrder: PropTypes.func,
  createSubscription: PropTypes.func,
  onApprove: PropTypes.func.isRequired
};

export default PaypalButton;
