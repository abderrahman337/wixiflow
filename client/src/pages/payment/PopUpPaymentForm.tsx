import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import myAxios from "../../lib/customAxios";
import { AppDispatch } from "../../store/store";
import { addPlan } from "../../action/users";

interface PopUpPaymentFormProps {
  setShowPayment: (value: boolean) => void;
  price: number; // Add price prop to get the selected subscription price
}

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
      color: "#ffc7ee",
    },
  },
};

const PopUpPaymentForm: React.FC<PopUpPaymentFormProps> = ({
  setShowPayment,
  price,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement is not available");
      return;
    }

    setSuccess(false); // Reset success state before proceeding

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        console.error("Payment error:", error.message);
        toast.error("Payment failed. Please check your card details.");
        return;
      }

      if (paymentMethod) {
        const { id } = paymentMethod;

        // Call your backend to create a payment intent with the price
        const response = await myAxios.post(
          `/api/payment/create-payment-intent`,
          {
            amount: price * 100, // Price in cents (if using Stripe)
            id: id,
          }
        );

        if (response.data.success) {
          setSuccess(true);
          dispatch(
            addPlan({ name: "Subscription Plan", plan: price, total: price })
          );
          toast.success("Payment Successful!", {
            position: "top-right",
          });
          setShowPayment(false);
          navigate("/workspace");
        } else {
          throw new Error("Payment failed on the server side.");
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("Payment Failed. Please try again.");
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).id === "popup-overlay") {
      setShowPayment(false);
    }
  };

  return (
    <div
      id="popup-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      {!success ? (
        <div className="w-[90%] sm:w-[600px] p-6 bg-white rounded-lg shadow-lg relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={() => setShowPayment(false)}
          >
            &times;
          </button>
          <form id="payment-form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup space-y-4">
              <div className="mt-4 text-center">
                <p className="text-xl font-bold">Confirm your payment</p> {/* Centered Title */}
              </div>
              <div className="FormRow">
                <CardElement
                  options={CARD_OPTIONS}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            </fieldset>
            <div className="mt-4 text-left">
              <p className="text-xl font-semibold">Total: ${price}</p> {/* Show the price */}
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
                type="submit"
              >
                Pay ${price}
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full"
                type="button"
                onClick={() => setShowPayment(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-semibold">Payment Successful!</h2>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setShowPayment(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PopUpPaymentForm;
