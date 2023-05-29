import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { NavLink } from "react-router-dom";
import { setMenuDisplay } from "../../redux/reducers/sharedSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { menuDisplay } = useSelector((state: RootState) => state.shared);

  const menuToggle = () => {
    dispatch(setMenuDisplay(!menuDisplay));
  };

  return (
    <header className="relative w-full bg-white shadow-lg">
      <div className="flex items-center justify-between">
        <div
          onClick={() => dispatch(setMenuDisplay(false))}
          className={
            "screen -z-20 fixed inset-0 opacity-0 bg-white h-screen hidden lg:!hidden transition-all " +
            (menuDisplay ? "!opacity-60 !z-10 !block" : "")
          }
        ></div>
        <div className="flex items-start justify-between w-full mt-auto  lg:w-[calc(100%_-_240px)] lg:ml-auto">
          <button
            type="button"
            aria-label="hamburger menu toggle"
            onClick={menuToggle}
            className="z-30 top-4 right-6 group lg:hidden py-4 px-6"
          >
            <div className="relative flex items-center justify-center rounded-full w-6 h-6 transform transition-all duration-200">
              <div
                className={
                  "flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center " +
                  (menuDisplay ? "-rotate-[45deg]" : "")
                }
              >
                <div
                  className={
                    "h-[2px] w-[20px] rounded transform transition-all duration-300 origin-right delay-75 " +
                    (menuDisplay
                      ? "-translate-y-[1px] h-[1px] w-1/2 -rotate-90 bg-white"
                      : "bg-white")
                  }
                ></div>
                <div
                  className={
                    "h-[2px] rounded " + (menuDisplay ? "bg-white" : "bg-white")
                  }
                ></div>
                <div
                  className={
                    "h-[2px] w-[20px] rounded self-end transform transition-all duration-300 origin-left delay-75 " +
                    (menuDisplay
                      ? "translate-y-[1px] h-[1px] w-1/2 -rotate-90 bg-white"
                      : "bg-white")
                  }
                ></div>
              </div>
            </div>
          </button>
          <div className=" w-[calc(100%_-_80px)] p-8">
            <div className="w-full">
              <NavLink
                aria-current="page"
                className="logo flex items-center justify-center w-full text-dark-gray"
                to="/"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 mr-4 text-cyan-900"
                >
                  <g clipPath="url(#clip0_52082_818)">
                    <path
                      opacity="0.4"
                      d="M6.00006 3H10.0001L11.4813 0.7775C11.5316 0.702204 11.5604 0.614683 11.5648 0.524274C11.5692 0.433865 11.549 0.343958 11.5063 0.264145C11.4636 0.184332 11.4 0.117607 11.3224 0.0710869C11.2447 0.024567 11.1559 -2.23135e-06 11.0654 1.51993e-10L4.93569 1.51993e-10C4.84517 -2.23135e-06 4.75635 0.024567 4.67871 0.0710869C4.60106 0.117607 4.5375 0.184332 4.4948 0.264145C4.4521 0.343958 4.43187 0.433865 4.43627 0.524274C4.44066 0.614683 4.46952 0.702204 4.51975 0.7775L6.00006 3ZM10.0001 4H6.00006C-0.324311 7.60625 0.00287671 12.395 0.00287671 13C0.00287671 14.6562 1.53756 16 3.43038 16H12.5704C14.4635 16 15.9979 14.6562 15.9979 13C15.9979 12.4062 16.2901 7.58625 10.0001 4Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M10.5312 3.25V3.75C10.5312 3.8163 10.5049 3.87989 10.458 3.92678C10.4111 3.97366 10.3476 4 10.2812 4H5.71875C5.65245 4 5.58886 3.97366 5.54197 3.92678C5.49509 3.87989 5.46875 3.8163 5.46875 3.75V3.25C5.46875 3.1837 5.49509 3.12011 5.54197 3.07322C5.58886 3.02634 5.65245 3 5.71875 3H10.2812C10.3476 3 10.4111 3.02634 10.458 3.07322C10.5049 3.12011 10.5312 3.1837 10.5312 3.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M5.87516 12.2037V9.94087H5V9.25493H5.87516V7H7.11301L8.34297 9.25493H9.17871V7H10.1248V9.25493H11V9.94087H10.1248V12.2037H8.88699L7.64126 9.94087H6.82129V12.2037H5.87516ZM6.82129 9.18397V9.25493H7.26281L6.80552 8.33246H6.79763L6.82129 9.18397ZM9.19448 10.8949H9.21025L9.17871 10.0749V9.94087H8.71354L8.74507 9.98817L9.19448 10.8949Z"
                      fill="currentColor"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_52082_818">
                      <rect width="16" height="16" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-2xl">Payroll System</span>
              </NavLink>
            </div>

            {/* <div className="bg-pink-400 h-40 w-">
              <div className=" px-4 max-w-xl lg:max-w-7xl mx-auto"></div>
            </div> */}
          </div>
        </div>

        {/* NAV / ASIDE */}
        <nav
          className={
            "menu bg-cyan-800 lg:text-sm lg:w-60 lg:mr-auto py-8 lg:py-4 fixed inset-0  right-1/3 lg:right-0 lg:translate-x-0 min-h-screen lg:min-h-0 h-auto overflow-y-scroll lg:overflow-hidden lg:px-0 z-20 transition-all ease-in-out duration-500 overflow-hidden border-r border-very-light-gray" +
            (menuDisplay ? "!translate-x-0 w-60 px-7" : " w-20")
          }
        >
          <ul
            className={
              "mt-10 lg:mt-0 w-full flex flex-col  justify-center font-medium text-white px-2 lg:pt-8 " +
              (!menuDisplay ? " items-center" : " items-start")
            }
          >
            <li className="hidden lg:flex flex-col items-center lg:p-0 lg:mb-8">
              <span className="w-24 h-24 bg-white rounded-full"></span>
              <h3 className="font-bold mt-2 text-xl">Admin</h3>
            </li>
            <li className="py-4 lg:p-0 w-full flex">
              <NavLink
                onClick={() => dispatch(setMenuDisplay(false))}
                to="/"
                end
                className={({ isActive }) =>
                  "mb-5 p-2 rounded-md w-full lg:mb-0 lg:flex lg:items-center cursor-pointer transition-all relative" +
                  (!isActive ? "" : " font-extrabold bg-cyan-300 bg-opacity-50")
                }
              >
                <span className="p-4 lg:py-2">
                  <i className="fa-solid fa-house "></i>
                </span>
                <span
                  className={
                    "lg:inline-flex lg:visible w-fit " +
                    (!menuDisplay
                      ? "collapse w-[1px] overflow-hidden sr-only  lg:not-sr-only "
                      : "")
                  }
                >
                  Home
                </span>
              </NavLink>
            </li>

            <li className="py-4 lg:p-0 w-full flex">
              <NavLink
                onClick={() => dispatch(setMenuDisplay(false))}
                to="/employees"
                className={({ isActive }) =>
                  "mb-5 p-2 rounded-md w-full lg:mb-0 lg:flex lg:items-center cursor-pointer transition-all relative" +
                  (!isActive ? "" : " font-extrabold bg-cyan-300 bg-opacity-50")
                }
              >
                <span className="p-4 lg:py-2">
                  <i className="fa-solid fa-user-group "></i>
                </span>
                <span
                  className={
                    "lg:inline-flex lg:visible w-fit " +
                    (!menuDisplay
                      ? "collapse ml-4 sr-only lg:not-sr-only "
                      : "")
                  }
                >
                  Employees
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
