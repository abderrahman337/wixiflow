"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputGroup from "../../components/common/InputGroup";
import { AppDispatch, RootState } from "../../store/store";
import { setWorkspaceAction } from "../../action/workspace";
import { getLinkedInAccessToken } from "../../action/apps";
const WorkSpace = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userDetails = useSelector(
    (state: RootState) => state.user?.userDetails
  );
  const [workspaceName, setWorkspaceName] = useState<string>("");

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle workspace creation logic here
    dispatch(
      setWorkspaceAction({ name: workspaceName, user: userDetails?._id })
    );
    navigate(`/workspace/${workspaceName}`);
    console.log("Creating workspace:", workspaceName);
  };

  useEffect(() => {
    const _workspaceName = localStorage.getItem("workspace_name");
    const code = searchParams.get("code");
    // console.log("code==>", code);
    if (_workspaceName && code) {
      setWorkspaceName(_workspaceName);
      dispatch(getLinkedInAccessToken(code));
      dispatch(
        setWorkspaceAction({ name: _workspaceName, user: userDetails?._id })
      );
      navigate(`/workspace/${_workspaceName}`);
      localStorage.removeItem("workspace_name");
    } else {
      navigate("/workspace");
      localStorage.removeItem("linkedin_access_token");
      localStorage.removeItem("workspace_name");
    }
  }, [userDetails?._id, searchParams, navigate, dispatch]);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-2 px-2">
        <div className="text-left">
          <h1 className="text-[2rem] sm:text-[3rem] font-bold text-[#525252] mb-2 tracking-tight">
            Mixiflow
          </h1>
          <h2 className="text-[2.5rem] sm:text-[4rem] font-semibold text-[#525252] mb-8 leading-tight">
            Create your
            <br />
            Workspace
          </h2>
        </div>
        <div className="gap-y-6">
          <InputGroup
            type="text"
            placeholder="Name your workspace..."
            value={workspaceName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWorkspaceName(e.target.value)
            }
            className="w-full px-4 py-4 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 placeholder-gray-500"
            name="workspaceName"
            error={undefined}
          />
          <div className="w-full flex justify-center mt-12">
            <button
              onClick={handleCreateWorkspace}
              className="w-full sm:w-[50%] bg-[#2E7DF6] hover:bg-blue-600 text-white font-medium py-2 rounded-full transition duration-300 ease-in-out"
            >
              <Check className="w-6 h-6 mx-auto" />
            </button>
          </div>
        </div>
        <div className="sm:hidden ">
          <div className="flex flex-col gap-y-4">
            <hr className="bg-[#707070] w-full border-[0.75px] mt-4 mb-2 opacity-30" />
            <button
              onClick={() => {}}
              className="w-full bg-[#F5F5F5] hover:bg-[#A5A5A5] text-black font-medium py-3 rounded-full transition duration-300 ease-in-out flex justify-center gap-x-2"
            >
              <X className="w-6 h-6" /> Close workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
