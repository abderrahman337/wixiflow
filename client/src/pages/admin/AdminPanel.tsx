import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getAllUsers } from "../../action/users";
import { deleteUser, undoDeleteUser } from "../../action/users";
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

  return (
    <div className="p-8">
      <div className=" flex flex-col text-center">
        <table className="min-w-[80vw] border-collapse border-gray-400 ">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3  dark:text-slate-200 text-center">
                User
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Number of Requests / Total Requests Left
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Subscription Plan
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Delete User
              </th>
              <th className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                Undo Delete User
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
                  {user.subscription?.remain?.toLocaleString() || 0} /{" "}
                  {user.subscription?.total?.toLocaleString() || 0}
                </td>
                <td className="text-gray-300 border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 dark:text-slate-200 text-center">
                  {user.subscription?.plan
                    ? `$${user.subscription?.plan}`
                    : "No"}{" "}
                  Plan
                </td>
                <td className="border dark:border-slate-600">
                  <button
                    className="bg-red-500 hover:bg-red-400 py-1 px-4 rounded-md"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="border dark:border-slate-600">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 py-1 px-4 rounded-md"
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
