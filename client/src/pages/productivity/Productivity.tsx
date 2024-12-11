import React, { useState } from "react";
import { Check, Search, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import notion from "../../assets/icons/home/notion.png";
import x from "../../assets/icons/home/twitter.png";
import instagram from "../../assets/icons/apps/instagram.png";
import linkedin from "../../assets/icons/apps/linkedin.png";
import gmail from "../../assets/icons/home/gmail.png";
import googleDrive from "../../assets/icons/apps/googledrive.png";
import calendly from "../../assets/icons/home/calendly.png";
import tiktok from "../../assets/icons/apps/tiktok.png";
import googleDocs from "../../assets/icons/home/googledocs.png";
import googleSheets from "../../assets/icons/apps/googlesheet.png";
import microsoftTeams from "../../assets/icons/apps/mircosoftteams.png";
import microsoftWord from "../../assets/icons/apps/word.png";
import outlook from "../../assets/icons/apps/outlook.png";
import slack from "../../assets/icons/apps/slack.png";
import calCom from "../../assets/icons/apps/cal.png";
import googleMeet from "../../assets/icons/apps/googlemeet.png";
import stripe from "../../assets/icons/apps/stripe.png";
import whatsapp from "../../assets/icons/apps/whatsapp.png";

const apps = [
  { name: "Notion", icon: notion },
  { name: "Twitter/X", icon: x },
  { name: "Instagram", icon: instagram },
  { name: "LinkedIn", icon: linkedin },
  { name: "Gmail app", icon: gmail },
  { name: "Google drive", icon: googleDrive },
  { name: "Calendly", icon: calendly },
  { name: "TikTok", icon: tiktok },
  { name: "Google docs", icon: googleDocs },
  { name: "Google sheets", icon: googleSheets },
  { name: "Microsoft teams", icon: microsoftTeams },
  { name: "Microsoft word", icon: microsoftWord },
  { name: "Outlook", icon: outlook },
  { name: "Slack", icon: slack },
  { name: "Cal.com", icon: calCom },
  { name: "Google meet", icon: googleMeet },
  { name: "Stripe", icon: stripe },
  { name: "Whatsapp", icon: whatsapp },
];

const Productivity = () => {
  const { name } = useSelector((state: RootState) => state.workspace);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter apps based on search term
  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row justify-between gap-x-4 p-0">
          <h1 className="text-[1.25rem] sm:text-4xl font-bold p-0 inline-block">
            {name}
          </h1>
          <div className="relative w-auto p-0">
            <Search className="w-4 h-4 sm:w-6 sm:h-6 absolute top-[1rem] sm:top-[1.3rem] left-4 -translate-y-1/2 text-[#A5A5A5]" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search apps..."
              className="lg:w-[16rem] md:w-[20rem] w-full bg-[#F2F2F2] rounded-full py-1 sm:py-2 pl-12 inline-block ml-auto"
            />
          </div>
        </div>
        <hr className="sm:hidden bg-[#707070] opacity-30 w-full border-[0.75px] my-6 sm:my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-y-8 gap-x-8 mb-8 sm:my-8">
          {filteredApps.map((app, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#F4F4F4] px-2 py-2 sm:py-3 rounded-full"
            >
              <div className="flex items-center">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-10 h-6 sm:w-12 sm:h-8 mr-2"
                />
                <span className="text-sm sm:text-base font-semibold">
                  {app.name}
                </span>
              </div>
              <button className="bg-[#E6E6E6] hover:bg-[#d5d5d5] text-sm sm:text-base font-semibold rounded-full py-1 px-4 text-[#2D7CF6]">
                Sign in
              </button>
            </div>
          ))}
        </div>
        <hr className="hidden sm:block bg-slate-700 opacity-30 w-full border my-6 sm:my-8" />
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-[20rem] py-3 rounded-full">
            <Check className="w-6 h-6 mx-auto" />
            <span className="sr-only">Confirm</span>
          </button>
        </div>
        <div className="sm:hidden ">
          <hr className="bg-[#707070] w-full border-[0.75px] my-6 sm:my-8" />
          <div className="flex flex-col gap-y-4">
            <button
              onClick={() => {}}
              className="w-full bg-[#F5F5F5] hover:bg-[#A5A5A5] text-black font-medium py-3 rounded-full transition duration-300 ease-in-out flex justify-center gap-x-2 "
            >
              <X className="w-6 h-6" /> Close workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productivity;
