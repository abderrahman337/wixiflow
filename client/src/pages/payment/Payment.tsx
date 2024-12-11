import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import PopUpPaymentForm from "./PopUpPaymentForm";
import { useEffect, useState } from "react";
import stripePromise from "../../lib/getStripe";
import Loading from "../../components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Payment = ({
  setShowPayment,
}: {
  setShowPayment: (value: boolean) => void;
}) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(false);

  // Retrieve the selected price from state
  const { price } = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    const getstripe = async () => {
      setLoading(true);
      const _stripe = await stripePromise();
      setStripe(_stripe);
      setLoading(false);
    };
    getstripe();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Elements stripe={stripe}>
          <PopUpPaymentForm setShowPayment={setShowPayment} price={price ?? 0} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
