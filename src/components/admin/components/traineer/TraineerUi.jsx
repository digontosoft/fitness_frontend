import { base_url } from "@/api/baseUrl";
import { ArrowBurger, ArrowDumbel } from "@/assets";
import ShowAnswerModal from "@/components/admin/components/traineer/ShowAnswerModal";
import { FoodDairyModal } from "@/components/foodDairy/FoodDairyModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import AdminArrowCard from "../ui/AdminArrowCard";
import AdminArrowCardWithoutImage from "../ui/AdminArrowCardWithoutImage";
import FormTitle from "../ui/FormTitle";
import TraineeLeftCard from "./TraineeLeftCard";
import TraineeRightCard from "./TraineeRightCard";

const TraineerUi = ({ userId }) => {
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [exerciseReport, setExerciseReport] = useState(null);
  const [measurementReport, setMeasurementReport] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${base_url}/getUser/${userId}`);
        setUser(response.data.data);
        localStorage.setItem(
          "selectedUserId",
          JSON.stringify(response.data.data._id)
        );
        const exerciseResponse = await axios.get(
          `${base_url}/report/excercise/${userId}`
        );
        if (exerciseResponse.status === 200) {
          setExerciseReport(exerciseResponse?.data.data.report_link);
          console.log(
            "exercise report",
            exerciseResponse?.data.data.report_link
          );
        }
        const measurementResponse = await axios.get(
          `${base_url}/report/measurement/${userId}`
        );
        if (measurementResponse.status === 200) {
          setMeasurementReport(measurementResponse?.data.data.report_link);
          console.log(
            "measurement report",
            measurementResponse?.data.data.report_link
          );
        }
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
  };

  const handleAnswer = () => {
    setOpenAnswer(true);
  };

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4">
        <FormTitle title="ניהול מתאמנים" />
        <span className="flex items-center gap-2">
          {user?.firstName} {user?.lastName}
        </span>
      </div>

      <div
        className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-5"
        dir="rtl"
      >
        <TraineeRightCard
          gender={user?.gender}
          userId={userId}
          user={user}
          setUser={setUser}
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
        {
          userData?.userType === "admin" ?
          <>
          
            <div className="w-[342px]">
          <AdminArrowCard
            image={ArrowBurger}
            title="ניהול תפריטי תזונה אישיים"
            link={`/admin-dashboard/nutrition-lists/${userId}`}
          />
        </div>
        <div className="w-[342px]">
          <AdminArrowCard
            image={ArrowDumbel}
            title="ניהול תוכנית אימון"
            link={`/admin-dashboard/assigned-training-list/${userId}`}
            className="w-[342px]"
          />
        </div>
        <AdminArrowCardWithoutImage
          title="לדוח מדדים אישי"
          link={`/admin-dashboard/mesurements-watch?userId=${userId}`}
        />

        <AdminArrowCardWithoutImage title="יומן אכילה" onClick={handleModal} />

        <AdminArrowCardWithoutImage
          title="תשובות מתאמן"
          link={`/admin-dashboard/answers-list/${userId}`}
        />
          </>

          :
<>

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
        <AdminArrowCardWithoutImage
          title="נהל משימות מותאמות אישית"
          link={`/dashboard/add-custom-task?userId=${userId}`}
        />
</>
        }
      
        <div
          className="w-[342px] h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
          dir="ltr"
        >
          <Button className="rounded-2xl w-[25px] h-6">
            <FaArrowLeftLong />
          </Button>
          <div className="flex items-center">
            <a
              href={measurementReport}
              download
              className="text-base font-bold leading-5 text-[#0A2533]"
            >
              הצגת מדדים קודמים
            </a>
          </div>
        </div>
        <div
          className="w-[342px] h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
          dir="ltr"
        >
          <Button className="rounded-2xl w-[25px] h-6">
            <FaArrowLeftLong />
          </Button>
          <div className="flex items-center">
            <a
              href={exerciseReport}
              download
              className="text-base font-bold leading-5 text-[#0A2533]"
            >
              לדוח ביצועי תרגילים
            </a>
          </div>
        </div>
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
