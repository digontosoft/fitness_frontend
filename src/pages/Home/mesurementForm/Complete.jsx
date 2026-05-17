import Title from "@/components/measurements/Tilte";
import HeroVideo from "@/components/startTraining/HeroVideo";

import { useLocation } from "react-router-dom";
import TaskCompleteForm from "../TaskCompleteForm";

const Complete = () => {
  const locatin = useLocation();
  const data = locatin.state;
  // console.log("mc", data);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div>
      <div className="px-4 sm:px-0">
      <HeroVideo
        videoUrl={
          userInfo?.gender === "male"
            ? "https://youtu.be/iKJWC6dDjKQ?feature=shared"
            : "https://www.youtube.com/watch?v=uUo9Bw5ytrI"
        }
      />
      </div>
      <Title tilte={"הזנת מדדים"} />
      <TaskCompleteForm data={data} />
    </div>
  );
};

export default Complete;
