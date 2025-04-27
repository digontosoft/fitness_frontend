import { base_url } from "@/api/baseUrl";
import ArrowGroup from "@/components/home/ArrowGroup";
import LeftCard from "@/components/home/LeftCard";
import RightCard from "@/components/home/RightCard";
import { WelcomeModal } from "@/components/home/WelcomeModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskModalOpen, setIsTaskModalOpen] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const Id = user._id;
  console.log("user", Id);

  const [getMesurement, setMesurement] = useState([]);
  useEffect(() => {
    const fetchMeasurement = async () => {
      try {
        const response = await axios.get(`${base_url}/measurement/${Id}`);
        if (response.status === 200) {
          setMesurement(response.data.data);
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

  useEffect(() => {
    const fetchUserTask = async () => {
      try {
        await axios
          .get(`${base_url}/get-user-task/${user._id}`)
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
      className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden"
      onClick={() => handleSubmit()}
    >
      {/* Welcome Modal */}
      {user?.is_video_popup === true && (
        <WelcomeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          userId={user?._id}
          handleSubmit={handleSubmit}
        />
      )}
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="sm:text-4xl text-2xl font-bold">
          היי {user?.firstName} {user?.lastName}
        </h1>

        {/* Cards Section */}
        <div className="pt-5 sm:pt-16 md:pt-20 flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-10 w-full">
          <LeftCard data={getMesurement} className="w-full md:w-1/2" />
          <RightCard user={user} className="w-full md:w-1/2" />
        </div>

        {/* Tasks Section */}
        <div className="max-w-3xl mx-auto justify-center sm:py-10" dir="ltr">
          <div className="pt-10 sm:pt-10 flex flex-wrap justify-center items-center w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A2533] text-center w-full">
              משימות
            </h1>

            {userTasks?.map((task) => (
              <div
                className="w-full sm:w-1/2 p-2 flex-shrink-0 cursor-pointer"
                key={task?._id}
              >
                <ArrowGroup onclick={handleOpenModal} task={task} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isModalOpen={taskModalOpen}
        setIsModalOpen={setIsTaskModalOpen}
        selectedTask={selectedTask}
        user_id={user?._id}
      />
    </div>
  );
};

export default Home;
