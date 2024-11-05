import queryString from "query-string";
import axios from "axios";
// import myAxios from "../lib/customAxios";
// import { TokenResponse, useGoogleLogin } from "@react-oauth/google";

// import { toast } from "react-toastify";
import { AppDispatch } from "../store/store";
import { resetAppState, setAppState } from "../reducers/appSlice";
// import { json } from "react-router";
import { toast } from "react-toastify";
export const linkedinSignIn = () => {
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
  const LinkedIn = {
    response_type: "code",
    client_id: `${clientId}`,
    redirect_uri: `${redirectUri}`,
    // state: "DCEeFWf45A53sdfKef424",
    scope: `profile email`,
  };
  console.log("clientId==>", clientId);
  console.log("redirectUri==>", redirectUri);
  console.log("LinkedIn==>", LinkedIn);
  const profileUrl = queryString.stringify(LinkedIn);
  console.log("profileUrl==>", profileUrl);
  window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${profileUrl}`;
};

export const signoutApp = (name: string, dispatch: AppDispatch) => {
  dispatch(resetAppState({ app: name }));
};

export const getLinkedInAccessToken =
  (code: string) => async (dispatch: AppDispatch) => {
    if (code === undefined) return;
    console.log("code==>", code);
    try {
      const params = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
        client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
        client_secret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
      };
      //   //   const url = queryString.stringify(params);
      //   //   console.log("url==>", url);

      const response = await axios.post(
        `https://www.linkedin.com/oauth/v2/accessToken`,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      //   console.log("response==>", response.data);
      //   const response = await fetch(
      //     `https://www.linkedin.com/oauth/v2/accessToken`,
      //     {
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded",
      //       },

      //       method: "POST",
      //       body: JSON.stringify(params),
      //     }
      //   );
      //   if (response.ok) {
      //     const data = await response.json();
      //     console.log("data==>", data);
      //   }
      //   const response = await fetch(
      //     `https://www.linkedin.com/oauth/v2/accessToken?${url}`
      //   );
      //   const data = await response.json();
      //   console.log("data==>", data);
      //   const response = await axios.get(
      //     `https://www.linkedin.com/oauth/v2/accessToken?${url}`
      //   );
      if (response.status === 200) {
        localStorage.setItem(
          "linkedin_access_token",
          response.data.access_token
        );
        console.log("linkedin_access_token==>", response.data);
        dispatch(
          setAppState({
            app: "linkedin",
            state: { accessToken: response.data.access_token, isLogin: true },
          })
        );
        toast.success("LinkedIn Signed successfully", {
          position: "top-right",
          className: "text-sm sm:text-lg",
        });
      }
    } catch (error) {
      alert(error);
    }
  };
