import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

// import { CircleCheck } from "lucide-react";
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
    <Card className="flex flex-col justify-between hover:border-blue-700 shadow-lg border border-gray-400">
      <CardHeader>
        <CardTitle>{name} Plan</CardTitle>
        <div className="text-[2rem] font-bold my-2 leading-[3rem]">
          ${price}/m
        </div>
        <p className="text-base text-[#2F2F2F] font-semibold">
          {requests} monthly requests.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <button
          className={`w-full ${
            selectedPlan === name ? "bg-slate-500" : "bg-black"
          } text-white hover:bg-gray-600 rounded-md p-2`}
          onClick={() => handleSubscribe(name, price, requests)}
        >
          {selectedPlan === name ? "Selected" : "Choose"}
        </button>
        <hr className="bg-slate-700 w-full border mt-4" />
        <div className="">
          <p className="font-bold leading-tight">Workspaces: {workspaces}</p>
          <p className="font-semibold leading-tight">
            Apps per Workspace:{" "}
            <span className="text-[#3875FF] font-bold">{apps}</span>
          </p>
          <p className="font-bold mt-6 mb-2">Features:</p>
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center tracking-tight">
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
