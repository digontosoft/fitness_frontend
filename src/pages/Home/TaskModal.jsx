import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function TaskModal({ isModalOpen, setIsModalOpen, selectedTask }) {
  const [stepCount, setStepCount] = useState("");

  const handleSubmit = async () => {
    if (!stepCount) return alert("Please enter a valid step count.");

    try {
      await axios.post("/api/submit-steps", {
        taskId: selectedTask?._id || "no-task",
        steps: stepCount,
      });

      alert("Steps submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting steps:", error);
      alert("Failed to submit steps.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[739px] sm:h-[546px] border-none flex flex-col justify-between items-center">
        <div className="space-y-5 w-full">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-2xl font-bold">
              {selectedTask ? "Edit Task" : "Create New Task"}
            </h1>
            <p className="text-sm text-center leading-5">
              {selectedTask
                ? `Update details for task: ${selectedTask?.name || "Unknown"}`
                : "No task assigned. Create a new task!"}
            </p>
          </div>

          {/* Step Input */}
          <div className="space-y-3 w-full ">
            <Label htmlFor="steps" className="font-semibold text-start">
              Enter Total Steps
            </Label>
            <Input
              id="steps"
              type="number"
              value={stepCount}
              onChange={(e) => setStepCount(e.target.value)}
              placeholder="Enter your total steps"
            />
          </div>
        </div>

        <DialogFooter className="w-full">
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-500 w-full"
          >
            {selectedTask ? "Update Task" : "Create Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
