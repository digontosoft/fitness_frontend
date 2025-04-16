import FormTitle from "../ui/FormTitle";
import AdminArrowCard from "../ui/AdminArrowCard";
import { ArrowDumbel, ArrowBurger } from "@/assets";
import AdminArrowCardWithoutImage from "../ui/AdminArrowCardWithoutImage";
import { Button } from "@/components/ui/button";
import TraineeRightCard from "./TraineeRightCard";
import TraineeLeftCard from "./TraineeLeftCard";
import { useEffect, useState } from "react";
import { base_url } from "@/api/baseUrl";
import axios from "axios";
import { toast } from "sonner";
import { FoodDairyModal } from "@/components/foodDairy/FoodDairyModal";
import ShowAnswerModal from "@/components/admin/components/traineer/ShowAnswerModal";

const TraineerUi = ({ userId }) => {
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        setUser(response.data.data);
        localStorage.setItem(
          "firstName",
          JSON.stringify(response.data.data.firstName)
        );
        localStorage.setItem(
          "selectedUserId",
          JSON.stringify(response.data.data._id)
        );
        localStorage.setItem(
          "lastName",
          JSON.stringify(response.data.data.lastName)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

  const updateStatus = async (userType) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: user._id,
        userType,
      });
      if (response.status === 200) {
        toast.success("User Type Updated Successfully");
        setUser((prevUser) => ({
          ...prevUser,
          userType,
        }));
      }
    } catch (error) {}
  };
  const handleModal = () => {
    setOpenModal(true);
    console.log("modal clicked");
  };

  const handleAnswer = () => {
    setOpenAnswer(true);
  };
  const userFirstName = JSON.parse(localStorage.getItem("firstName"));
  const userLastName = JSON.parse(localStorage.getItem("lastName"));
  const userName = userFirstName + " " + userLastName;

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4">
        <FormTitle title="ניהול מתאמנים" />
        <span className="flex items-center gap-2 flex-row-reverse">
          {userName}
          <Button
            className="bg-customBg"
            size="sm"
            onClick={() =>
              updateStatus(user?.userType === "admin" ? "trainee" : "admin")
            }
          >
            {user?.userType === "admin" ? "Make Trainer" : " הפוך למאמן"}
          </Button>
        </span>
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5"
        dir="rtl"
      >
        <TraineeRightCard
          gender={user?.gender}
          userId={userId}
          stepAverage={user?.step_average}
          stepTarget={user?.step_target}
        />
        <TraineeLeftCard userId={userId} />
      </div>

      <div className="flex items-center justify-center">
        <span className="text-lg sm:text-xl font-bold leading-6 text-textColor text-center">
          משימות
        </span>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-5 max-w-5xl mx-auto">
        <div className="w-[342px]">
          <AdminArrowCard
            image={ArrowBurger}
            title="ניהול תפריטי תזונה אישיים"
            link={`/dashboard/nutrition-lists/${userId}`}
          />
        </div>
        <div className="w-[342px]">
          <AdminArrowCard
            image={ArrowDumbel}
            title="ניהול תוכנית אימון"
            link={`/dashboard/assigned-training-list/${userId}`}
            className="w-[342px]"
          />
        </div>
        <AdminArrowCardWithoutImage
          title="לדוח מדדים אישי"
          link={`/dashboard/mesurements-watch?userId=${userId}`}
        />

        <AdminArrowCardWithoutImage title="יומן אכילה" onClick={handleModal} />

        <AdminArrowCardWithoutImage
          title="תשובות מתאמן"
          link={`/dashboard/answers-list/${userId}`}
        />
      </div>
      {openModal && (
        <>
          <p>Modal is Open</p>
          <FoodDairyModal userId={userId} onClose={() => setOpenModal(false)} />
        </>
      )}
      {openAnswer && (
        <ShowAnswerModal userId={userId} onclose={() => setOpenAnswer(false)} />
      )}
    </div>
  );
};

export default TraineerUi;
