import { base_url } from "@/api/baseUrl";

const WorkOutListBaground = ({ bgImg }) => {
  const coverImage = bgImg?.startsWith("uploads")
    ? ` ${base_url}/${bgImg}`
    : bgImg;
  return (
    <div className="w-full overflow-hidden">
      <img
        className="w-full h-auto sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover object-center"
        src={coverImage}
        alt=""
      />
    </div>
  );
};

export default WorkOutListBaground;
