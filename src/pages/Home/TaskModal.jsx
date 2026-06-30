import { base_url } from "@/api/baseUrl";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { UI_TEXT } from "@/constants/hebrewText";
import { toast } from "sonner";

export function TaskModal({
  isModalOpen,
  setIsModalOpen,
  selectedTask,
  user_id,
  fetchUserSteps,
  fetchUserTasks,
}) {
  const [stepCount, setStepCount] = useState("");

  useEffect(() => {
    if (!isModalOpen) setStepCount("");
  }, [isModalOpen]);

  const handleSubmit = async () => {
    if (!stepCount) return alert(UI_TEXT.validStepCount);

    try {
      const payload = {
        number_of_steps: stepCount,
        task_id: selectedTask?._id,
        user_id,
      };
      const res = await axios.post(
        `${base_url}/update-user-steps-task`,
        payload
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        await Promise.all([fetchUserSteps(), fetchUserTasks()]);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting steps:", error);
      alert(UI_TEXT.submitStepsFailed);
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
            ממוצע הצעדים השבועי
            </Label>
            <Input
              id="steps"
              type="number"
              min={0}
              value={stepCount}
              onChange={(e) => setStepCount(e.target.value)}
              placeholder="נא למלא ממוצע צעדים שבועי"
            />
          </div>
        </div>

        <DialogFooter className="w-full">
          <Button
            onClick={handleSubmit}
            className="bg-[#7994CB] hover:bg-[#7994CB] w-full"
          >
            {selectedTask ? "עדכן מעקב" : UI_TEXT.createTask}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
