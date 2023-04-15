import React from "react";
import "./App.css";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalOptions = {
  "client-id":
    "AWeJQdL5ldQ8HWBDz64TwxnW2UxJyIBRkVGeHN6BtHT4izEqDTIeQ0gTGgxNKF0Eb8r8emTvvS8DK0L4",
  components: "buttons",
};

function App() {
  function _createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "1",
          },
        },
      ],
    });
  }

  async function _onApprove(data, actions) {
    let order = await actions.order.capture();
    console.log(order);
    return order;
  }

  function _onError(err) {
    console.log(err);
  }

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
