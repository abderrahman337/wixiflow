import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

interface WorkspacePopupProps {
  setShowPopup: (value: boolean) => void;
}

const WorkspacePopup: React.FC<WorkspacePopupProps> = ({ setShowPopup }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const navigate = useNavigate();

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (workspaceName.trim() !== "") {
      // Here you would call the backend API to create the workspace
      console.log("Workspace created:", workspaceName);
      // Navigate to the Productivity page after successful workspace creation
      navigate("/productivity");
    } else {
      console.error("Workspace name cannot be empty.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Create Workspace</h2>
          <button onClick={() => setShowPopup(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleCreateWorkspace}>
          <input
            type="text"
            placeholder="Enter workspace name..."
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            <Check className="w-5 h-5 mx-auto" />
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkspacePopup;
