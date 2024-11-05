import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store/store.js";
createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="657263062153-uher16hhhvevkfco9pl9cuhk6irqodrn.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
