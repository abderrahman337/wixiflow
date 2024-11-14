import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

import StarIcon from "../../assets/icons/icon_tstar.png";
import CheckIcon from "../../assets/icons/tick.png";

const CardComponent = ({
  name,
  price,
  requests,
  workspaces,
  apps,
  features,
  selectedPlan,
  handleSubscribe,
}: {
  name: string;
  price: number;
  requests: number;
  workspaces: string;
  apps: string;
  features: string[];
  selectedPlan: string | undefined;
  handleSubscribe: (name: string, plan: number, total: number) => void;
}) => {

  return (
    
    // <Card className="flex flex-col justify-between hover:border-black shadow-lg border border-gray-400">
    <Card 
      className={`flex flex-col justify-between hover:border-black ${name == 'Mixiflow' ? " border-4 border-black" : " border border-gray-400"}`}>  
      {name == 'Mixiflow' && 
      <span className="w-1/3 top-2 self-end font-sf-pro text-center right-2 bg-black text-white text-xs font-bold px-2 py-1">
        Popular Choice
      </span>}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="text-[2rem] font-bold my-2 font-sf-pro leading-[3rem]">
          ${price}/m
        </div>
        {/* <p className="text-base text-[#2F2F2F] font-semibold">
          {requests} monthly requests.
        </p> */}
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <button
          className={`w-full ${
            selectedPlan === name ? "bg-slate-500" : "bg-black"
          } text-white hover:bg-gray-600 rounded-full p-2 font-sf-pro`}
          onClick={() => handleSubscribe(name, price, requests)}
        >
          {selectedPlan === name ? "Selected" : "Choose"}
        </button>
        <hr className="bg-slate-700 w-full border mt-4" />
        <div className="">
          <span className="bg-white border border-black text-black text-xs font-bold px-2 py-1 rounded-full font-sf-pro">
            {name == 'Mixiflow' && <span className="text-black">✨</span>}
            {name == 'Mixiflow' ? 'mAI Included' : 'Standalone Product'  }
          </span>
          {/* <p className="font-bold leading-tight">Workspaces: {workspaces}</p>
          <p className="font-semibold leading-tight">
            Apps per Workspace:{" "}
            <span className="text-[#3875FF] font-bold">{apps}</span>
          </p> */}
          <p className="font-bold mt-6 mb-2 font-sf-pro">Features:</p>
          <ul className="space-y-2 font-sf-pro">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center tracking-tight ">
                <img src={CheckIcon} alt="check" className="h-5 w-5 mr-2" />
                {/* <CheckIcon className="h-5 w-5 mr-2 text-black" /> */}
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
