import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import myAxios from "../../lib/customAxios";
const CARD_OPTIONS = {
  iconStyle: "solid" as const,
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segeo UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "ffc7ee",
    },
  },
};

const PaymentForm = ({ amount }: { amount: number }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate("/workspace");
    
    if (!stripe || !elements) {
      console.error("Stripe has not loaded");
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });
    toast.success("Payment Successful", {
      className: "text-sm sm:text-lg",
      position: "top-right",
    });
    // console.log("paymentMethod==>", paymentMethod);
    // console.log("error==>", error);
    if (!error) {
      try {
        const { id } = paymentMethod;
        // console.log("id==>", id);
        const response = await myAxios.post(
          `/api/payment/create-payment-intent`,
          {
            amount: amount,
            id: id,
          }
        );
        // console.log("response==>", response);
        if (response.data.success) {
          // console.log(id);
          setSuccess(true);
          navigate("/workspace");
        }
      } catch (error) {
        console.log("Error ", error);
      }
    } else {
      navigate("/dashboard");

      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!success ? (
        <form
          className="w-[720px] p-6  bg-white shadow-md rounded-md"
          onSubmit={handleSubmit}
        >
          <fieldset className="FormGroup space-y-4">
            <div className="FormRow">
              <CardElement
                options={CARD_OPTIONS}
                className="p-2   border rounded-md"
              />
            </div>
          </fieldset>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            type="submit"
          >
            Pay
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">You just bought this</h2>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
