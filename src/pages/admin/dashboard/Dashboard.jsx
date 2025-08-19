import { base_url } from "@/api/baseUrl";
import ArrowDumbel from "@/assets/image/arrowDumble.svg";
import ArrowBurger from "@/assets/image/burger.svg";
import { women1, women2 } from "@/assets/index";
import AdminArrowCard from "@/components/admin/components/ui/AdminArrowCard";
import Container from "@/shared/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [traineeUsers, setTraineeUsers] = useState([]);
  const [adminTraineeLists, setAdminTraineeLists] = useState([]);
  const [recipeUsers, setRecipeUsers] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const adminId = user?._id;
  console.log('adminId',adminId)
  useEffect(() => {
      const fetchAdminTraineeLists = async () => {
    try {
      const response = await axios.get(`${base_url}/traineelistforadmin?adminId=${adminId}`);
      console.log("adminTraineeLists:", response.data.data);
      setAdminTraineeLists(response.data.data);
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  };
  fetchAdminTraineeLists();
  }, [adminId]);
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
     user.userType === "admin" ?  navigate(`/admin-dashboard/traineer/${selectedUser[0]._id}`) : navigate(`/dashboard/traineer/${selectedUser[0]._id}`);
    }
  };
  const traineeUsersLength = JSON.parse(localStorage.getItem("traineeUsers"));
  const recipeUsersLength = JSON.parse(localStorage.getItem("recipeUsers"));
  return (
    <Container className="min-h-[72vh] sm:my-10 sm:px-0 px-4">
      <div className="flex flex-col items-center justify-center space-y-6 px-4">
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
        {
          user.userType === "admin" ?
          <Select
           className="rounded-lg h-12 w-full min-w-[368px]"
           direction="rtl"
           valueField="_id"
           labelField="firstName"
           options={adminTraineeLists}
           searchBy="firstName"
           placeholder="בחר מתאמן"
           onChange={handleSelectUser}
         />
          :
            <Select
            className="rounded-lg h-12 w-full min-w-[368px]"
            direction="rtl"
            valueField="_id"
            labelField="firstName"
            options={traineeUsers}
            searchBy="firstName"
            placeholder="בחר מתאמן"
            onChange={handleSelectUser}
          />
        }

        <span className="text-lg md:text-xl font-bold text-textColor">
          משימות
        </span>

        {user.userType === "admin" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:w-2/3 w-full">
            <AdminArrowCard
              image={women1}
              title="אישור מתאמנים חדשים"
              link="/admin-dashboard/approve-email"
            />
            <AdminArrowCard
              image={women2}
              title="ניהול מתאמנים קיימים"
              link="/admin-dashboard/trainee-users-list"
            />
          </div>
        ) : (
          <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
          >
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
              title="נהל תרגילים"
              link="/dashboard/exercise-list"
            />
            <AdminArrowCard
              image={ArrowDumbel}
              title="נהל אימונים"
              link="/dashboard/workout-list"
            />
            <AdminArrowCard
              image={ArrowDumbel}
              title="נהל תוכניות אימון"
              link="/dashboard/training-list"
            />
            <AdminArrowCard
              image={ArrowDumbel}
              title="רשימת מנהלים"
              link="/dashboard/admin-list"
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
