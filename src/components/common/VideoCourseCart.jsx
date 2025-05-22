// import { FaArrowLeftLong } from "react-icons/fa6";
// import { Button } from "../ui/button";
// import ReactPlayer from "react-player";

// const VideoCourseCart = ({ exercise }) => {
//   return (
//     <div className="w-full md:w-96 flex gap-2 items-center justify-between px-2 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300">
//       <Button className="rounded-2xl">
//         <FaArrowLeftLong />
//       </Button>
//       <div className="w-full flex  items-center justify-center">
//         <h1 className="text-sm font-bold text-[#0A2533]">
//           {" "}
//           {exercise?.exercise_id?.name}
//         </h1>
//       </div>
//       <div className="w-full max-w-xs mx-auto">
//         <ReactPlayer
//           url={exercise?.exercise_id?.video_url}
//           width="100%"
//           height="80px"
//           controls
//           className="rounded-lg border border-gray-200 shadow-sm"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoCourseCart;

import { FaArrowLeftLong } from "react-icons/fa6";
import { Button } from "../ui/button";
import ReactPlayer from "react-player";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"; // Adjust path if needed

const VideoCourseCart = ({ exercise }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer md:w-96 flex gap-2 items-center justify-between px-2 py-2 bg-[#FBFBFB] rounded-2xl shadow-md shadow-gray-300">
          <Button className="rounded-2xl">
            <FaArrowLeftLong />
          </Button>
          <div className="w-full flex items-center justify-center">
            <h1 className="text-sm font-bold text-[#0A2533]">
              {exercise?.exercise_id?.name}
            </h1>
          </div>
          <div className="w-full max-w-xs mx-auto">
            <ReactPlayer
              url={exercise?.exercise_id?.video_url}
              width="100%"
              height="80px"
              controls
              className="rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {exercise?.exercise_id?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <ReactPlayer
            url={exercise?.exercise_id?.video_url}
            width="100%"
            height="360px"
            controls
            className="rounded-lg border border-gray-200 shadow-sm"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="default" className="bg-customBg">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCourseCart;
