
import { base_url } from "@/api/baseUrl";
import { ArrowBurger, newThree, newTrainee } from "@/assets";

import ShowAnswerModal from "@/components/admin/components/traineer/ShowAnswerModal";
// import { FoodDairyModal } from "@/components/foodDairy/FoodDairyModal";
// import { cookImage, fitalGuide, masurmentTask } from "@/assets";
import {
  manageTraining,
  ArrowBurger as NutritionImage,
  ArrowDumbel as TrainingImage,
} from "@/assets/index";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import AdminArrowCard from "../ui/AdminArrowCard";
import FormTitle from "../ui/FormTitle";
import TraineeLeftCard from "./TraineeLeftCard";
import TraineeRightCard from "./TraineeRightCard";
// import {
  
//   manageNutration,
//   ArrowBurger as NutritionImage,
//   ArrowDumbel as TrainingImage,
//   manageTrainee,

// } from "@/assets/index";
import { cookImage, fitalGuide, masurmentTask } from "@/assets";

const TraineerUi = ({ userId }) => {
  const [user, setUser] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [exerciseReportLoading, setExerciseReportLoading] = useState(false);
  const [measurementReportLoading, setMeasurementReportLoading] = useState(false);
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
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, [userId]);



  // console.log("user", userId);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${base_url}/measurement/calculate/${userId}`
  //       );

  //       const measurementResponse = await axios.get(
  //         `${base_url}/report/measurement/${userId}`
  //       );

  //       if (measurementResponse.status === 200) {
  //         setMeasurementReport(measurementResponse?.data.data.report_link);
  //       }

  //       setData(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [userId]);

  const updateStatus = async (userType) => {
    try {
      const response = await axios.post(`${base_url}/updateUserInfo`, {
        user_id: user._id,
        userType,
      });
      if (response.status === 200) {
        toast.success("סוג המשתמש עודכן בהצלחה");
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
  const trainingImage = manageTraining || TrainingImage;
  const answerImage = cookImage || NutritionImage;
  const mesurementImage = masurmentTask;
  const fitalGuideImage = fitalGuide;
  const customTaskImage = ArrowBurger;
  const defaultImage = ArrowBurger;


  const triggerBlobDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExerciseReportDownload = async () => {
    if (!userId || exerciseReportLoading) return;
    setExerciseReportLoading(true);
    try {
      const { data } = await axios.get(`${base_url}/report/excercise/${userId}`, {
        responseType: "blob",
      });
      triggerBlobDownload(data, "exercise-report.xlsx");
    } catch (error) {
      console.error("Error fetching exercise report:", error);
      toast.error("ההורדה נכשלה");
    } finally {
      setExerciseReportLoading(false);
    }
  };

  const handleMeasurementReportDownload = async () => {
    if (!userId || measurementReportLoading) return;
    setMeasurementReportLoading(true);
    try {
      const { data } = await axios.get(`${base_url}/report/measurement/${userId}`, {
        responseType: "blob",
      });
      triggerBlobDownload(data, "measurement-report.xlsx");
    } catch (error) {
      console.error("Error fetching measurement report:", error);
      toast.error("ההורדה נכשלה");
    } finally {
      setMeasurementReportLoading(false);
    }
  };

  return (
    <div className="space-y-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4">
        <FormTitle title="ניהול מתאמנים" />
        <span className="flex items-center gap-2">
          {user?.full_name}
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
                image={answerImage}
                title="תשובות מתאמן"
                link={`/admin-dashboard/answers-list/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={mesurementImage}
                title="מעקב היקפים"
                link={`/admin-dashboard/mesurements-watch?userId=${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={fitalGuideImage}
                title="ניהול תפריט אישי"
                link={`/admin-dashboard/nutrition-lists/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                title="ניהול תכניות אימון"
                image={newTrainee}
                link={`/admin-dashboard/assigned-training-list/${userId}`}
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
                // title="ללוח מדדים אישי"
                title="מעקב היקפים"
                link={`/dashboard/mesurements-watch?userId=${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                image={fitalGuideImage}
                // title="מסלול מדריך כושר אישי"
                title="ניהול תפריט אישי"
                link={`/dashboard/nutrition-lists/${userId}`}
              />
            </div>
            <div className="w-[342px]">
              <AdminArrowCard
                // image={trainingImage}
                // title="תוכניות אימון"
                title="ניהול תכניות אימון"
                image={newTrainee}
                link={`/dashboard/assigned-training-list/${userId}`}
              />
            </div>
          </>
        )}
        <div className="w-[342px]">
          <AdminArrowCard
            image={newThree}
            title="משימות מותאמות אישית"
            link={`/${userData?.userType === "admin" ? "admin-dashboard" : "dashboard"}/add-custom-task?userId=${userId}`}
          />
        </div>
        <div className="w-[342px]">
          {/* <AdminArrowCard
            image={newTrainee}
           <AdminArrowCard
            image={trainingImage}
            title="ניהול תפריטי תזונה אישיים"
            link={exerciseReport ? exerciseReport : "#"}
          />  */}
          <div
        className="w-full h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
        dir="ltr"
      >
       
        <Button
          className="rounded-2xl w-[25px] h-6 flex-shrink-0"
          onClick={handleExerciseReportDownload}
          disabled={exerciseReportLoading}
        >
          <FaArrowLeftLong />
        </Button>
        <div className="flex items-center gap-4 flex-1 justify-between">
          <div className="flex-1">
            <h1
              className="text-sm sm:text-base font-bold leading-5 text-[#0A2533] text-right line-clamp-2"
              dir="rtl"
              onClick={handleExerciseReportDownload}
            >
              {exerciseReportLoading ? "טוען..." : "דוח ביצועי אימונים"}
            </h1>
          </div>
          <div className="w-[95px] h-[90px] flex-shrink-0 overflow-hidden flex items-center justify-center bg-[#F7FAFC] rounded-lg">
            <img
              src={newTrainee}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
        </div>
        <div className="w-[342px]">
          <div
        className="w-full h-[100px] flex gap-4 items-center justify-between px-4 py-2 bg-white border border-[#efefef] rounded-2xl shadow-lg cursor-pointer"
        dir="ltr"
      >
       
        <Button
          className="rounded-2xl w-[25px] h-6 flex-shrink-0"
          onClick={handleMeasurementReportDownload}
          disabled={measurementReportLoading}
        >
          <FaArrowLeftLong />
        </Button>
        <div className="flex items-center gap-4 flex-1 justify-between">
          <div className="flex-1">
            <h1
              className="text-sm sm:text-base font-bold leading-5 text-[#0A2533] text-right line-clamp-2"
              dir="rtl"
              onClick={handleMeasurementReportDownload}
            >
              {measurementReportLoading ? "טוען..." : "הצגת מדדים קודמים"}
            </h1>
          </div>
          <div className="w-[95px] h-[90px] flex-shrink-0 overflow-hidden flex items-center justify-center bg-[#F7FAFC] rounded-lg">
            <img
              src={mesurementImage}
              alt=""
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
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
