import { login } from "../reducers/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatch } from "../store/store";

import axios from "axios";
import myAxios from "../lib/customAxios";
import { setAuthLoading } from "../reducers/loadingSlice";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const oauthAction = (): void => {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  // Parameters to pass to OAuth 2.0 endpoint
  const params: Record<string, string> = {
    client_id:
      "353982547271-gitptdc940jlnkrdnmi0dtqjferrcvgb.apps.googleusercontent.com",
    redirect_uri: `/oauth-callback`, // Update this line
    response_type: "token",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    include_granted_scopes: "true",
    state: "pass-through value",
    prompt: "select_account",
  };

  // Build the OAuth 2.0 authorization URL
  const authUrl: string = `${oauth2Endpoint}?${new URLSearchParams(
    params
  ).toString()}`;

  // Redirect the user to the OAuth 2.0 authorization URL
  window.location.href = authUrl;
};

export const googleSignin =
  (accessToken: string, navigate: (path: string) => void) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setAuthLoading(true));

      console.log(accessToken);
      const response = await myAxios.post(`/api/auth/google-signin`, {
        accessToken,
      });

      if (response.status === 200) {
        const data = response.data;
        dispatch(
          login({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        dispatch(setAuthLoading(false));

        navigate("/dashboard");
        toast.success("Login successful!", {
          position: "top-right",
          className: "text-sm sm:text-lg",
        });
      } else {
        navigate("/signup");
        dispatch(setAuthLoading(false));
      }
    } catch (error) {
      dispatch(setAuthLoading(false));
      console.error("Error during Google sign-in:", error);
    }
  };

export const signIn =
  (
    email: string | undefined,
    password: string | undefined,
    navigate: (path: string) => void
  ) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setAuthLoading(true));

      const response = await myAxios.post(`/api/auth/signin`, {
        email,
        password,
      });
      dispatch(setAuthLoading(false));
      console.log("response==>", response);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(
          login({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        navigate("/dashboard");
        toast.success("Login successful!", {
          position: "top-right",
          className: "text-sm sm:text-lg",
        });
      } else {
        if (response.status === 404) {
          toast.error("Please signup first!", {
            position: "top-right",
            className: "text-sm sm:text-lg",
            onClose: () => navigate("/signup"),
          });
        } else if (response.status === 401) {
          toast.error("Invalid email or password", {
            position: "top-right",
            className: "text-sm sm:text-lg",
          });
        } else {
          toast.error(response.statusText || "Something went wrong", {
            position: "top-right",
            className: "text-sm sm:text-lg",
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        toast.error(
          error.response.data?.password ||
            error.response.data?.email ||
            "Something went wrong",
          {
            position: "top-right",
            className: "text-sm sm:text-lg",
          }
        );
        console.log("Error during signin:", error.response.data);
      } else {
        console.log("Error during signin:", String(error));
      }
    }
    dispatch(setAuthLoading(false));
  };

export const signUp =
  (
    email: string | undefined,
    password: string | undefined,
    navigate: (path: string) => void
  ) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setAuthLoading(true));

      const response = await myAxios.post(`/api/auth/signup`, {
        password,
        email,
      });
      dispatch(setAuthLoading(false));
      
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(
          login({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          })
        );
        console.log(response.data);
        navigate("/dashboard");
        toast.success("Registration successful!", {
          position: "top-right",
          className: "text-sm sm:text-lg",
        });
      } else if (response.status === 409) {
        toast.error("This account already exists.", {
          position: "top-right",
          className: "text-sm sm:text-lg",
        });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
      }
    } catch (error) {
      dispatch(setAuthLoading(false));

      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          toast.error(
            error.response.data.email || "This account already exists.",
            {
              className: "text-sm sm:text-lg",
              position: "top-right",
            }
          );
        } else {
          toast.error(error.message || "An unexpected error occurred.", {
            className: "text-sm sm:text-lg",
            position: "top-right",
          });
        }
      } else {
        toast.error("An unexpected error occurred.", {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
      }
      dispatch(setAuthLoading(false));
    }
  };

  // Microsoft Sign-In
export const microsoftSignin =
(accessToken: string, navigate: (path: string) => void) =>
async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_AUTHORITY}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        grant_type: "authorization_code",
        scope: "user.read ",
        code: accessToken, 
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response.status === 200) {
      dispatch(login(response.data)); 
      navigate("/dashboard");
      toast.success("Login successful!", { position: "top-right", className: "text-sm sm:text-lg" });
    } else {
      throw new Error(response.statusText || "Microsoft sign-in failed.");
    }
  } catch (error) {
    console.error("Microsoft Sign-In Error:", error);
    toast.error("Error during Microsoft sign-in. Please try again.", { position: "top-right", className: "text-sm sm:text-lg" });
  }
};


export const changeROSI =
  (user_id: string, repeatTimes: number, period: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response: Response = await fetch(
        `${backend_url}/api/user/update-rosi`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ user_id, repeatTimes, period }),
        }
      );

      if (response.ok) {
        toast.success("Saved!!!", {
          position: "top-right",
          className: "text-sm sm:text-lg",
        });
        const data = await response.json();
        dispatch(login(data.token));
      } else {
        toast.error(`Save failed! Error: ${response.statusText}`, {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error during update: ${error.message}`, {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
      } else {
        toast.error("An unexpected error occurred during update.", {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
      }
    }
  };

export const forgotPassword = async (email: string | undefined) => {
  try {
    const response = await myAxios.post(`/api/auth/forgot-password`, {
      email,
    });

    if (response.status === 200) {
      const data = response.data;
      toast.success(data.message, {
        className: "text-sm sm:text-lg",
        position: "top-right",
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      toast.error(error.response.data.message || "Something went wrong", {
        className: "text-sm sm:text-lg",
        position: "top-right",
      });
    }
    console.error("Error during forgot password:", error);
  }
};

export const forgotPasswordVerifyToken = async (
  token: string | undefined
): Promise<{ verified: boolean; email: string }> => {
  try {
    const response = await myAxios.post(
      `/api/auth/forgot-password-verify-token`,
      {
        token,
      }
    );

    const data = response.data;
    if (response.status === 200) {
      return { verified: true, email: data.email };
    }
    return { verified: false, email: "" };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      toast.error(error.response.data.message || "Something went wrong", {
        className: "text-sm sm:text-lg",
        position: "top-right",
      });
    }
    console.error("Error during forgot password:", error);
    return { verified: false, email: "" };
  }
};

export const resetPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ success: boolean }> => {
  try {
    const response = await myAxios.post(`/api/auth/reset-password`, {
      email,
      password,
    });

    const data = response.data;
    if (response.status === 200) {
      toast.success(data.message, {
        className: "text-sm sm:text-lg",
        position: "top-right",
      });
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      toast.error(error.response.data.message || "Something went wrong", {
        className: "text-sm sm:text-lg",
        position: "top-right",
      });
    }
    console.error("Error during forgot password:", error);
    return { success: false };
  }
};
