import React, { useEffect, useState } from "react";
import "./App.css";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  "client-id":
    "AWeJQdL5ldQ8HWBDz64TwxnW2UxJyIBRkVGeHN6BtHT4izEqDTIeQ0gTGgxNKF0Eb8r8emTvvS8DK0L4",
  components: "buttons",
};

function App() {
  const [order, setOrder] = useState();

  function _createOrder(data, actions) {
    return actions.order.create(order);
  }

  async function _onApprove(data, actions) {
    let order = await actions.order.capture();

    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "PAYPAL_ORDER_APPROVED", payload: order })
      );
  }

  function _onError(err) {
    console.log(err);
  }

  useEffect(() => {
    window.ReactNativeWebView &&
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "PAYPAL_GATEWAY_LOADED",
          payload: "paypal gateway is loaded",
        })
      );

    window.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "PAYPAL_CREATE_ORDER") {
          setOrder(data.payload);
        }
      } catch {}
    });
  }, []);

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <div className="App">
        <PayPalButtons
          createOrder={_createOrder}
          onApprove={_onApprove}
          onError={_onError}
        />
      </div>
    </PayPalScriptProvider>
  );
}
export default App;
