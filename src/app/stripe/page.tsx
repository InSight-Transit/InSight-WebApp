"use client";

import { useState } from "react";
import { loadStripe, StripeError } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [paymentIntentCreated, setPaymentIntentCreated] = useState(false); // Track if payment intent was already created

  const createPaymentIntent = async () => {
    if (buttonDisabled || paymentIntentCreated) return; // Don't create a new payment intent if it's already created

    setButtonDisabled(true); // Disable the button during API call

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000, currency: "usd" }), // Amount in cents
      });

      const data = await response.json();
      console.log("Response from API:", data);

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentIntentCreated(true); // Mark as payment intent created
      } else {
        console.error("Error: No clientSecret returned from API");
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }

    setButtonDisabled(false); // Re-enable the button after the API call
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Stripe Checkout</h1>
      <button
        onClick={createPaymentIntent}
        disabled={buttonDisabled} // Disable button during API call
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        {buttonDisabled ? "Processing..." : "Start Payment"}
      </button>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: "http://localhost:3000/stripe/success" },
      });

      if (result.error) {
        console.error("Payment error:", result.error.message);
      } else {
        // Manually check if the result contains paymentIntent
        if ('paymentIntent' in result) {
          console.log("Payment successful:", result.paymentIntent);
        } else {
          console.error("Unexpected result structure:", result);
        }
      }
    } catch (error) {
      console.error("Error during payment confirmation:", error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
