import { base_url } from "@/api/baseUrl";
import ArrowGroup from "@/components/home/ArrowGroup";
import LeftCard from "@/components/home/LeftCard";
import RightCard from "@/components/home/RightCard";
import { WelcomeModal } from "@/components/home/WelcomeModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { TaskModal } from "./TaskModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskModalOpen, setIsTaskModalOpen] = useState(false);
  const [userTasks, setUserTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const Id = user._id;

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
    setIsModalOpen(true);
  }, [user?.isNewUser]);

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
  console.log("mesurement data", getMesurement);
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
          <LeftCard data={getMesurement} />
          <RightCard user={user} />
        </div>
        <div className="pt-24 flex flex-col justify-end md:justify-center items-center ">
          <h1 className="text-xl font-bold text-[#0A2533] text-end md:text-center ">
            משימות
          </h1>
          <Carousel className="w-full max-w-6xl mt-5">
            <CarouselContent className="-ml-1 flex">
              {userTasks?.map((task) => (
                <CarouselItem
                  className="pl-2 md:pl-4 basis-1/3 flex-shrink-0 cursor-pointer"
                  key={task?._id}
                >
                  <ArrowGroup onclick={handleOpenModal} task={task} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
