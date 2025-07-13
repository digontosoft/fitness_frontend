import Title from "@/components/measurements/Tilte";
import HeroVideo from "@/components/startTraining/HeroVideo";

import TaskCompleteForm from "../TaskCompleteForm";
import { useLocation } from "react-router-dom";

const Complete = () => {
  const locatin = useLocation();
  const data = locatin.state;
  console.log("mc", data);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div className="">
      <HeroVideo
        videoUrl={
          userInfo?.gender === "male"
            ? "https://youtu.be/iKJWC6dDjKQ?feature=shared"
            : "https://www.youtube.com/watch?v=uUo9Bw5ytrI"
        }
      />
      <Title tilte={"הזנת מדדים"} />
      <TaskCompleteForm data={data} />
    </div>
  );
};

export default Complete;
