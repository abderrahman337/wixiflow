import "./App.css";
import "./output.css";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//google and microsoft 
import { MsalProvider } from "@azure/msal-react";

import { GoogleOAuthProvider } from "@react-oauth/google";
// Components
import Loading from "./components/common/Loading";
import Layout from "./components/common/Layout";
import AuthProvider from "./provider/authProvider";
// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import OAuthCallback from "./pages/auth/OAuthCallback";
import Dashboard from "./pages/dashboard/Dashboard";
import SubscriptionCard from "./components/common/SubscriptionCard";
import AdminPanel from "./pages/admin/AdminPanel";
import WorkSpace from "./pages/workspace/WorkSpace";
// import WorkspaceCreate from "./components/workspace/CreateWorkSpace";
import WorkSpaceField from "./pages/workspace/WorkSpaceField";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Productivity from "./pages/productivity/Productivity";
import NotFound from "./pages/NotFound";
// import ChatWorkflow from "./pages/apps/chatworflow";
import {pca} from '../mslconfig'


// Apps
import GmailInbox from "./pages/apps/GmailInbox";
import HomeScreen from "./pages/works/HomeScreen";



function App() {
  
  return (

    <GoogleOAuthProvider clientId="449100618241-bbkj1knp6us9edr7o4tgm05cj3a251jo.apps.googleusercontent.com">
      <MsalProvider instance={pca}>

    <Suspense fallback={<Loading />}>
      <div style={{ minWidth: "100vw" }}>
        <Router>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oauth-callback" element={<OAuthCallback />} />
                <Route
                  path="/login"
                  element={<Login closeModal={() => {}} />} // Provide an empty function for closeModal
                />
                <Route
                  path="/signup"
                  element={<SignUp closeModal={() => {}} />} // Provide an empty function for closeModal
                />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/workspace" element={<WorkSpace />} />
                {/* <Route path="/workspace/create" element={<WorkspaceCreate />} /> */}
                {/* <Route path="/chatworkflow" element={<ChatWorkflow />} /> */}

                <Route
                  path="/workspace/:workspaceName"
                  element={<WorkSpaceField />}
                />
                <Route path="/admin" element={<AdminPanel />} />

                
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
                {/* Apps */}
                <Route path="/gmail" element={<GmailInbox />} />
                <Route path="/works" element={<HomeScreen />} />
                <Route path="/productivity" element={<Productivity />}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </Router>
      </div>
    </Suspense>
    </MsalProvider>

    </GoogleOAuthProvider>

  );
}

export default App;
