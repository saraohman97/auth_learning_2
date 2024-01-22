"use client";

import FormWrapper from "@/components/auth/form-wrapper";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/checkout-form";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutPage = () => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    // create a paymentintent as soon as the page loads
    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error) => {
          setError(true);
          console.log("Error", error);
          toast.error("Something went wrong.");
        });
    }
  }, [cartProducts, paymentIntent, handleSetPaymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="p-10">
      <FormWrapper>
        <div className="w-full">
          {clientSecret && cartProducts && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm
                clientSecret={clientSecret}
                handleSetPaymentSuccess={handleSetPaymentSuccess}
              />
            </Elements>
          )}
          {loading && <div className="text-center">Loading checkout</div>}
          {error && (
            <div className="text-center text-rose-500">
              Something went wrong!
            </div>
          )}
          {paymentSuccess && (
            <div className="flex items-center flex-col gap-4">
              <div className="text-teal-500 text-center">Payment Success</div>
              <Button onClick={() => router.push("/order")}>
                View your orders
              </Button>
            </div>
          )}
        </div>
      </FormWrapper>
    </div>
  );
};

export default CheckoutPage;
