import "./App.css";
import "./output.css";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import AdminPanel from "./pages/admin/AdminPanel";
import WorkSpace from "./pages/workspace/WorkSpace";
import WorkSpaceField from "./pages/workspace/WorkSpaceField";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import NotFound from "./pages/NotFound";

// Apps
import GmailInbox from "./pages/apps/GmailInbox";
import HomeScreen from "./pages/works/HomeScreen";
// import Payment from "./pages/payment/Payment";
function App() {
  return (
    <Suspense fallback={<Loading />}>
      {/* <GoogleOneTapLoginButton /> */}
      {/* loading ? <Loading />} */}
      <div style={{ minWidth: "100vw" }}>
        <Router>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/oauth-callback" element={<OAuthCallback />} />
                <Route
                  path="/login"
                  element={
                    <Login
                      closeModal={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <SignUp
                      closeModal={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  }
                />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/payment" element={<Payment />} /> */}
                <Route path="/workspace" element={<WorkSpace />} />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;
