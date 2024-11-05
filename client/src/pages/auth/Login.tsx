import { useState } from "react";
import InputGroup from "../../components/common/InputGroup";
import { AuthUserData } from "../../lib/types";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import MicrosoftImage from "../../assets/icons/microsoft.svg";

import { googleSignin, signIn } from "../../action/auth";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { SigninProps } from "../../lib/types";
import Loading from "../../components/common/Loading";
import BackArrow from "../../assets/icons/backarrow.webp";
const Login: React.FC<SigninProps> = ({ closeModal }: SigninProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<AuthUserData>({
    email: "",
    password: "",
  });
  const { authLoading } = useSelector((state: RootState) => state.loading);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user);
    dispatch(signIn(user.email, user.password, navigate));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const { access_token } = codeResponse;
      dispatch(googleSignin(access_token, navigate));
      closeModal();
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <>
      {authLoading && <Loading />}

      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <button
            className="w-full inline-flex items-center  justify-start text-left text-lg text-black font-normal h-14"
            onClick={() => navigate("/")}
          >
            <img
              src={BackArrow}
              className="w-10 sm:w-12 hover:scale-[1.35] transition-all duration-300"
            />
          </button>
          <h1 className="text-[3rem] font-bold">Login</h1>
          <div>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-y-4">
                <InputGroup
                  type="email"
                  error={""}
                  name="email"
                  className={undefined}
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={user.email}
                />
                <InputGroup
                  type="password"
                  placeholder="Password"
                  error={""}
                  className={undefined}
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
                <div>
                  <button
                    className="w-full bg-black rounded-lg  py-2 text-white text-[1.5rem] hover:bg-gray-800"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
            <div className="my-8 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <div className="mx-4 text-gray-500">or</div>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="space-y-4">
              <button
                className="flex items-center justify-center w-full bg-[#F8F8F8] hover:bg-gray-300 p-4 rounded-lg border border-gray-400"
                onClick={() => login()}
              >
                <FcGoogle className="w-6 h-6 mr-2" />
                Continue with Google
              </button>
              <button className="flex items-center justify-center w-full bg-[#F8F8F8] hover:bg-gray-300 p-4 rounded-lg border border-gray-400">
                <img src={MicrosoftImage} className="w-4 sm:w-6 mr-2" />
                Continue with Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
