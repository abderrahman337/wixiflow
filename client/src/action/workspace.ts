import { AppDispatch } from "../store/store";
import { setWorkspace } from "../reducers/workspaceSlice";
export const setWorkspaceAction =
  ({ name, user }: { name: string | undefined; user: string | undefined }) =>
  async (dispatch: AppDispatch) => {
    dispatch(setWorkspace({ name, user }));
  };
