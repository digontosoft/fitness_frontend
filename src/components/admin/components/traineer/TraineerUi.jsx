import { base_url } from "@/api/baseUrl";
import { ArrowBurger, ArrowDumbel } from "@/assets";
import ShowAnswerModal from "@/components/admin/components/traineer/ShowAnswerModal";
// import { FoodDairyModal } from "@/components/foodDairy/FoodDairyModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdminArrowCard from "../ui/AdminArrowCard";
import FormTitle from "../ui/FormTitle";
import TraineeLeftCard from "./TraineeLeftCard";
import TraineeRightCard from "./TraineeRightCard";
import {
  manageTraining,
  manageNutration,
  ArrowBurger as NutritionImage,
  ArrowDumbel as TrainingImage,
  manageTrainee,
} from "@/assets/index";
import { cookImage, masurmentTask, fitalGuide } from "@/assets";

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
        }
        const measurementResponse = await axios.get(
          `${base_url}/report/measurement/${userId}`
        );
        if (measurementResponse.status === 200) {
          setMeasurementReport(measurementResponse?.data.data.report_link);
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

  // Select appropriate image for each card
  const nutritionImage = manageNutration || NutritionImage;
  const trainingImage = manageTraining || TrainingImage;
  const answerImage = cookImage || NutritionImage;
  // 2 - masurmentTask, 3 - fitalGuide, 4 and 6 - manageTrainee (same image for 4 and 6)
  const mesurementImage = masurmentTask;
  const fitalGuideImage = fitalGuide;
  const manageTraineeImage = manageTrainee;
  const customTaskImage = ArrowBurger;
  const defaultImage = ArrowBurger;

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
        <TraineeLeftCard userId={userId}  user={user} setUser={setUser}/>
      </div>

      <div className="flex items-center justify-center">
        <span className="text-lg sm:text-xl font-bold leading-6 text-textColor text-center">
          משימות
        </span>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4 md:gap-5 max-w-5xl mx-auto">
        {userData?.userType === "admin" ? (
          <>
            <div className="w-[342px]">
              <AdminArrowCard
                image={nutritionImage}
                title="ניהול תפריטי תזונה אישיים"
                link={`/admin-dashboard/nutrition-lists/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={mesurementImage}
                title="ללוח מדדים אישי"
                link={`/admin-dashboard/mesurements-watch?userId=${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={fitalGuideImage}
                title="מסלול מדריך כושר אישי"
                link={`/admin-dashboard/fital-guide/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={manageTraineeImage}
                title="ניהול מתאמנים"
                link={`/admin-dashboard/manage-trainee/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={mesurementImage}
                title="הצגת מדדים קודמים"
                link={measurementReport ? measurementReport : "#"}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={manageTraineeImage}
                title="מעקב מתאמנים"
                link={`/admin-dashboard/trainee-tracking/${userId}`}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-[342px]">
              <AdminArrowCard
                image={answerImage}
                title="תשובות מתאמן"
                link={`/dashboard/answers-list/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={mesurementImage}
                title="ללוח מדדים אישי"
                link={`/dashboard/mesurements-watch?userId=${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={fitalGuideImage}
                title="מסלול מדריך כושר אישי"
                link={`/dashboard/nutrition-lists/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={trainingImage}
                title="תוכניות אימון"
                link={`/dashboard/assigned-training-list/${userId}`}
              />
            </div>
          </>
        )}
        <div className="w-[342px]">
          <AdminArrowCard
            image={mesurementImage}
            title="נהל משימות מותאמות אישית"
            link={`/dashboard/add-custom-task?userId=${userId}`}
          />
        </div>
        <div className="w-[342px]">
          <AdminArrowCard
            image={trainingImage}
            title="ניהול תפריטי תזונה אישיים"
            link={exerciseReport ? exerciseReport : "#"}
          />
        </div>
      </div>
      {/* {openModal && (
        <>
          <p>Modal is Open</p>
          <FoodDairyModal userId={userId} onClose={() => setOpenModal(false)} />
        </>
      )} */}
      {openAnswer && (
        <ShowAnswerModal userId={userId} onclose={() => setOpenAnswer(false)} />
      )}
    </div>
  );
};

export default TraineerUi;
