import ArrowGroup from "@/components/home/ArrowGroup";
import LeftCard from "@/components/home/LeftCard";
import RightCard from "@/components/home/RightCard";
import { WelcomeModal } from "@/components/home/WelcomeModal";
import { useEffect, useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setIsModalOpen(true);
  }, []);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="min-h-screen">
      <WelcomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="flex flex-col items-center justify-center pt-20">
        <h6 className="text-sm font normal text-gray-500">בוקר טוב</h6>
        <h1 className="text-4xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <div className="pt-20 flex gap-10 md:flex-row flex-col-reverse">
          <LeftCard />
          <RightCard />
        </div>
        <div className="pt-24 flex flex-col justify-end md:justify-center items-center ">
          <h1 className="text-xl font-bold text-[#0A2533] text-end md:text-center ">
            משימות
          </h1>
          <ArrowGroup />
        </div>
      </div>
    </div>
  );
};

export default Home;
