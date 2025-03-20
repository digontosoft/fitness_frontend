import AdminArrowCard from "@/components/admin/components/ui/AdminArrowCard";
import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";
import { ArrowBurger, ArrowDumbel } from "@/assets";
import { useEffect, useState } from "react";
import { women1, women2 } from "@/assets/index";
import Select from "react-dropdown-select";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [traineeUsers, setTraineeUsers] = useState([]);
  const [recipeUsers, setRecipeUsers] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/getUsers`);
      console.log("emails:", response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (users?.length > 0) {
      // Only filter if users has data
      setTraineeUsers(users.filter((user) => user.userType === "trainee"));
      setRecipeUsers(users.filter((user) => user.userType === "recipe"));
    }
  }, [users]);
  useEffect(() => {
    if (users?.length > 0) {
      // Only filter if users has data
      const traineeUsers = users.filter((user) => user.userType === "trainee");
      const recipeUsers = users.filter((user) => user.userType === "recipe"); // Corrected variable name

      localStorage.setItem("traineeUsers", JSON.stringify(traineeUsers.length));
      localStorage.setItem("recipeUsers", JSON.stringify(recipeUsers.length));
    }
  }, [users]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectUser = (selectedUser) => {
    if (selectedUser.length > 0) {
      navigate(`/dashboard/traineer/${selectedUser[0]._id}`);
    }
  };
  const traineeUsersLength = JSON.parse(localStorage.getItem("traineeUsers"));
  const recipeUsersLength = JSON.parse(localStorage.getItem("recipeUsers"));
  console.log("traineeUsers", traineeUsersLength);
  return (
    <Container className="min-h-[72vh] my-10 sm:px-0 px-4">
      {/* <div
        className="flex flex-col items-center
      justify-center space-y-8"
      >
        <Title tilte="ניהול מתאמנים" />
        <div className="flex items-center justify-center gap-x-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-9 h-9 bg-custom-radial rounded-full">
              <span className="text-sm font-bold leading-5 text-white text-center">
                {traineeUsersLength}
              </span>
            </div>
            <span>משתמשים מתאמנים</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-9 h-9 bg-custom-radial rounded-full">
              <span className="text-sm font-bold leading-5 text-white text-center">
                {recipeUsersLength}
              </span>
            </div>
            <span>משתמשי מתכונים</span>
          </div>
        </div>
        <Select
          className="rounded-lg h-12 min-w-80"
          direction="rtl"
          valueField="_id"
          labelField={"firstName"}
          options={traineeUsers}
          searchBy={"firstName"}
          onChange={handleSelectUser}
        />
        <span className="text-xl font-bold leading-6 text-textColor">
          משימות
        </span>
        <div
          className="grid grid-cols-2 gap-4 items-center justify-center"
        >
          <AdminArrowCard
            image={women1}
            title={"אישור מתאמנים חדשים"}
            link={"/dashboard/approve-email"}
          />
          <AdminArrowCard
            image={ArrowBurger}
            title={"ניהול מדריכי תזונה"}
            link={"/dashboard/nutrition-lists"}
          />
          <AdminArrowCard
            image={women2}
            title={"ניהול מתאמנים קיימים"}
            link={"/dashboard/trainee-users-list"}
          />
          <AdminArrowCard
            image={ArrowDumbel}
            title={"ניהול תרגילים"}
            link={"/dashboard/exercise-list"}
          />
          <AdminArrowCard
            image={ArrowDumbel}
            title={"Workout Management"}
            link={"/dashboard/workout-list"}
          />
          <AdminArrowCard
            image={ArrowDumbel}
            title={"Training Management"}
            link={"/dashboard/training-list"}
          />
        </div>
      </div> */}

      <div className="flex flex-col items-center justify-center space-y-6 px-4">
        <Title tilte="ניהול מתאמנים" />

        <div className="sm:flex sm:flex-row flex-col items-center justify-center gap-5 sm:space-y-0 space-y-4">
          <div className="flex  items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-custom-radial rounded-full">
              <span className="text-sm font-bold text-white">
                {traineeUsersLength}
              </span>
            </div>
            <span className="text-sm md:text-base">משתמשים מתאמנים</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-custom-radial rounded-full">
              <span className="text-sm font-bold text-white">
                {recipeUsersLength}
              </span>
            </div>
            <span className="text-sm md:text-base">משתמשי מתכונים</span>
          </div>
        </div>

        <Select
          className="rounded-lg h-12 w-full min-w-80"
          direction="rtl"
          valueField="_id"
          labelField="firstName"
          options={traineeUsers}
          searchBy="firstName"
          onChange={handleSelectUser}
        />

        <span className="text-lg md:text-xl font-bold text-textColor">
          משימות
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          <AdminArrowCard
            image={women1}
            title="אישור מתאמנים חדשים"
            link="/dashboard/approve-email"
          />
          <AdminArrowCard
            image={ArrowBurger}
            title="ניהול מדריכי תזונה"
            link="/dashboard/nutrition-lists"
          />
          <AdminArrowCard
            image={women2}
            title="ניהול מתאמנים קיימים"
            link="/dashboard/trainee-users-list"
          />
          <AdminArrowCard
            image={ArrowDumbel}
            title="נהל תוכניות אימון"
            link="/dashboard/exercise-list"
          />
          <AdminArrowCard
            image={ArrowDumbel}
            title="נהל אימונים"
            link="/dashboard/workout-list"
          />
          <AdminArrowCard
            image={ArrowDumbel}
            title="ניהול הדרכה"
            link="/dashboard/training-list"
          />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
