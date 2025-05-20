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
          <div className="text-left" dir="rtl">
            <Label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-4"
              dir="rtl"
            >
              כתובת דואר להתחברות
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="דואר אלקטרוני"
              dir="rtl"
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
            title="שלח"
            className="w-full bg-customBg text-white py-3 rounded-md hover:bg-red-800 transition-all"
          />
        </form>
      </div>
    </div>
  );
};

export default ThankYou;
