import { useState } from "react";

import { base_url } from "@/api/baseUrl";
import { toast } from "sonner";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AddStepAverageForUser = ({ user }) => {
  const [stepCount, setStepCount] = useState("");
  const handleSubmit = async () => {
    if (!stepCount) return alert("Please enter a valid step count.");

    try {
      const payload = {
        number_of_steps: stepCount,
        user_id: user._id,
      };
      console.log("stepCount", payload);
      //    await axios
      //  .post(`${base_url}/update-user-steps-task`, payload)
      //  .then((res) => {
      //    if (res.status === 200) {
      //      toast.success(res.data.message);
      //    }
      //  });
    } catch (error) {
      console.error("Error submitting steps:", error);
      alert("Failed to submit steps.");
    }
  };

  console.log("user:", user);

  return (
    <Dialog dir="rtl">
      <DialogTrigger asChild>
        <Button className="absolute top-40 left-1 bg-customBg cursor-pointer">
          הוסף ממוצע צעדים
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none flex flex-col justify-between items-center top-[35%]">
        <div className="space-y-5 w-full">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-2xl font-bold">{user?.full_name}</h1>
          </div>

          {/* Step Input */}
          <div className="space-y-3 w-full" dir="rtl">
            <Label htmlFor="steps" className="font-semibold text-start">
              מספר הצעדים היומי
            </Label>
            <Input
              id="steps"
              type="number"
              value={stepCount}
              onChange={(e) => setStepCount(e.target.value)}
              placeholder="יש למלא מספר צעדים יומי"
            />
          </div>
        </div>

        <DialogFooter className="w-full">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-500 w-full"
          >
            עדכן מעקב
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddStepAverageForUser;
