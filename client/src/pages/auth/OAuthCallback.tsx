import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import myAxios from "../../lib/customAxios";
import { login } from "../../reducers/userSlice";

import Loading from "../../components/common/Loading";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const OAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Extract the access token from the URL fragment
        const hash = new URLSearchParams(location.hash.slice(1));
        const accessToken = hash.get("access_token");

        if (accessToken) {
          const response = await myAxios.post(
            `${backend_url}/api/auth/google-signin`,
            { accessToken }
          );

          if (response.status === 200) {
            const data = await response.data;
            dispatch(login(data.token));
          } else {
            navigate("/signup", { state: { accessToken } });
          }
        } else {
          console.error("Failed to obtain access token");
          navigate("/error");
        }
      } catch (error) {
        console.error("Error during OAuth callback:", error);
        navigate("/error");
      }
    };

    handleOAuthCallback();
  }, [location.hash, navigate, dispatch]);

  return <Loading />;
};

export default OAuthCallback;
