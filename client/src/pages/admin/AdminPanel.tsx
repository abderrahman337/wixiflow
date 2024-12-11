import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getAllUsers, deleteUser, undoDeleteUser } from "../../action/users";

interface ProgressBarProps {
  value: number; // Progress value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="relative w-full h-4 bg-gray-300 rounded-md overflow-hidden">
      <div
        className="absolute h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

const AdminPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (id: string | undefined) => {
    if (!id) {
      alert("User ID is undefined");
      return;
    }
    dispatch(deleteUser(id));
  };
  

  const handleUndoDelete = (id: string | undefined) => {
    if (id) {
      dispatch(undoDeleteUser(id));
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-white p-4">User</th>
              <th className="text-white p-4">Progress</th>
              <th className="text-white p-4">Requests Left</th>
              <th className="text-white p-4">Subscription Plan</th>
              <th className="text-white p-4">Start Date</th>
              <th className="text-white p-4">Expiry Date</th>
              <th className="text-white p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-700">
                <td className="p-4 text-center">{user.email}</td>
                <td className="p-4 text-center">
                  <ProgressBar value={(user.subscription?.remain || 0) / 10} />
                  <span className="text-sm">{(user.subscription?.remain ?? 0) / 10}%</span>
                </td>
                <td className="p-4 text-center">
                  {user.subscription?.total?.toLocaleString() || "0"}
                </td>
                <td className="p-4 text-center">
                  {user.subscription?.plan ? `$${user.subscription?.plan}` : "No Plan"}
                </td>
                <td className="p-4 text-center">01/01/2024</td>
                <td className="p-4 text-center">01/01/2024</td>
                <td className="p-4 flex justify-center items-center gap-2">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => handleUndoDelete(user._id)}
                  >
                    Undo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
