// import { base_url } from "@/api/baseUrl";
// import BasicButton from "@/components/admin/components/ui/BasicButton";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// const Thakyou = () => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       console.log("Submitted email:", data);
//       const response = await axios.post(`${base_url}/approved-mail`, data);
//       toast.success(response.data.message);
//       reset();
//     } catch (error) {
//       toast.success(error.response.data.message);
//     }
//   };
//   return (
//     <div className="h-screen w-full">
//       <div className="flex flex-col items-center justify-center space-y-5 h-full absolute inset-0">
//         <h1 className="text-6xl font-bold capitalize leading-normal text-black">
//           Thank you
//         </h1>
//         <div className="flex flex-col space-y-4">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid gap-4 py-4">
//               <div className="grid items-center gap-4">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                       message: "Enter a valid email address",
//                     },
//                   })}
//                   className={`${errors.email ? "border-red-500" : ""}`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="flex items-center">
//               <BasicButton
//                 type="submit"
//                 title="SUBMIT"
//                 className="bg-customBg"
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Thakyou;

import { base_url } from "@/api/baseUrl";
import BasicButton from "@/components/admin/components/ui/BasicButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ThankYou = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("Submitted email:", data);
      const response = await axios.post(`${base_url}/approved-mail`, data);
      toast.success(response.data.message);
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-black mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Please enter your email to receive approval confirmation.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-left">
            <Label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-4"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <BasicButton
            type="submit"
            title="Submit"
            className="w-full bg-customBg text-white py-3 rounded-md hover:bg-red-800 transition-all"
          />
        </form>
      </div>
    </div>
  );
};

export default ThankYou;
