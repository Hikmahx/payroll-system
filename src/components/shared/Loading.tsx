import React from "react";
// import loader from '../../assets/shared/loader.gif'

const Loading = () => {
  return (
    <section className="w-full px-6 xl:pr-0 py-4 rounded-md flex flex-1 h-full">
      <div className="flex items-center justify-center  bg-white p-6 rounded-md h-full w-full min-h-[50vh]">
        {/* <img src={loader} alt="loader" className="" /> */}
        <div className=" animate-bounce w-4 h-4 bg-cyan-500 rounded-full mb-12"></div>
        <div className=" animate-bounce w-4 h-4 bg-cyan-500 rounded-full mb-12"></div>
        <div className=" animate-bounce w-4 h-4 bg-cyan-500 rounded-full mb-12"></div>
        <p className="text-gray text-center sr-only">Loading employees</p>
      </div>
    </section>
  );
};

export default Loading;
