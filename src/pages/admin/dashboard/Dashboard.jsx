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
    fetchData();
  }, []);

  const traineeUsers = users.filter((user) => user.userType === "trainee");
  const recipeUsers = users.filter((user) => user.userType === "recipe");

  const handleSelectUser = (selectedUser) => {
    if (selectedUser.length > 0) {
      navigate(`/dashboard/traineer/${selectedUser[0]._id}`);
    }
  };
  return (
    <Container className="min-h-[72vh] my-10 sm:px-0 px-4">
      <div
        className="flex flex-col items-center
      justify-center space-y-8"
      >
        <Title tilte="ניהול מתאמנים" />
        <div className="flex items-center justify-center gap-x-5">
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-9 h-9 bg-custom-radial rounded-full">
              <span className="text-sm font-bold leading-5 text-white text-center">
                {traineeUsers?.length}
              </span>
            </div>
            <span>משתמשים מתאמנים</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center w-9 h-9 bg-custom-radial rounded-full">
              <span className="text-sm font-bold leading-5 text-white text-center">
                {recipeUsers?.length}
              </span>
            </div>
            <span>משתמשי מתכונים</span>
          </div>
        </div>
        {/* <SearchBox inputClass="md:w-[335px] md:h-[54px]" /> */}
        <Select
          className="rounded-lg h-12 min-w-80"
          direction="rtl"
          valueField="_id"
          labelField={"firstName"}
          options={users}
          searchBy={"firstName"}
          onChange={handleSelectUser}
        />
        <span className="text-xl font-bold leading-6 text-textColor">
          משימות
        </span>
        <div
          className="grid grid-cols-2 gap-4 items-center justify-center"
          // dir="ltr"
        >
          <AdminArrowCard image={women1} title={"אישור מתאמנים חדשים"} />
          <AdminArrowCard image={ArrowBurger} title={"ניהול מדריכי תזונה"} />
          <AdminArrowCard
            image={women2}
            title={"ניהול מתאמנים קיימים"}
            link={"/dashboard/approve-email"}
          />
          <AdminArrowCard image={ArrowDumbel} title={"ניהול תרגילים"} />
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;
