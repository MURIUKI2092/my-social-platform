import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import AddPayments from "./AddPayments";

const stripePromise = loadStripe(
  "pk_test_51NX06fEMcTglUdTBcW4efAvwYZVYnfNd9Sv7RQV4Ej4Q2Ap9HIedcWqvRML67S03rXclyqyXTrszg4WN2d4FozJs00OWoVxLrj"
);

const StripeIntegration: React.FC = () => {
  return (
    <Elements stripe={stripePromise}>
      <AddPayments />
    </Elements>
  );
};

export default StripeIntegration;
