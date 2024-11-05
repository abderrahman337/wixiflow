import CardComponent from "../../components/common/CardComponent";
// import { addPlan } from "../../action/users";
// import { PaymentOptions } from "../../lib/types";
// import getStripe from "../../lib/getStripe";
// import Modal from "../../components/common/Modal";
// import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updatePayment } from "../../action/payment";
import { useState } from "react";
import Payment from "../payment/Payment";
const plans = [
  {
    name: "Basic",
    price: 49,
    requests: 10000,
    workspaces: "Up to 3 workspaces",
    apps: "Up to 3 apps",
  },
  {
    name: "Plus",
    price: 79,
    requests: 20000,
    workspaces: "Up to 5 workspaces",
    apps: "Up to 5 apps",
  },
  {
    name: "Premium",
    price: 149,
    requests: 40000,
    workspaces: "Unlimited",
    apps: "Unlimited",
  },
];

const features = [
  "Full integration with all apps",
  "Multi-step actionable widgets",
  "Social media management",
  "Task management tools",
  "Automation & Insights",
  "Mixi - Intelligent Assistant",
];

const Dashboard = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPayment, setShowPayment] = useState(false);
  const { name } = useSelector((state: RootState) => state.payment);
  const handleSubscribe = (_name: string, _plan: number, _total: number) => {
    dispatch(updatePayment({ name: _name, price: _plan, total: _total }));
    // navigate("/payment");
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center items-center">
      <div className="max-w-6xl mx-auto">
        <div className="w-full flex flex-col text-left ">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#2F2F2F] mb-1 tracking-tight">
            Mixiflow
          </h1>
          <h2 className="text-[1.5rem] sm:text-[2.25rem] font-semibold text-[#2F2F2F] tracking-tight mb-2 leading-snug">
            We've got a plan
            <br /> that's perfect for you.
          </h2>
          {/* <p className="text-[#2F2F2F] mb-8 font-semibold tracking-tight">
            Not sure? Request a{" "}
            <span className="font-semibold underline">3 day free trial</span>{" "}
            *no credit card required.
          </p> */}
        </div>
        {showPayment && <Payment setShowPayment={setShowPayment} />}

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, index) => (
            <CardComponent
              key={index}
              apps={plan.apps}
              features={features}
              name={plan.name}
              price={plan.price}
              requests={plan.requests}
              workspaces={plan.workspaces}
              selectedPlan={name}
              handleSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
