import { base_url } from "@/api/baseUrl";
import logo from "@/assets/image/logo.svg";
import { Button } from "@/components/ui/button";
import {
  adminLink,
  recipeLink,
  recipeLinkMobileOrder,
  supperAdminLink,
  traineeLink,
} from "@/constants/NavLink";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userInfo"));
  const userType = userData?.userType;
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
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

  const hasWorkoutTask = userTasks.some(
    (task) =>
      (task?.task_type === "workout" && task?.task_status !== "Disabled") ||
      task?.task_status !== "Completed"
  );

  // 🔹 Close menu if user clicks outside of it
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     document.addEventListener("touchstart", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     document.removeEventListener("touchstart", handleClickOutside);
  //   };
  // }, [isOpen]);

useEffect(() => {
    const handleClickOutside = (event) => {
      // 👇 নতুন শর্ত যোগ করা হলো: যদি ক্লিক মেনুর বাইরে এবং বাটনে না হয়
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) // টগল বাটনকে বাইরে ক্লিক থেকে বাদ দেওয়া হলো
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);


  return (
    <nav className="bg-transparent md:bg-white shadow-md">
      <div className="container mx-auto relative flex min-h-[8rem] items-center justify-between px-3 py-0 sm:justify-between md:min-h-0 md:p-4">
        {/* Logo */}
        <a
          href=""
          className="hidden sm:flex items-center space-x-2"
          onClick={logout}
        >
          <span className="font-bold text-black" dir="rtl">
            התנתק
          </span>
          <LogOut className="w-5 h-5" />
        </a>

        {userType === "admin" ? (
          <div className="hidden md:flex justify-between items-center space-x-9">
            {adminLink.map(({ _id, title, link, icon: Icon }) => (
              <NavLink
                key={_id}
                to={link}
                end={link === "/admin-dashboard"}
                className={({ isActive }) =>
                  `flex items-center font-bold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                }
                dir="rtl"
              >
                <span dir="rtl">{title}</span>
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
                  `flex items-center font-bold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                }
                dir="rtl"
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
                  // Always "#7994CB" for active, otherwise black
                  `flex items-center font-bold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                }
                dir="rtl"
              >
                <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                <span dir="rtl">{title}</span>
              </NavLink>
            ))}
          </div>
        ) : userType === "supperadmin" ? (
          <div className="hidden md:flex justify-between items-center space-x-9" dir="rtl">
            {supperAdminLink.map(({ _id, title, link, icon: Icon }) => (
              <NavLink
                key={_id}
                to={link}
                end={link === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center font-bold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                }
                dir="rtl"
              >
                <span dir="rtl">{title}</span>
              </NavLink>
            ))}
          </div>
        ) : (
          <div>No valid user type or token found.</div>
        )}

        <Link
          to={
            userType === "trainee"
              ? "/"
              : userType === "recipe"
                ? "/recipe"
                : "/dashboard"
          }
          className="pointer-events-auto absolute left-1/2 top-1/2 z-[1] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:mx-0 md:static md:left-auto md:top-auto md:z-auto md:translate-x-0 md:translate-y-0"
        >
          <img
            src={logo}
            alt="logo"
            className="h-32 w-32 object-cover md:h-24 md:w-24"
          />
        </Link>

        {/* Hamburger Menu Button */}
        <div className="relative z-[2] ml-auto md:ml-0 md:hidden">
          <Button
            ref={buttonRef}
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
        <div
          ref={menuRef}
          className="md:hidden flex flex-col bg-white px-3 py-2 shadow-md"
        >
          <div className="flex flex-col space-y-1.5" dir="ltr">
            {userType === "admin" ? (
              <div className="flex flex-col space-y-2">
                {adminLink.map(({ _id, title, link, icon: Icon }) => (
                    <NavLink
                      key={_id}
                      to={link}
                      end="/admin-dashboard"
                      className={({ isActive }) =>
                        `flex items-center font-semibold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                      }
                      onClick={() => setIsOpen(false)}
                      dir="rtl"
                    >
                      <span dir="rtl">{title}</span>
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
                        `flex items-center font-semibold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                      }
                      onClick={() => setIsOpen(false)}
                      dir="rtl"
                    >
                      <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                      <span>{title}</span>
                    </NavLink>
                  ))}
              </div>
            ) : userType === "recipe" ? (
              <div className="flex flex-col space-y-2">
                {recipeLinkMobileOrder.map(({ _id, title, link, icon: Icon }) => (
                    <NavLink
                      key={_id}
                      to={link}
                      className={({ isActive }) =>
                        `flex items-center font-semibold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                      }
                      onClick={() => setIsOpen(false)}
                      dir="rtl"
                    >
                      <img src={Icon} alt={`${title} icon`} className="w-5 h-5" />
                      <span dir="rtl">{title}</span>
                    </NavLink>
                  ))}
              </div>
            ) : userType === "supperadmin" ? (
              <div className="flex flex-col space-y-2">
                {supperAdminLink.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    to={link}
                    end={link === "/dashboard"}
                    className={({ isActive }) =>
                      `flex items-center font-semibold gap-x-4 ${isActive ? "text-[#7994CB]" : "text-black"}`
                    }
                    onClick={() => setIsOpen(false)}
                    dir="rtl"
                  >
                    <span dir="rtl">{title}</span>
                  </NavLink>
                ))}
              </div>
            ) : (
              <div>No valid user type or token found.</div>
            )}
          </div>
          <a
            href=""
            className="mt-3 flex w-full items-center gap-x-4 border-t border-gray-200 pt-3 font-semibold text-black"
            dir="rtl"
            onClick={logout}
          >
            <span dir="rtl">התנתק</span>
            <LogOut className="h-5 w-5 shrink-0" aria-hidden />
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
