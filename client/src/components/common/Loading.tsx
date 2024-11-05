import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="flex left-0 top-0 w-full h-full bg-[#a4a4a4] opacity-80 justify-center items-center fixed"
      style={{ zIndex: 999 }}
    >
      <Oval
        height={50}
        width={50}
        color="white"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="black"
        strokeWidth={7}
        strokeWidthSecondary={7}
      />
    </div>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
