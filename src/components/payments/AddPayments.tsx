import React from "react";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../../store/Store";
import { updateUserPremium } from "../../slice/singleUserSlice";
import { useAppDispatch } from "../../store/Store";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      height: "100px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const AddPayments = () => {
  const [message, setMessage] = React.useState("");
  const dispatch = useAppDispatch();
  //user from the store
  const user = useSelector((state: RootState) => state.singleUser.user);
  console.log("::::::::::>>>>>>premium", user);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe has not loaded yet, do not proceed with payment
      return;
    }

    // Get the CardElement
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      // CardElement is not available, do not proceed with payment
      return;
    }

    // Use the stripe object to create a payment method and handle the payment
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (result.error) {
      console.log("Payment failed:", result.error.message);
      // Handle payment failure here
    } else {
      console.log("Payment successful:", result.paymentMethod);

      dispatch(updateUserPremium(true));
      setMessage("paid and set user successfully");
      setTimeout(() => {
        setMessage("");
      }, 3000);

      console.log("paid and set user successfully>>>>>>");

      // Handle successful payment here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginTop: "30px" }}>
        <p>{message}</p>
        <CardElement options={cardElementOptions} />
      </div>
      <button type="submit" style={{ marginTop: "60px", marginLeft: "45%" }}>
        Pay
      </button>
    </form>
  );
};

export default AddPayments;
