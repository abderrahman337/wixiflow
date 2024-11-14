import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getAllUsers } from "../../action/users";
import { deleteUser, undoDeleteUser } from "../../action/users";

interface ProgressBarProps {
  value: number; // Progress value between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  return (
    <div className="relative w-full h-5 bg-gray-200">
      <div
        className="absolute h-full bg-gray-500"
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
    if (id) {
      dispatch(deleteUser(id));
    }
  };

  const handleUndoDelete = (id: string | undefined) => {
    if (id) {
      dispatch(undoDeleteUser(id));
    }
  };

  // rounded-lg border
  
  return (
    <div className="p-4 bg-black">
      <div className=" flex flex-col text-center">
        <table className="min-w-[80vw] ">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3  dark:text-slate-200 text-center">
                User
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Number of Requests (Bar)
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Total Requests Left
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Subscription Plan
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Start Date
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Expiry Date
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Actions(Delete/Undo)
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                  {user.email}
                </td>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                  <ProgressBar value={user.subscription?.remain / 10 || 0} />
                  {user.subscription?.remain / 10 || 0} %
                </td>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                  {user.subscription?.total?.toLocaleString() || 0}
                </td>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                  {user.subscription?.plan
                    ? `$${user.subscription?.plan}`
                    : "No"}{" "}
                  Plan 
                  {user.subscription?.plan
                    ? "(Modify)"
                    : " "}
                </td>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                    01/01/2024
                </td>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                    01/01/2024
                </td>
                <td className="border dark:border-slate-600">
                  <button
                    className="text-white hover:bg-red-400 py-1 px-4 rounded-md"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <text className="text-white">/</text>
                  <button
                    className="text-white hover:bg-blue-500 py-1 px-4 rounded-md"
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
