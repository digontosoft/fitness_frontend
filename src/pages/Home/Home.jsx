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

  const handleOpenModal = (task = null) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchUserTask = async () => {
      try {
        await axios
          .get(`${base_url}/get-user-task/${user._id}`)
          .then((response) => {
            if (response.status === 200) {
              setUserTasks(response.data.data);
              console.log("userTasks:", response?.data?.data);
            }
          });
      } catch (error) {
        console.error("Error fetching recipe book:", error);
      }
    };
    fetchUserTask();
  }, [user?._id]);
  return (
    <div className="min-h-screen">
      {user?.isNewUser && (
        <WelcomeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <div className="flex flex-col items-center justify-center pt-20">
        <h6 className="text-sm font normal text-gray-500">בוקר טוב</h6>
        <h1 className="text-4xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <div className="pt-20 flex gap-10 md:flex-row flex-col-reverse">
          <LeftCard />
          <RightCard user={user} />
        </div>
        <div className="pt-24 flex flex-col justify-end md:justify-center items-center ">
          <h1 className="text-xl font-bold text-[#0A2533] text-end md:text-center ">
            משימות
          </h1>
          <div className="mx-w-6xl mx-auto flex items-center justify-between gap-10 md:pt-20 py-10 flex-col md:flex-row">
            {userTasks.map((task) => (
              <ArrowGroup
                onclick={handleOpenModal}
                task={task}
                key={task?._id}
              />
            ))}
          </div>
        </div>
      </div>
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
