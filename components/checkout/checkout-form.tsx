"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/format-price";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const formattedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe || !clientSecret) return;
    handleSetPaymentSuccess(false);
  }, [stripe, handleSetPaymentSuccess, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout successful");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <h2 className="text-2xl font-semibold">
        Enter your details to complete checkout
      </h2>
      <h2 className="mt-4 mb-2 text-lg font-semibold">Address information</h2>
      <AddressElement
        options={{ mode: "shipping", allowedCountries: ["US", "KE"] }}
      />
      <h2 className="mt-4 mb-2 text-lg font-semibold">Payment information</h2>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

      <div className="py-4 text-center text-slate-700 text-xl font-bold">
        Total: {formattedPrice}
      </div>
      <Button disabled={isLoading || !stripe || !elements} onClick={() => {}}>
        {isLoading ? "Processing" : "Pay now"}
      </Button>
    </form>
  );
};

export default CheckoutForm;
