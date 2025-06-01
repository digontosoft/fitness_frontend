import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { adminLink, recipeLink, traineeLink } from "@/constants/NavLink";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import logo from "@/assets/image/logo.svg";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const userType = userData?.userType;
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const fetchUserTask = async () => {
      try {
        await axios
          .get(`${base_url}/get-user-task/${userData?._id}`)
          .then((response) => {
            if (response.status === 200) {
              setUserTasks(response.data.data);
            }
          });
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };
    fetchUserTask();
  }, [userData?._id]);

  const hasWorkoutTask = userTasks.some((task) => task.task_type === "workout");

  return (
    <nav className="bg-transparent md:bg-white shadow-md ">
      <div className="container mx-auto flex items-center sm:justify-between justify-end p-4">
        {/* Logo */}
        <a
          href=""
          className="hidden sm:flex items-center space-x-2"
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
                  `flex items-center text-black  font-bold gap-x-4 ${
                    isActive ? "text-red-500" : "text-black "
                  }`
                }
                dir="rtl"
              >
                {/* <img src={Icon} alt={`${title} icon`} className="w-5 h-5" /> */}
                <span dir="rtl">{title}</span>
              </NavLink>
            ))}
          </div>
        ) : userType === "trainee" ? (
          // <div className="hidden md:flex justify-between items-center space-x-9">
          //   {traineeLink.map(({ _id, title, link, icon: Icon }) => (
          //     <NavLink
          //       key={_id}
          //       to={link}
          //       className={({ isActive }) =>
          //         `flex items-center text-gray-600 hover:text-gray-900 font-bold gap-x-4 ${
          //           isActive
          //             ? "text-red-500"
          //             : "text-gray-600 hover:text-gray-900"
          //         }`
          //       }
          //       dir="rtl"
          //     >
          //       <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
          //       <span dir="rtl">{title}</span>
          //     </NavLink>
          //   ))}
          // </div>
          <div className="hidden md:flex justify-between items-center space-x-9">
            {traineeLink.map(({ _id, title, link, icon: Icon }) => {
              const isTrainingLink =
                link === "/trainings" || link === "/exercise-library";
              if (isTrainingLink && !hasWorkoutTask) {
                return (
                  <a
                    key={_id}
                    href="https://wa.link/gmt4t4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-black font-bold gap-x-4 cursor-not-allowed"
                    onClick={(e) => e.stopPropagation()}
                    dir="rtl"
                  >
                    <img
                      src={Icon}
                      alt={`${title} icon`}
                      className="w-5 h-5 opacity-50"
                    />
                    <span>{title}</span>
                  </a>
                );
              }

              return (
                <NavLink
                  key={_id}
                  to={link}
                  className={({ isActive }) =>
                    `flex items-center text-black font-bold gap-x-4 ${
                      isActive ? "text-red-500" : "text-black"
                    }`
                  }
                  dir="rtl"
                >
                  <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                  <span>{title}</span>
                </NavLink>
              );
            })}
          </div>
        ) : userType === "recipe" ? (
          <div className="hidden md:flex justify-between items-center space-x-9">
            {recipeLink.map(({ _id, title, link, icon: Icon }) => (
              <NavLink
                key={_id}
                to={link}
                className={({ isActive }) =>
                  `flex items-center text-gray-600 hover:text-gray-900 font-bold gap-x-4 ${
                    isActive
                      ? "text-red-500"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
                dir="rtl"
              >
                <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                <span dir="rtl">{title}</span>
              </NavLink>
            ))}
          </div>
        ) : (
          <div>No valid user type or token found.</div>
        )}

        <div className="flex items-center md:justify-center  pr-[35%] md:pr-0">
          <img src={logo} alt="logo" className="w-15 h-14 object-cover" />
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
                {adminLink
                  .slice()
                  .reverse()
                  .map(({ _id, title, link, icon: Icon }) => (
                    <NavLink
                      key={_id}
                      to={link}
                      className={({ isActive }) =>
                        `flex items-center text-black font-semibold gap-x-4 ${
                          isActive ? "text-red-500" : "text-black"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                      dir="rtl"
                    >
                      {/* <img src={Icon} alt={`${title} icon`} className="w-5 h-5" /> */}
                      <span dir="rtl">{title}</span>
                    </NavLink>
                  ))}
              </div>
            ) : userType === "trainee" ? (
              // <div className="flex flex-col space-y-2">
              //   {traineeLink.map(({ _id, title, link, icon: Icon }) => (
              //     <NavLink
              //       key={_id}
              //       to={link}
              //       className={({ isActive }) =>
              //         `flex items-center text-gray-600 hover:text-gray-900 font-semibold gap-x-4 ${
              //           isActive
              //             ? "text-red-500"
              //             : "text-gray-600 hover:text-gray-900"
              //         }`
              //       }
              //       onClick={() => setIsOpen(false)}
              //       dir="rtl"
              //     >
              //       <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
              //       <span dir="rtl">{title}</span>
              //     </NavLink>
              //   ))}
              // </div>
              <div className="flex flex-col space-y-2">
                {traineeLink
                  .slice()
                  .reverse()
                  .map(({ _id, title, link, icon: Icon }) => {
                    const isTrainingLink = link === "/trainings";

                    if (isTrainingLink && !hasWorkoutTask) {
                      return (
                        <a
                          key={_id}
                          href="https://wa.link/gmt4t4"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-black font-semibold gap-x-4 cursor-not-allowed"
                          dir="rtl"
                        >
                          <img
                            src={Icon}
                            alt={`${title} icon`}
                            className="w-5 h-5 opacity-50"
                          />
                          <span>{title}</span>
                        </a>
                      );
                    }

                    return (
                      <NavLink
                        key={_id}
                        to={link}
                        className={({ isActive }) =>
                          `flex items-center text-gray-600 hover:text-gray-900 font-semibold gap-x-4 ${
                            isActive
                              ? "text-red-500"
                              : "text-gray-600 hover:text-gray-900"
                          }`
                        }
                        onClick={() => setIsOpen(false)}
                        dir="rtl"
                      >
                        <img
                          src={Icon}
                          alt={`${title} icon`}
                          className="w-5 h-5"
                        />
                        <span>{title}</span>
                      </NavLink>
                    );
                  })}
              </div>
            ) : userType === "recipe" ? (
              <div className="flex flex-col space-y-2">
                {recipeLink
                  .slice()
                  .reverse()
                  .map(({ _id, title, link, icon: Icon }) => (
                    <NavLink
                      key={_id}
                      to={link}
                      className={({ isActive }) =>
                        `flex items-center text-black font-semibold gap-x-4 ${
                          isActive ? "text-red-500" : "text-black"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                      dir="rtl"
                    >
                      <img
                        src={Icon}
                        alt={`${title} icon`}
                        className="w-5 h-5"
                      />
                      <span dir="rtl">{title}</span>
                    </NavLink>
                  ))}
              </div>
            ) : (
              <div>No valid user type or token found.</div>
            )}
          </div>
          <a href="" className="flex items-center space-x-2" onClick={logout}>
            <span className="font-semibold text-black" dir="rtl">
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
