import { base_url } from "@/api/baseUrl";
import BasicButton from "@/components/admin/components/ui/BasicButton";
import { Input } from "@/components/ui/input";
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
      <div
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl text-center"
        dir="rtl"  
       
      >
        <h1 className="sm:text-4xl text-xl font-bold text-black mb-4" dir="rtl">
        איזה כיף שאתם חלק מהקהילה שלנו
משפחת פיטל🍫
        </h1>
        <p className="text-md text-gray-600 mb-6" dir="rtl">
        אדאג לכם פה לתכנים בלעדיים כדי שהחיטוב שלכם הפעם יהיה האחרון שתעשו!
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-right" dir="rtl">
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
                  ? "border-[#7994CB] focus:ring-[#7994CB]"
                  : "border-gray-300 focus:ring-[#7994CB]"
              }`}
            />
            {errors.email && (
              <p className="text-[#7994CB] text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <BasicButton
            type="submit"
            title="שלח"
            className="w-full bg-[#7994CB] text-white py-3 rounded-md hover:bg-[#7994CB] transition-all"
          />
        </form>
      </div>
    </div>
  );
};

export default ThankYou;
