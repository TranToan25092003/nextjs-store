"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutPage = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId")?.toString();
  const cartId = searchParams.get("cartId")?.toString();

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      orderId,
      cartId,
    });

    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout></EmbeddedCheckout>
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
