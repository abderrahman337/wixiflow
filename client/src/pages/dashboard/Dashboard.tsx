import CardComponent from "../../components/common/CardComponent";
import Subscription from "../subscription/Subscription";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useState } from "react";
import Payment from "../payment/Payment";

const plans = [
  {
    name: "Mixiflow",
    price: 29,
    requests: 10000,
    workspaces: "Up to 3 workspaces",
    apps: "Up to 3 apps",
  },
  {
    name: "mAI",
    price: 19,
    requests: 20000,
    workspaces: "Up to 5 workspaces",
    apps: "Up to 5 apps",
  },
];

const features = [
  [
    "Everything in mAI and More",
    "Full integration with all apps",
    "Multi-step actionable widgets",
    "Social media management",
    "Task management tools",
    "Automation & Insights",
  ], 
  [
    "Generate Content: Summaries, emails, docs.",
    "Edit Live:In-card powerful editing tools",
    "App Actions:(notion, social&more)",
    "Smart Suggestions:(Context suggestions)",
    "All-in-One Workflow:Tasks in one place",
    "Export:PDF and other sharing tools",
  ], 
];

const Dashboard = () => {
  
  const [showPayment, setShowPayment] = useState(false);
  const { name } = useSelector((state: RootState) => state.payment);

  const [dashboardState, setDashboardState] = useState(0);

  const handleSubscribe = (_name: string, _plan: number, _total: number) => {

    if(_name == "Mixiflow"){
      setDashboardState(1);
    }else if(_name == "mAI"){
      setDashboardState(2);
    }
  };

  return (
    <>
      {dashboardState == 0 && <div className="min-h-screen bg-white p-8 flex justify-center items-center">
        <div className="p-10">
          
          <div className="w-full flex flex-col text-left m-8">
            <h2 className="text-[1.5rem] sm:text-[2.25rem] font-semibold font-sf-pro text-[#2F2F2F] tracking-tight mb-2 leading-snug">
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

          <div className="grid lg:grid-cols-2 mt-8">
            {plans.map((plan, index) => (
              <CardComponent
                key={index}
                apps={plan.apps}
                features={features[index]}
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
      </div>}
        
      {dashboardState == 1 && <Subscription type="Mixiflow"/>}
      {dashboardState == 2 && <Subscription type="mAI"/>}
    </>
  );
};

export default Dashboard;
