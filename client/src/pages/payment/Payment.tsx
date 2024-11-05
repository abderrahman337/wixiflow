import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import PopUpPaymentForm from "./PopUpPaymentForm";
import { useEffect, useState } from "react";
import stripePromise from "../../lib/getStripe";
import Loading from "../../components/common/Loading";

const Payment = ({
  setShowPayment,
}: {
  setShowPayment: (value: boolean) => void;
}) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getstripe = async () => {
      setLoading(true);
      const _stripe = await stripePromise();
      console.log("stripe==>", _stripe);
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
          {/* <PaymentForm amount={price || 0} /> */}
          <PopUpPaymentForm setShowPayment={setShowPayment} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
