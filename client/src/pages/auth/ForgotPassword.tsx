import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BackArrow from "../../assets/icons/backarrow.webp";
import InputGroup from "../../components/common/InputGroup";
import { forgotPassword } from "../../action/auth";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | undefined>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(email);
  };


  return (
    <>
      <div className="min-h-screen w-full bg-white flex flex-col sm:justify-start sm:items-center mx-auto p-8">
        <div className="w-full max-w-md min-h-full space-y-8">
          <button
            className="w-full inline-flex items-center justify-start text-left text-lg text-black font-normal h-14"
            onClick={() => navigate("/")}
          >
            <img
              src={BackArrow}
              className="w-10 sm:w-12 hover:scale-125 transition-all duration-300"
            />
          </button>
          <div className="flex flex-col gap-y-4 align-middle justify-center">
            <h1 className="text-[1.5rem] sm:text-[3rem] font-bold">
              Send Reset Link
            </h1>
            <div>
              <form method="POST" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-y-4">
                  <InputGroup
                    type="email"
                    error={""}
                    name="email"
                    className={undefined}
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <div>
                    <button
                      className="w-full bg-black rounded-lg  py-2 text-white text-[1rem] sm:text-[1.5rem] hover:bg-gray-800"
                      type="submit"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
