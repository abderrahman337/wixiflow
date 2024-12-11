import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import WorkspacePopup from "./WorkspacePopup"; 

const Workspace = () => {
  const [showPopup, setShowPopup] = useState(false);
  const currentPlan = useSelector((state: RootState) => state.user?.currentPlan);
  const navigate = useNavigate();

  const handleCreateWorkspace = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-8">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[2rem] sm:text-[2.5rem] font-semibold text-[#525252]">
            Current Plan
          </h2>
          <button
            onClick={() => navigate("/plans")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Upgrade Plan
          </button>
        </div>

        {/* Plan details */}
        {currentPlan ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <p className="font-semibold">Workspaces</p>
              <p className="text-xl">
                {currentPlan.workspacesUsed} / {currentPlan.maxWorkspaces}
              </p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <p className="font-semibold">Apps per Workspace</p>
              <p className="text-xl">{currentPlan.appsPerWorkspace}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <p className="font-semibold">Tasks per App</p>
              <p className="text-xl">{currentPlan.tasksPerApp}</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-md text-center">
              <p className="font-semibold">Status</p>
              <p className="text-xl text-green-600">{currentPlan.status}</p>
            </div>
          </div>
        ) : (
          <p className="text-red-500 mb-8">No current plan available. Please upgrade to create workspaces.</p>
        )}

        {/* Button to create workspace */}
        <button
          onClick={handleCreateWorkspace}
          className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 mb-6"
        >
          + Create Workspace
        </button>

        {/* Workspace List Placeholder */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left border">Name</th>
                <th className="px-4 py-2 text-left border">Apps</th>
                <th className="px-4 py-2 text-left border">Created At</th>
                <th className="px-4 py-2 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Placeholder - Replace with actual workspace data */}
              <tr>
                <td className="border px-4 py-2">Example Workspace</td>
                <td className="border px-4 py-2">5</td>
                <td className="border px-4 py-2">2024-12-01</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Workspace Creation Popup */}
      {showPopup && <WorkspacePopup setShowPopup={setShowPopup} />}
    </div>
  );
};

export default Workspace;
