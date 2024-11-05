import { useNavigate, useParams } from "react-router-dom";
import BackArrow from "../../assets/icons/backarrow.webp";
import InputGroup from "../../components/common/InputGroup";
import { useEffect, useState } from "react";
import { forgotPasswordVerifyToken, resetPassword } from "../../action/auth";
import Loading from "../../components/common/Loading";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
    } else {
      forgotPasswordVerifyToken(token).then((res) => {
        if (!res.verified) {
          navigate("/forgot-password");
        }
        setEmail(res.email);
        setLoading(false);
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword({ email, password }).then((res) => {
      if (res.success) {
        navigate("/login");
      }
    });
  };
  return (
    <>
      {loading && <Loading />}

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
              Reset Password
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
                  <InputGroup
                    type="password"
                    error={""}
                    name="password"
                    className={undefined}
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <div>
                    <button
                      className="w-full bg-black rounded-lg  py-2 text-white text-[1rem] sm:text-[1.5rem] hover:bg-gray-800"
                      type="submit"
                    >
                      Reset Password
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

export default ResetPassword;
