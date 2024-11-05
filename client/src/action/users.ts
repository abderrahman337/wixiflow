import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import myAxios from "../lib/customAxios";
import { AppDispatch } from "../store/store";
import { setUserDetails, setUsers } from "../reducers/userSlice";

export const getAllUsers =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    try {
      const response = await myAxios.get(`/api/users`);

      console.log(response.data);
      dispatch(setUsers(response.data));
    } catch (error) {
      console.log(error);
    }
  };

export const addPlan =
  ({
    name,
    plan,
    total,
  }: {
    name: string | undefined;
    plan: number | undefined;
    total: number | undefined;
  }) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await myAxios.post("/api/users/addplan", {
        name,
        plan,
        total,
      });

      if (response.status === 200) {
        toast.success("Successful Subscribed!", {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
        console.log(response.data);
        dispatch(setUserDetails(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUser =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await myAxios.patch(`/api/users/delete`, id);

      if (response.status === 200) {
        toast.info("User Deleted!", {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
        dispatch(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

export const undoDeleteUser =
  (id: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const response = await myAxios.patch("/api/users/undo-delete", id);

      if (response.status === 200) {
        toast.info("User Undo Deleted!", {
          className: "text-sm sm:text-lg",
          position: "top-right",
        });
        dispatch(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
