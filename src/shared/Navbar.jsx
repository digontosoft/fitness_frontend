import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { adminLink, recipeLink, traineeLink } from "@/constants/NavLink";
import { redLogo } from "../assets/index";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const userType = userData?.userType;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
  };

  return (
    <nav className="bg-transparent md:bg-white shadow-md ">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a
          href=""
          className="flex items-center space-x-2 sm:block hidden"
          onClick={logout}
        >
          <span className="text-xl font-bold text-gray-800" dir="rtl">
            התנתק
          </span>
          <LogOut className="w-5 h-5" />
        </a>
        {/* <div className="text-xl font-bold text-gray-800 hidden md:flex">
          {userType === "admin" ? (
            <>
              <a
                href={adminLink.find((item) => item.title === "התנתקות")?.link}
                className="flex items-center space-x-2"
              >
                <span>
                  {adminLink.find((item) => item.title === "התנתקות")?.title ||
                    "Brand"}
                </span>
                <img
                  src={adminLink.find((item) => item.title === "התנתקות")?.icon}
                  alt="התנתקות icon"
                  className="w-5 h-5"
                />
              </a>
            </>
          ) : userType === "trainee" ? (
            <>
              <a
                href={
                  traineeLink.find((item) => item.title === "התנתקות")?.link
                }
                className="flex items-center space-x-2"
              >
                <span>
                  {traineeLink.find((item) => item.title === "התנתקות")
                    ?.title || "Brand"}
                </span>
                <img
                  src={
                    traineeLink.find((item) => item.title === "התנתקות")?.icon
                  }
                  alt="התנתקות icon"
                  className="w-5 h-5"
                />
              </a>
            </>
          ) : userType === "recipe" ? (
            <>
              <a
                href={recipeLink.find((item) => item.title === "התנתקות")?.link}
                className="flex items-center space-x-2"
              >
                <span>
                  {recipeLink.find((item) => item.title === "התנתקות")?.title ||
                    "Brand"}
                </span>
                <img
                  src={
                    recipeLink.find((item) => item.title === "התנתקות")?.icon
                  }
                  alt="התנתקות icon"
                  className="w-5 h-5"
                />
              </a>
            </>
          ) : (
            <></>
          )}
        </div> */}
        {userType === "admin" ? (
          <div className="hidden md:flex justify-between items-center space-x-9">
            {adminLink.map(({ _id, title, link, icon: Icon }) => (
              <NavLink
                key={_id}
                to={link}
                end={link === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center text-gray-600 hover:text-gray-900 font-bold space-x-2 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                <span>{title}</span>
              </NavLink>
            ))}
          </div>
        ) : userType === "trainee" ? (
          <div className="hidden md:flex justify-between items-center space-x-9">
            {traineeLink.map(({ _id, title, link, icon: Icon }) => (
              <NavLink
                key={_id}
                to={link}
                className={({ isActive }) =>
                  `flex items-center text-gray-600 hover:text-gray-900 font-bold space-x-2 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                <span>{title}</span>
              </NavLink>
            ))}
          </div>
        ) : userType === "recipe" ? (
          <div className="hidden md:flex justify-between items-center space-x-9">
            {recipeLink.map(({ _id, title, link, icon: Icon }) => (
              <NavLink
                key={_id}
                to={link}
                className={({ isActive }) =>
                  `flex items-center text-gray-600 hover:text-gray-900 font-bold space-x-2 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                <span>{title}</span>
              </NavLink>
            ))}
          </div>
        ) : (
          <div>No valid user type or token found.</div>
        )}

        <div className="flex items-center md:justify-center  pr-[40%] md:pr-0">
          <img src={redLogo} alt="logo" className="w-15 h-14" />
        </div>

        {/* Hamburger Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <MdOutlineClose /> : <CiMenuFries />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white p-4 shadow-md">
          <div className="space-y-2">
            {userType === "admin" ? (
              <div className="flex flex-col space-y-2">
                {adminLink.map(({ _id, title, link, icon: Icon }) => (
                  <NavLink
                    key={_id}
                    to={link}
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 font-semibold space-x-2 ${
                        isActive
                          ? "text-red-500"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                    }
                  >
                    <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                    <span>{title}</span>
                  </NavLink>
                ))}
              </div>
            ) : userType === "trainee" ? (
              <div className="flex flex-col space-y-2">
                {traineeLink.map(({ _id, title, link, icon: Icon }) => (
                  <NavLink
                    key={_id}
                    to={link}
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 font-semibold space-x-2 ${
                        isActive
                          ? "text-red-500"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                    }
                  >
                    <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                    <span>{title}</span>
                  </NavLink>
                ))}
              </div>
            ) : userType === "recipe" ? (
              <div className="flex flex-col space-y-2">
                {recipeLink.map(({ _id, title, link, icon: Icon }) => (
                  <NavLink
                    key={_id}
                    to={link}
                    className={({ isActive }) =>
                      `flex items-center text-gray-600 hover:text-gray-900 font-semibold space-x-2 ${
                        isActive
                          ? "text-red-500"
                          : "text-gray-600 hover:text-gray-900"
                      }`
                    }
                  >
                    <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                    <span>{title}</span>
                  </NavLink>
                ))}
              </div>
            ) : (
              <div>No valid user type or token found.</div>
            )}
          </div>
          <a href="" className="flex items-center space-x-2" onClick={logout}>
            <span className="text-xl font-bold text-gray-800" dir="rtl">
              התנתק
            </span>
            <LogOut className="w-5 h-5" />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
