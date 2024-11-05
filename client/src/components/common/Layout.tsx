// import { useNavigate } from "react-router";
import { Bounce, ToastContainer } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../store/store";
// import { setUserDetails } from "../../reducers/userSlice";
// import { jwtDecode } from "jwt-decode";
// import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const { token } = useSelector((state: RootState) => state.user);

  // const accessToken = localStorage.getItem("accessToken");

  // useEffect(() => {
  //   if (accessToken && accessToken !== "undefined") {
  //     dispatch(setUserDetails(jwtDecode(accessToken)));
  //   }
  // }, [accessToken, token, dispatch, navigate]);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        className="text-[3rem] sm:text-[1rem]"
      />
      {children}
    </>
  );
};

export default Layout;
