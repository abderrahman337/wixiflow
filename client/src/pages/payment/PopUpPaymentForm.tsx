import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import myAxios from "../../lib/customAxios";
import { AppDispatch, RootState } from "../../store/store";
import { addPlan } from "../../action/users";
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

const PopUpPaymentForm = ({
  setShowPayment,
}: {
  setShowPayment: (value: boolean) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const { price, total, name } = useSelector(
    (state: RootState) => state.payment
  );

  const [success, setSuccess] = useState(false);

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
        console.log("id==>", id, price);
        const response = await myAxios.post(
          `/api/payment/create-payment-intent`,
          {
            amount: price,
            id: id,
          }
        );
        // console.log("response==>", response);
        if (response.data.success) {
          // console.log(id);
          setSuccess(true);
          dispatch(addPlan({ name, plan: price, total }));
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

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).id !== "payment-form") {
      setShowPayment(false);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity sm:px-0 px-4"
      onClick={handleOutsideClick}
    >
      {!success ? (
        <div className="flex justify-center items-center h-full">
          <form
            className="w-[720px] p-6  bg-white shadow-md rounded-md"
            id="payment-form"
            // onSubmit={handleSubmit}
          >
            <fieldset className="FormGroup space-y-4">
              <div className="FormRow">
                <CardElement
                  options={CARD_OPTIONS}
                  className="p-2 border rounded-md sm:w-full w-[22rem]"
                />
              </div>
            </fieldset>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              type="button"  onClick={handleSubmit}
            >
              Pay
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold">You just bought this</h2>
        </div>
      )}
    </div>
  );
};

export default PopUpPaymentForm;
