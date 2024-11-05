import { createSlice } from "@reduxjs/toolkit";
import { IAppState } from "./types";

// Initial state for multiple apps
const initialState: Record<string, IAppState> = {
  gmail: { accessToken: "", isLogin: false },
  twitter: { accessToken: "", isLogin: false },
  linkedin: { accessToken: "", isLogin: false },
  instagram: { accessToken: "", isLogin: false },
  microsoftWord: { accessToken: "", isLogin: false },
  googledrive: { accessToken: "", isLogin: false },
  calendly: { accessToken: "", isLogin: false },
  tiktok: { accessToken: "", isLogin: false },
  googleSheet: { accessToken: "", isLogin: false },
  googleDocs: { accessToken: "", isLogin: false },
  notion: { accessToken: "", isLogin: false },
  microsoftTeams: { accessToken: "", isLogin: false },
  outlook: { accessToken: "", isLogin: false },
  slack: { accessToken: "", isLogin: false },
  calcom: { accessToken: "", isLogin: false },
  googleMeet: { accessToken: "", isLogin: false },
  stripe: { accessToken: "", isLogin: false },
  whatsapp: { accessToken: "", isLogin: false },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Set state for a specific app (e.g., Gmail, Google Sheets, etc.)
    setAppState: (state, action) => {
      state[action.payload.app] = action.payload.state;
    },
    // Reset state for a specific app
    resetAppState: (state, action) => {
      state[action.payload.app] = initialState[action.payload.app];
    },
  },
});

export const { setAppState, resetAppState } = appSlice.actions;
export default appSlice.reducer;
