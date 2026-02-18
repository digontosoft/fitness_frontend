import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function TaskModal({
  isModalOpen,
  setIsModalOpen,
  selectedTask,
  user_id,
  fetchUserSteps,
}) {
  const [stepCount, setStepCount] = useState("");

  const handleSubmit = async () => {
    if (!stepCount) return alert("Please enter a valid step count.");

    try {
      const payload = {
        number_of_steps: stepCount,
        task_id: selectedTask?._id,
        user_id,
      };
      await axios
        .post(`${base_url}/update-user-steps-task`, payload)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            fetchUserSteps();
            setIsModalOpen(false);
          }
        });
    } catch (error) {
      console.error("Error submitting steps:", error);
      alert("Failed to submit steps.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} dir="rtl">
      <DialogContent className="border-none flex flex-col justify-between items-center top-[35%]">
        <div className="space-y-5 w-full">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-2xl font-bold">{selectedTask?.task_name}</h1>
            <p className="text-sm text-center leading-5">
              {selectedTask?.task_description}
            </p>
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
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-[#7994CB] w-full"
          >
            {selectedTask ? "עדכן מעקב" : "Create Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
