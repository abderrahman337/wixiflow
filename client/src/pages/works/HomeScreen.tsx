import boonful from "../../assets/icons/boonful.png";
import InfoIcon from "../../assets/icons/moreinfo.png";
import Gmail from "../../assets/icons/home/gmail.png";
import Twitter from "../../assets/icons/home/twitter.png";
import GoogleDocs from "../../assets/icons/home/googledocs.png";
import Notion from "../../assets/icons/home/notion.png";
import Calendly from "../../assets/icons/home/calendly.png";
import Profile from "../../assets/icons/profile.png";
import Notification from "../../assets/icons/notification.png";
import WorkspaceIcon from "../../assets/icons/workspacecreation.png";
import ViewWorkspaceIcon from "../../assets/icons/viewingworkspace.png";
import MixflowSetting from "../../assets/icons/mixiflowsetting.png";
import NewMessage from "../../assets/icons/newmessage.png";
import SendIcon from "../../assets/icons/sendbutton.png";
// import { CircleUserRound } from "lucide-react";

const HomeScreen = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#E8E8E8] sm:px-4">
      <div className="w-full flex flex-col max-w-2x rounded-lg">
        <div className="flex justify-center mb-8">
          <div className="w-full sm:w-[50rem] rounded-full p-2 sm:p-4">
            <img src={boonful} alt="" className="w-[8rem] sm:w-[10rem]" />
            <h1 className="text-[1.5rem] sm:text-[3rem] font-normal text-left text-[#626262] pl-8 sm:pl-10">
              Here's what you can say?
            </h1>
            {/* <ul className="list-image-[url('../../assets/icons/moreinfo.png')] list-inside pl-6">
              <li> */}
            <div className="my-4 pl-6 sm:pl-8 flex items-start sm:items-center">
              <img
                src={InfoIcon}
                alt=""
                className="w-[1.5rem] sm:w-[1.5rem] inline-block "
              />
              <p className="pl-2 text-left text-[#626262] text-[1rem] sm:text-[0.9rem] tracking-tight">
                {/* <Info className="w-4 h-4 mr-2" /> */}
                Tap on the apps in your workspace to see what you can say
              </p>
            </div>
            {/* </li>
            </ul> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 px-8 py-6 sm:px-10 text-[#626262]">
              <button className="flex items-center justify-start space-x-2 py-2 bg-[#D2D2D2] rounded-full pl-4">
                <img src={Gmail} alt="" className="w-[1.5rem] sm:w-[1.8rem]" />
                <span>Gmail</span>
              </button>
              <button className="flex items-center justify-start space-x-2 py-2 bg-[#D2D2D2] rounded-full pl-4">
                <img
                  src={Twitter}
                  alt=""
                  className="w-[1.5rem] sm:w-[1.2rem]"
                />
                <span>Twitter/X</span>
              </button>
              <button className="flex items-center justify-start space-x-2 py-2 bg-[#D2D2D2] rounded-full pl-4">
                <img
                  src={GoogleDocs}
                  alt=""
                  className="w-[1.5rem] sm:w-[1.2rem]"
                />
                <span>Google docs</span>
              </button>
              <button className="flex items-center justify-start space-x-2 py-2 bg-[#D2D2D2] rounded-full pl-4">
                <img src={Notion} alt="" className="w-[1.5rem] sm:w-[1.8rem]" />
                <span>Notion</span>
              </button>
              <button className="flex items-center justify-start space-x-2 py-2 bg-[#D2D2D2] rounded-full pl-4">
                <img
                  src={Calendly}
                  alt=""
                  className="w-[1.5rem] sm:w-[1.8rem]"
                />
                <span>Calendly</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full min-h-[3rem] bg-white rounded-xl px-32">
        <div className="flex flex-row">
          <input
            className="w-full text-base h-12"
            placeholder="Message Mixi..."
            type="text"
          />
          <div className="grid grid-cols-7 divide-x gap-x-4">
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                <img
                  src={SendIcon}
                  alt="Send"
                  className="w-[5rem] sm:w-[4.5rem]"
                />
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                <img
                  src={NewMessage}
                  alt="New Message"
                  className="w-[5rem] sm:w-[4.5rem]"
                />
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                <img
                  src={MixflowSetting}
                  alt="Mixflow setting"
                  className="w-[5rem] sm:w-[4.5rem]"
                />
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                {/* <CircleUserRound className="text-black" /> */}
                <img
                  src={ViewWorkspaceIcon}
                  alt="View workspaces"
                  className="w-[5rem] sm:w-[4.5rem]"
                />
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                {/* <CircleUserRound className="text-black" /> */}
                <img
                  src={WorkspaceIcon}
                  alt="Workspace"
                  className="w-[5rem] sm:w-[4.5rem]"
                />
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                <img
                  src={Notification}
                  alt="Notification"
                  className="w-[2rem] sm:w-[1.8rem]"
                />
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <button className="pl-4">
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-[2rem] sm:w-[2.2rem]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
