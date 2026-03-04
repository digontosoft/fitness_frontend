import { Link } from "react-router-dom";
import whiteLogo from "../../assets/image/whiteLogo.png";
import workoutCartBg from "../../assets/image/workoutList/Bg.png";
const Cart = ({ workout, training }) => {
 
  console.log('training:', training);

  return (
    <Link
      to={`/personal-workout`}
      state={{ workout, training, from: location.pathname }}
    >
      <div className="md:w-56 w-48 shadow-xl rounded-2xl p-3">
        <div
          className="w-full h-40 rounded-2xl flex justify-center items-center"
          style={{
            backgroundImage: `url(${workoutCartBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img className="w-20 h-20" src={whiteLogo} alt="" />
        </div>
        <div className="px-6 py-4">
          <p className="text-[#0A2533]  text-sm font-bold text-end">
            {training?.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Cart;

// import { Link, useLocation } from "react-router-dom";
// import whiteLogo from "../../assets/image/whiteLogo.png";
// import workoutCartBg from "../../assets/image/workoutList/Bg.png";

// const Cart = ({ workout, training }) => {
//   const location = useLocation(); // ✅ FIX

//   // 🛡 Extra safety (optional but recommended)
//   if (!workout || !training) return null;
//   console.log(workout, "workout");
//   console.log(training, "training");

//   return (
//     <Link
//       to="/personal-workout"
//       state={{
//         workout: workout ?? null,
//         training: training ?? null,
//         from: location.pathname,
//       }}
//     >
//       <div className="md:w-56 w-48 shadow-xl rounded-2xl p-3">
//         <div
//           className="w-full h-40 rounded-2xl flex justify-center items-center"
//           style={{
//             backgroundImage: `url(${workoutCartBg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <img className="w-20 h-20" src={whiteLogo} alt="Workout Logo" />
//         </div>

//         <div className="px-6 py-4">
//           <p className="text-[#0A2533] text-sm font-bold text-end">
//             {training?.name || "No Training Name"}
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default Cart;