const WorkspaceButton = ({
  icon,
  name,
  isLogin,
  handleClick,
}: {
  icon: string;
  name: string;
  isLogin: boolean;
  handleClick: () => void;
}) => {
  return (
    <div className="flex items-center justify-between bg-[#F4F4F4] px-2 py-2 sm:py-3 rounded-full">
      <div className="flex items-center">
        <img src={icon} alt={name} className="w-10 h-6 sm:w-12 sm:h-8 mr-2" />
        <span className="text-sm sm:text-base font-semibold">{name}</span>
      </div>
      <button
        className={`${
          isLogin
            ? "bg-[#2E7DF6] hover:bg-[#2e92f6] text-white px-4"
            : "bg-[#E6E6E6] hover:bg-[#d5d5d5] text-[#2D7CF6] px-6"
        } text-sm sm:text-base font-semibold rounded-full py-1`}
        onClick={() => handleClick()}
      >
        {isLogin ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default WorkspaceButton;
