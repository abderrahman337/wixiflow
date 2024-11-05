import { Check, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../store/store";
import notion from "../../assets/icons/apps/notion.png";
import twitter from "../../assets/icons/apps/twitter.png";
import instagram from "../../assets/icons/apps/instagram.png";
import linkedin from "../../assets/icons/apps/linkedin.png";
import gmail from "../../assets/icons/apps/gmail.png";
import googleDrive from "../../assets/icons/apps/googledrive.png";
import calendly from "../../assets/icons/apps/calendly.png";
import tiktok from "../../assets/icons/apps/tiktok.png";
import googleDocs from "../../assets/icons/apps/googledocs.png";
import googleSheets from "../../assets/icons/apps/googlesheet.png";
import microsoftTeams from "../../assets/icons/apps/mircosoftteams.png";
import microsoftWord from "../../assets/icons/apps/word.png";
import outlook from "../../assets/icons/apps/outlook.png";
import slack from "../../assets/icons/apps/slack.png";
import calCom from "../../assets/icons/apps/cal.png";
import googleMeet from "../../assets/icons/apps/googlemeet.png";
import stripe from "../../assets/icons/apps/stripe.png";
import whatsapp from "../../assets/icons/apps/whatsapp.png";
import { toast } from "react-toastify";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
// import { useLinkedIn } from "react-linkedin-login-oauth2";
import { setAppState, resetAppState } from "../../reducers/appSlice";
// import axios from "axios";

// Link app apis
import {
  // getLinkedInAccessToken,
  linkedinSignIn,
  signoutApp,
} from "../../action/apps";
import { useEffect } from "react";
import { setWorkspaceAction } from "../../action/workspace";
import WorkspaceButton from "../../components/common/WorkspaceButton";
const WorkSpaceField = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // const { linkedInLogin } = useLinkedIn({
  //   clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
  //   redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
  //   scope: "profile email",
  //   onSuccess: (code) => {
  //     localStorage.setItem("workspace_name", workspaceName || "");
  //     console.log("code==>", code);
  //     dispatch(getLinkedInAccessToken(code));
  //     closeModal();
  //   },
  //   onError: (error) => {
  //     localStorage.removeItem("linkedin_access_token");
  //     dispatch(resetAppState({ app: "linkedin" }));
  //     console.log(error);
  //   },
  //   closePopupMessage: "Login failed",
  // });

  const { workspaceName } = useParams();
  const { name } = useSelector((state: RootState) => state.workspace);

  const appState = useSelector((state: RootState) => state.app);
  const userDetails = useSelector(
    (state: RootState) => state.user?.userDetails
  );
  // const apps = useMemo(() => {
  //   return [
  //     { name: "Notion", icon: notion, id: "notion" },
  //     { name: "Twitter/X", icon: twitter, id: "twitter" },
  //     { name: "Instagram", icon: instagram, id: "instagram" },
  //     {
  //       name: "LinkedIn",
  //       icon: linkedin,
  //       id: "linkedin",
  //       onClick: () =>
  //         appState["linkedin"]
  //           ? signoutApp("linkedin", dispatch)
  //           : linkedinSignIn(navigate),
  //     },
  //     {
  //       name: "Gmail app",
  //       icon: gmail,
  //       id: "gmail",
  //       onClick: () =>
  //         appState["gmail"] ? signoutApp("gmail", dispatch) : googleSignIn(),
  //     },
  //     { name: "Google drive", icon: googleDrive, id: "googledrive" },
  //     { name: "Calendly", icon: calendly, id: "calendly" },
  //     { name: "TikTok", icon: tiktok, id: "tiktok" },
  //     { name: "Google docs", icon: googleDocs, id: "googleDocs" },
  //     { name: "Google sheets", icon: googleSheets, id: "googleSheet" },
  //     { name: "Microsoft teams", icon: microsoftTeams, id: "microsoftTeams" },
  //     { name: "Microsoft word", icon: microsoftWord, id: "microsoftword" },
  //     { name: "Outlook", icon: outlook, id: "outlook" },
  //     { name: "Slack", icon: slack, id: "slack" },
  //     { name: "Cal.com", icon: calCom, id: "calcom" },
  //     { name: "Google meet", icon: googleMeet, id: "googleMeet" },
  //     { name: "Stripe", icon: stripe, id: "stripe" },
  //     { name: "Whatsapp", icon: whatsapp, id: "whatsapp" },
  //   ];
  // }, [appState]);

  //general login succsess handler

  const handleLoginSuccess = async (
    app: string,
    tokenResponse: TokenResponse
  ) => {
    const payload = {
      app,
      state: {
        accessToken: tokenResponse.access_token,
        isLogin: true,
      },
    };
    dispatch(setAppState(payload));
  };

  //general loggin error handler
  const handleLoginError = (app: string) => {
    dispatch(resetAppState({ app }));
    toast.error(`Failed to log in with ${app}`, {
      position: "top-right",
      className: "text-sm sm:text-lg",
    });
  };

  const handleGmailClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/google/auth/google`,
      "google sheet Login",
      "width=500,height=700"
    );
  };

  const handleGoogleDriveClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/google/auth/google`,
      "google sheet Login",
      "width=500,height=700"
    );
  };

  const handleGoogleDocsClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/google/auth/google`,
      "google sheet Login",
      "width=500,height=700"
    );
  };

  const handleGoogleSheetsClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/google/auth/google`,
      "google sheet Login",
      "width=500,height=700"
    );
  };

  const handleGoogleMeetClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/google/auth/google`,
      "google meet Login",
      "width=500,height=700"
    );
  };

  const handleNotionClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/notion/auth/notion`,
      "notion Login",
      "width=500,height=700"
    );
  };

  const handleTwitterClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/twitter/auth/twitter`,
      "x Login",
      "width=500,height=700"
    );
  };

  const handleInstagramClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/instagram/auth/instagram`,
      "instagram Login",
      "width=500,height=700"
    );
  };

  const handleLinkedInClick = () => {
    console.log("LinkedIn clicked");
    if (appState.linkedin.isLogin) {
      signoutApp("linkedin", dispatch);
      localStorage.removeItem("linkedin_access_token");
      localStorage.removeItem("workspace_name");
      return;
    }
    localStorage.setItem("workspace_name", workspaceName || "");
    linkedinSignIn();
  };

  const handleCalendlyClick = () => {
    // Open the Calendly login window
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/calendly/connect-calendly`,
      "Calendly Login",
      "width=500,height=700"
    );
  };

  const handleTikTokClick = () => {
    window.open("/auth/tiktok", "TikTok Login", "width=500,height=700");
  };

  const handleMicrosoftTeamsClick = () => {
    window.open(
      "/auth/microsoft-teams",
      "Microsoft Teams Login",
      "width=500,height=700"
    );
  };

  const handleMicrosoftWordClick = () => {
    window.open(
      "/auth/microsoft-word",
      "Microsoft Word Login",
      "width=500,height=700"
    );
  };

  const handleOutlookClick = () => {
    window.open("/auth/outlook", "Outlook Login", "width=500,height=700");
  };

  const handleSlackClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/slack/auth/slack`,
      "Slack Login",
      "width=500,height=700"
    );
  };

  const handleCalComClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/calcom/auth/calcom`,
      "cal.com Login",
      "width=500,height=700"
    );
  };

  const handleStripeClick = () => {
    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/api/stripe/auth/stripe`,
      "cal.com Login",
      "width=500,height=700"
    );
  };

  const handleWhatsappClick = () => {
    window.open("/auth/whatsapp", "WhatsApp Login", "width=500,height=700");
  };

  useEffect(() => {
    dispatch(
      setWorkspaceAction({ name: workspaceName, user: userDetails?._id })
    );
  }, [workspaceName, userDetails?._id, dispatch]);

  // Listener to receive the token from the popup
  // window.addEventListener("message", (event) => {
  //   if (event.origin === window.location.origin) {
  //     console.log("Event Origin: ", event.origin);
  //     console.log("Window Location: ", window.location.href);

  //     // Handle the received access token
  //     const { access_token } = event.data;
  //     console.log("Access Token:", access_token);

  //     // Use the window name for the localStorage key
  //     const windowName = window.name || "default"; // Default if window.name is empty

  //     if (access_token) {
  //       localStorage.setItem(`access_token_${windowName}`, access_token);
  //       console.log(`Access token saved as: access_token_${windowName}`);
  //     } else {
  //       console.log("No access token received.");
  //     }

  //     // Close the window
  //     window.close();
  //   }
  // });

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8 flex justify-center items-center w-full">
      <div className="w-full sm:max-w-[70rem] mx-auto">
        <div className="flex flex-row justify-between gap-x-4 p-0">
          <h1 className="text-[1.25rem] sm:text-4xl font-bold p-0 inline-block">
            {name}
          </h1>
          <div className="relative w-auto p-0">
            <Search className="w-4 h-4 sm:w-6 sm:h-6 absolute top-[1rem] sm:top-[1.3rem] left-4 -translate-y-1/2 text-[#A5A5A5]" />
            <input
              type="search"
              placeholder="Search apps..."
              className=" lg:w-[16rem] md:w-[20rem] w-full bg-[#F2F2F2] rounded-full py-1 sm:py-2 pl-12 inline-block ml-auto"
            />
          </div>
        </div>
        <hr className="sm:hidden bg-[#707070] opacity-30 w-full border-[0.75px] my-6 sm:my-8" />

        <div className="w-full sm:max-w-[70rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-y-8 gap-x-8 mb-8 sm:my-8">
          <WorkspaceButton
            handleClick={handleNotionClick}
            icon={notion}
            isLogin={appState.notion.isLogin}
            name={"Notion"}
          />
          <WorkspaceButton
            handleClick={handleTwitterClick}
            icon={twitter}
            isLogin={appState.twitter.isLogin}
            name={"Twitter/X"}
          />
          <WorkspaceButton
            handleClick={handleInstagramClick}
            icon={instagram}
            isLogin={appState.instagram.isLogin}
            name={"Instagram"}
          />
          <WorkspaceButton
            handleClick={handleLinkedInClick}
            icon={linkedin}
            isLogin={appState.linkedin.isLogin}
            name={"LinkedIn"}
          />
          <WorkspaceButton
            handleClick={() => handleGmailClick()}
            icon={gmail}
            isLogin={appState.gmail.isLogin}
            name={"Gmail app"}
          />
          <WorkspaceButton
            handleClick={handleGoogleDriveClick}
            icon={googleDrive}
            isLogin={appState.googledrive.isLogin}
            name={"Google drive"}
          />
          <WorkspaceButton
            handleClick={handleCalendlyClick}
            icon={calendly}
            isLogin={appState.calendly.isLogin}
            name={"Calendly"}
          />
          <WorkspaceButton
            handleClick={handleTikTokClick}
            icon={tiktok}
            isLogin={appState.tiktok.isLogin}
            name={"TikTok"}
          />
          <WorkspaceButton
            handleClick={handleGoogleDocsClick}
            icon={googleDocs}
            isLogin={appState.googleDocs.isLogin}
            name={"Google docs"}
          />
          <WorkspaceButton
            handleClick={handleGoogleSheetsClick}
            icon={googleSheets}
            isLogin={appState.googleSheet.isLogin}
            name={"Google sheets"}
          />
          <WorkspaceButton
            handleClick={handleMicrosoftTeamsClick}
            icon={microsoftTeams}
            isLogin={appState.microsoftTeams.isLogin}
            name={"Microsoft teams"}
          />
          <WorkspaceButton
            handleClick={handleMicrosoftWordClick}
            icon={microsoftWord}
            isLogin={appState.microsoftWord.isLogin}
            name={"Microsoft word"}
          />
          <WorkspaceButton
            handleClick={handleOutlookClick}
            icon={outlook}
            isLogin={appState.outlook.isLogin}
            name={"Outlook"}
          />
          <WorkspaceButton
            handleClick={handleSlackClick}
            icon={slack}
            isLogin={appState.slack.isLogin}
            name={"Slack"}
          />
          <WorkspaceButton
            handleClick={handleCalComClick}
            icon={calCom}
            isLogin={appState.calcom.isLogin}
            name={"Cal.com"}
          />
          <WorkspaceButton
            handleClick={handleGoogleMeetClick}
            icon={googleMeet}
            isLogin={appState.googleMeet.isLogin}
            name={"Google meet"}
          />
          <WorkspaceButton
            handleClick={handleStripeClick}
            icon={stripe}
            isLogin={appState.stripe.isLogin}
            name={"Stripe"}
          />
          <WorkspaceButton
            handleClick={handleWhatsappClick}
            icon={whatsapp}
            isLogin={appState.whatsapp.isLogin}
            name={"Whatsapp"}
          />
        </div>
        <hr className=" hidden sm:block bg-slate-700 opacity-30 w-full border my-6 sm:my-8" />
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-[20rem] py-3 rounded-full">
            <Check className="w-6 h-6 mx-auto" />
            <span className="sr-only">Confirm</span>
          </button>
        </div>
        {/* <div className="sm:hidden ">
          <hr className="bg-[#707070] w-full border-[0.75px] my-6 sm:my-8" />
          <div className="flex flex-col gap-y-4">
            <button
              onClick={() => {}}
              className="w-full bg-[#F5F5F5] hover:bg-[#A5A5A5] text-black font-medium py-3 rounded-full transition duration-300 ease-in-out flex justify-center gap-x-2 "
            >
              <X className="w-6 h-6" /> Close workspace
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
export default WorkSpaceField;
