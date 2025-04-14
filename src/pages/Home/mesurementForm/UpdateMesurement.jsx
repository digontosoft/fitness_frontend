import Title from "@/components/measurements/Tilte";
import HeroVideo from "@/components/startTraining/HeroVideo";
import MeasurementUpdate from "../MeasurementUpdate";

const UpdateMesurement = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <div>
      <HeroVideo
        videoUrl={
          userInfo?.gender === "male"
            ? "https://youtu.be/iKJWC6dDjKQ?feature=shared"
            : "https://www.youtube.com/watch?v=uUo9Bw5ytrI"
        }
      />
      <Title title="הזנת מדדים אישית" className="py-0" />
      <MeasurementUpdate />
    </div>
  );
};

export default UpdateMesurement;
