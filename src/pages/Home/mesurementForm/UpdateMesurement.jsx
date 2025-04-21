import Title from "@/components/measurements/Tilte";
import HeroVideo from "@/components/startTraining/HeroVideo";
import MeasurementUpdate from "../MeasurementUpdate";

const UpdateMesurement = () => {
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
      <Title title="הזנת מדדים אישית" className="sm:py-10 py-0" />
      <MeasurementUpdate />
    </div>
  );
};

export default UpdateMesurement;
