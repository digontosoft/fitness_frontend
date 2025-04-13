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
import BasicButton from "../ui/BasicButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { base_url } from "@/api/baseUrl";

export default function AddMail({ setEmails }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log("Submitted email:", data);
      const response = await axios.post(`${base_url}/approved-mail`, data);
      toast.success(response.data.message);
      reset();
      setEmails();
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  return (
    <Dialog>
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
            <BasicButton type="submit" title="הוסף" className="bg-customBg" />
          </div>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
