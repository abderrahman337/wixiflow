import SubscriptionCard from "../../components/common/SubscriptionCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updatePayment } from "../../action/payment";
import { addPlan } from "../../action/users";
import { useState } from "react";
import Payment from "../payment/Payment";

interface SubscriptionProps{
  type: string,
}

const Subscription: React.FC<SubscriptionProps> = ({type}) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const [showPayment, setShowPayment] = useState(false);

  const handleSubscribe = (_name: string, _plan: number, _total: number) => {

    dispatch(updatePayment({ name: _name, price: _plan, total: _total }));
    dispatch(addPlan({name: _name, plan: _plan, total: _total}));
    
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <SubscriptionCard
        type={type}
        handleSubscribe={handleSubscribe}/>
        {showPayment && <Payment setShowPayment={setShowPayment} />}
    </div>
  );
};

export default Subscription;
