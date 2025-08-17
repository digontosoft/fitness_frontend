// import { base_url } from "@/api/baseUrl";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import BasicButton from "../ui/BasicButton";

// export default function AddMail({ setEmails }) {
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
//       setEmails();
//     } catch (error) {
//       toast.success(error.response.data.message);
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button className="bg-customBg">הוסף כתובת מייל</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-center">הוסף כתובת מייל</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="grid gap-4 py-4">
//             <div className="grid items-center gap-4">
//               <Label htmlFor="email" dir="rtl">
//                 דואר אלקטרוני
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
//                     message: "Enter a valid email address",
//                   },
//                 })}
//                 className={`${errors.email ? "border-red-500" : ""}`}
//                 dir="rtl"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//               <Label htmlFor="expiry_date" dir="rtl">
//                 תאריך סיום
//               </Label>
//               <div dir="rtl">
//                 <input
//                   id="expiry_date"
//                   type="date"
//                   {...register("expiry_date", {
//                     required: "Expiry Date is required",
//                   })}
//                   className={`w-full border border-gray-300 rounded-lg p-3 text-right ${
//                     errors.expiry_date ? "border-red-500" : ""
//                   }`}
//                 />
//               </div>
//               {errors.expiry_date && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.expiry_date.message}
//                 </p>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-end">
//             <BasicButton type="submit" title="הוסף" className="bg-customBg" />
//           </div>
//         </form>
//         <DialogFooter></DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }


import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import BasicButton from "../ui/BasicButton";

export default function AddMail({ setEmails }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log("Submitted email:", data);
      const response = await axios.post(`${base_url}/approved-mail`, data);
      toast.success(response.data.message);
      reset();
      setEmails();
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-customBg">הוסף כתובת מייל</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">הוסף כתובת מייל</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              {/* Email */}
              <Label htmlFor="email" dir="rtl">
                דואר אלקטרוני
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`${errors.email ? "border-red-500" : ""}`}
                dir="rtl"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

              {/* Role */}
              <Label htmlFor="role" dir="rtl">
                תפקיד
              </Label>
              <Controller
                name="role"
                control={control}
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className={`w-full ${errors.role ? "border-red-500" : ""}`}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent >
                     
                     {
                      user?.role === "admin" ?
                      <>
                        <SelectItem value="trainee" className="hover:bg-gray-50">Trainee</SelectItem>
                      <SelectItem value="recipe" className="hover:bg-gray-50">Recipe</SelectItem></>
                      :
                      <>
                       <SelectItem value="trainee" className="hover:bg-gray-50">Trainee</SelectItem>
                       <SelectItem value="recipe" className="hover:bg-gray-50">Recipe</SelectItem>
                       <SelectItem value="admin" className="hover:bg-gray-50">Admin</SelectItem>
                      <SelectItem value="supperadmin" className="hover:bg-gray-50">Supperadmin</SelectItem>
                      </> 
                     }
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}

              {/* Expiry Date */}
              <Label htmlFor="expiry_date" dir="rtl">
                תאריך סיום
              </Label>
              <div dir="rtl">
                <input
                  id="expiry_date"
                  type="date"
                  {...register("expiry_date", {
                    required: "Expiry Date is required",
                  })}
                  className={`w-full border border-gray-300 rounded-lg p-3 text-right ${
                    errors.expiry_date ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.expiry_date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.expiry_date.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end">
             <BasicButton
              type="submit"
              title={loading ? "שולח..." : "הוסף"}
              className="bg-customBg"
              disabled={loading}
            />
          </div>
        </form>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
