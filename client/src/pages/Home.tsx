import {
  UserIcon,
  UserPlusIcon,
  ChevronRight,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[32rem] space-y-8">
        <div className="text-center">
          <div className="bg-white text-[#2F2F2F] text-[0.8rem] sm:text-[1rem] px-4 py-2 rounded-full border border-black inline-block mb-8 font-bold">
            Made by Boonful
          </div>
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 text-[#2F2F2F] tracking-tight">
            Mixiflow
          </h1>
          {/* <p className="text-gray-600 mb-8 text-[1.2rem] sm:text-[1.2rem] tracking-tight sm:tracking-normal">
            Welcome to Mixiflow! We're excited to have you on board. Let's get
            started and make your experience amazing. Setting up your account
            is quick and easy!
          </p> */}
        </div>
        <div className="rounded-xl divide-y divide-solid bg-[#F8F8F8] sm:mx-8">
          <div className="hover:bg-gray-200 px-4 hover:rounded-t-lg">
            <button
              className="w-full inline-flex items-center justify-start text-left text-lg text-black font-normal h-14"
              onClick={() => navigate("/login")}
            >
              <UserIcon className="w-5 sm:w-6" />
              <span className="mx-auto font-semibold text-[1rem] sm:text-[1.2rem]">
                Login
              </span>
              <ChevronRight className="w-5 sm:w-6 items-end" />
            </button>
          </div>
          <div className=" hover:bg-gray-200 px-4">
            <button
              className="w-full inline-flex items-center justify-start text-left text-lg text-black font-normal h-14"
              onClick={() => navigate("/signup")}
            >
              <UserPlusIcon className="w-5 sm:w-6" />
              <span className="mx-auto font-semibold text-[1rem] sm:text-[1.2rem]">
                Create Account
              </span>
              <ChevronRight className="w-5 sm:w-6 items-end" />
            </button>
          </div>
          <div className=" hover:bg-gray-200 px-4 hover:rounded-b-lg">
            <button
              className="w-full inline-flex items-center  justify-start text-left text-lg text-black font-normal h-14"
              onClick={() => navigate("/forgot-password")}
            >
              <LockKeyhole className="w-5 sm:w-6" />
              <span className="mx-auto font-semibold text-[1rem] sm:text-[1.2rem]">
                Forgot Password
              </span>
              <ChevronRight className="w-5 sm:w-6items-end" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
