import React from "react";

const Success = () => {
  return (
    <div className="mx-4 mb-12 h-[80vh] flex flex-col items-center justify-center">
      <svg
        className="w-20 h-20 rounded-full"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="#219f4d"
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z" />
      </svg>
      <h1 className=" text-xl text-center mt-6">New Employee Created!</h1>
    </div>
  );
};

export default Success;
