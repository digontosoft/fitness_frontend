import { base_url } from "@/api/baseUrl";

const WorkOutListBaground = ({ bgImg }) => {
  const coverImage = bgImg?.startsWith("uploads")
    ? ` ${base_url}/${bgImg}`
    : bgImg;
  return (
    <div>
      <img
        className="w-full sm:h-[400px] object-cover object-center"
        src={coverImage}
        alt=""
      />
    </div>
  );
};

export default WorkOutListBaground;
