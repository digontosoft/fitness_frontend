import { base_url } from "@/api/baseUrl";
import Loading from "@/components/common/Loading";
import ArrowGroup from "@/components/home/ArrowGroup";
import LeftCard from "@/components/home/LeftCard";
import RecurringCard from "@/components/home/RecurringCard";
import RightCard from "@/components/home/RightCard";
import { WelcomeModal } from "@/components/home/WelcomeModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";

const Home = () => {
  const [userSteps, setUserSteps] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskModalOpen, setIsTaskModalOpen] = useState(false);
  const [recurringTaskModalOpen, setIsRecurringTaskModalOpen] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recurringTasks, setRecurringTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const Id = user._id;

  const [getMesurement, setMesurement] = useState([]);

  
  const fetchUserRecurringTasks = async () => {
      try {
        const response = await axios.get(`${base_url}/get-user-recurring-tasks/${user._id}`);
        // console.log("recurringTasks:", response.data.data);
        setRecurringTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching email:", error);
        throw error;
      }
    };

 
useEffect(() => {
  const fetchMeasurement = async () => {
    try {
      const response = await axios.get(`${base_url}/measurement/${Id}`);
      const user_response = await axios.get(`${base_url}/getUser/${Id}`);

      if (response.status === 200) {
        const allMeasurements = response.data.data;

        // সর্বশেষ তারিখ বের করো
        allMeasurements.sort((a, b) => new Date(b.date) - new Date(a.date));

        // সবচেয়ে নতুন ডাটা
        const latestData = allMeasurements[0];

        setMesurement(latestData);
        setUserInfo(user_response.data.data);
      }
    } catch (error) {
      console.error("Measurement data not found", error);
    }
  };

  if (Id) {
    fetchMeasurement();
  }
}, [Id]);





  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  useEffect(() => {
    if (user?.is_video_popup) {
      setIsModalOpen(true);
    }
  }, [user?.is_video_popup]);

  const fetchUserSteps = async () => {
    try {
      await axios
        .get(`${base_url}/get-user-steps-vs-target/${user?._id}`)
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data.data;
            setUserSteps(userData);
          }
        });
    } catch (err) {
      console.log("error:", err);
    }
  };

  useEffect(() => {
    const fetchUserTask = async () => {
      setLoading(true);
      try {
        await axios
          .get(`${base_url}/get-user-task/${user._id}`)
          .then((response) => {
            if (response.status === 200) {
              setUserTasks(response.data.data);
              setLoading(false);
            }
          });
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };

    fetchUserSteps();
    fetchUserTask();
    fetchUserRecurringTasks();
  }, [user?._id]);

  const handleSubmit = async () => {
    const payload = {
      user_id: user?._id,
      is_video_popup: false,
    };

    try {
      const res = await axios.post(`${base_url}/updateUserInfo`, payload);
      if (res.status === 200) {
        const updatedUser = { ...user, is_video_popup: false };
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        setIsModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Failed to update user info:", error);
    }
  };

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden mb-5"
      // onClick={() => handleSubmit()}
    >
      {/* Welcome Modal */}
      {user?.is_video_popup === true && (
        <WelcomeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userId={user?._id}
          handleSubmit={handleSubmit}
          user={user}
        />
      )}
      <div className="flex items-center sm:justify-center justify-end gap-2 mt-10">
        <h1 className="sm:text-4xl text-2xl font-bold">
          {userInfo?.full_name}
        </h1>
        <h1 className="sm:text-4xl text-2xl font-bold">היי</h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-5">
        {/* Cards Section */}
        <div className="pt-5 sm:pt-16 flex flex-col-reverse md:flex-row items-center justify-center gap-5 md:gap-10 w-full">
          <LeftCard data={getMesurement} className="w-full md:w-1/2" />
          <RightCard
            user={user}
            userSteps={userSteps}
            className="w-full md:w-1/2"
          />
        </div>
        {/* title */}
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A2533] text-center w-full">
          משימות
        </h1>
        {/* Tasks Section */}
        {/* <div className="max-w-3xl mx-auto justify-center" dir="ltr">
        </div> */}
        <div className="flex flex-wrap justify-center items-center gap-10 max-w-3xl w-full">
          {loading ? (
            <Loading />
          ) : (
            userTasks?.map((task) => (
              // <div
              //    className="w-full cursor-pointer"
              //   key={task?._id}
              // >
              // </div>
              <ArrowGroup
                key={task?._id}
                onclick={handleOpenModal}
                task={task}
              />
            ))
          )}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 max-w-3xl w-full">

        {
          recurringTasks.length > 0 && (
          recurringTasks?.map((task) => (
            <RecurringCard key={task?._id} recurringTasks={task} setRecurringTasks={setRecurringTasks} />
          ))
            
          )
        }
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isModalOpen={taskModalOpen}
        setIsModalOpen={setIsTaskModalOpen}
        selectedTask={selectedTask}
        fetchUserSteps={fetchUserSteps}
        user_id={user?._id}
      />
    </div>
  );
};

export default Home;
