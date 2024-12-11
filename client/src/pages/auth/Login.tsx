import { useState } from "react";
import InputGroup from "../../components/common/InputGroup";
import { AuthUserData, SigninProps } from "../../lib/types";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import MicrosoftImage from "../../assets/icons/microsoft.svg";
import { googleSignin, signIn } from "../../action/auth";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import Loading from "../../components/common/Loading";
import BackArrow from "../../assets/icons/backarrow.webp";
import { useGoogleLogin } from "@react-oauth/google";
import { microsoftSignin } from "../../action/auth";
import { useMsal } from "@azure/msal-react";

const Login: React.FC<SigninProps> = ({ closeModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<AuthUserData>({
    email: "",
    password: "",
  });
  
  const [authLoading, setAuthLoading] = useState(false);

  const { instance } = useMsal();

  // Handle regular email and password login submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn(user.email, user.password, navigate));
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle Google Sign-In
  const googleSign = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const { access_token } = codeResponse;
      dispatch(googleSignin(access_token, navigate));
      closeModal();
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });
  
  // Handle Microsoft Sign-In
  const handleMicrosoftSignIn = async () => {
    if (authLoading) return; 
  
    try {
      setAuthLoading(true);
  
      // Log in to Microsoft with a popup
      instance.loginPopup({
        scopes: ["user.read"],
        // redirectUri: import.meta.env.VITE_REDIRECT_URI,
        
      }).then(res=>console.log(res))
      .catch(err => console.log(err))
  
      // if (loginResponse && loginResponse.account) {
      //   // Acquire token silently
      //   const tokenResponse = await instance.acquireTokenSilent({
      //     scopes: ["user.read"],
      //     account: loginResponse.account,
      //   });
  
      //   if (tokenResponse && tokenResponse.accessToken) {
      //     dispatch(microsoftSignin(tokenResponse.accessToken, navigate));
      //     closeModal();
      //   } else {
      //     throw new Error("Failed to acquire access token.");
      //   }
      // }
    } catch (error) {
      console.error("Microsoft Login Failed:", error);
      // alert("Microsoft login failed. Please try again later.");
    } finally {
      setAuthLoading(false);
    }
  };
  
  
  
  return (
    <>
      {authLoading && <Loading />}

      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <button
            className="w-full inline-flex items-center justify-start text-left text-lg text-black font-normal h-14"
            onClick={() => navigate("/")}
          >
            <img
              src={BackArrow}
              alt="Back"
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
                    className="w-full bg-black rounded-lg py-2 text-white text-[1.5rem] hover:bg-gray-800"
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
                onClick={() => googleSign()}
                disabled={authLoading}
              >
                <FcGoogle className="w-6 h-6 mr-2" />
                Continue with Google
              </button>
              <button
                onClick={handleMicrosoftSignIn}
                className="flex items-center justify-center w-full bg-[#F8F8F8] hover:bg-gray-300 p-4 rounded-lg border border-gray-400"
                disabled={authLoading}
              >
                <img src={MicrosoftImage} alt="Microsoft Logo" className="w-4 sm:w-6 mr-2" />
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
