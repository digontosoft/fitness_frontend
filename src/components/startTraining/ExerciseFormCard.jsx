import CourseContent from "@/components/courseList/CourseContent";
import ExcersizeInput from "@/components/startTraining/ExcersizeInput";
import HeroVideo from "@/components/startTraining/HeroVideo";
import LastExercise from "@/components/startTraining/LastExercise";
import { isSupersetManipulation } from "@/utils/taskCompletionValidation";
import { Check, ChevronDown } from "lucide-react";
import { memo, useEffect, useState } from "react";

function ExerciseFormCard({
  exercise,
  slotIndex,
  value,
  lastWorkoutEntry,
  onChange,
  showError,
  isPairedSupersetChild,
  isComplete = false,
}) {
  const name = exercise?.exercise_id?.name || exercise?.name || "";
  const videoUrl = exercise?.exercise_id?.video_url || exercise?.video_url;
  const description =
    exercise?.exercise_id?.description || exercise?.description;
  const isSuperset = isSupersetManipulation(exercise?.manipulation);
  const notes = exercise?.manipulation || "";

  // Default: exercise + video both minimized
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  // Collapse video when exercise collapses; pause playback
  useEffect(() => {
    if (!exerciseOpen) setMediaOpen(false);
  }, [exerciseOpen]);

  // Auto-expand when validation highlights this card
  useEffect(() => {
    if (showError) setExerciseOpen(true);
  }, [showError]);

  const toggleExercise = () => {
    setExerciseOpen((prev) => !prev);
  };

  return (
    <section
      className={`w-full rounded-2xl border bg-white overflow-hidden ${
        showError ? "border-red-400" : "border-gray-200"
      }`}
      dir="rtl"
    >
      {/* Exercise header — minimize/expand */}
      <button
        type="button"
        onClick={toggleExercise}
        className="w-full flex items-center gap-3 p-3 sm:p-4 text-right hover:bg-[#F7F9FC] transition-colors"
        aria-expanded={exerciseOpen}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            isComplete
              ? "bg-[#7994CB] text-white"
              : showError
                ? "bg-red-100 text-red-600"
                : "bg-[#E8EEF8] text-[#0A2533]"
          }`}
        >
          {isComplete ? <Check className="h-4 w-4" /> : slotIndex + 1}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base sm:text-xl font-bold text-[#0A2533] truncate">
              {name}
            </h2>
            {isSuperset && (
              <span className="text-[10px] font-bold text-white bg-[#7994CB] px-2 py-0.5 rounded-full">
                סופרסט
              </span>
            )}
            {isPairedSupersetChild && (
              <span className="text-[10px] font-bold text-[#7994CB] border border-[#7994CB] px-2 py-0.5 rounded-full">
                חלק מסופרסט
              </span>
            )}
          </div>
          {!exerciseOpen && (
            <p className="text-xs text-[#7F7F7F] mt-0.5">
              יעד: {exercise?.reps || 0} חזרות
              {isComplete
                ? ` · בוצע: ${value?.last_set_weight || 0} / ${value?.reps_done || 0}`
                : ""}
            </p>
          )}
        </div>

        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#7994CB] transition-transform duration-300 ease-in-out ${
            exerciseOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Exercise body */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          exerciseOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3 sm:px-4 pb-4 pt-1 space-y-4 border-t border-gray-100">
            {/* Video toggle — nested, default closed */}
            <button
              type="button"
              onClick={() => setMediaOpen((prev) => !prev)}
              className="w-full flex items-center justify-between gap-2 rounded-xl border border-[#D5DEF0] bg-[#F7F9FC] px-3 py-2.5 text-sm font-semibold text-[#7994CB] transition-colors hover:bg-[#E8EEF8]"
              aria-expanded={mediaOpen}
            >
              <span>
                {mediaOpen ? "הסתר וידאו והוראות" : "הצג וידאו והוראות"}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out ${
                  mediaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                mediaOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden transition-opacity duration-300 ${
                  mediaOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="space-y-3 pb-1" dir="rtl">
                  {/* Play when section is open */}
                  <HeroVideo
                    videoUrl={videoUrl}
                    className="mt-0"
                    compact
                    playing={mediaOpen}
                    muted
                  />
                  {description ? (
                    <CourseContent description={description} compact />
                  ) : null}
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start"
              dir="ltr"
            >
              {/* On desktop keep form full width when video collapsed */}
              <div className="space-y-4 min-w-0 lg:col-span-2" dir="rtl">
                <LastExercise
                  exerciseData={{ [String(slotIndex)]: lastWorkoutEntry }}
                  slotIndex={slotIndex}
                  compact
                  notes={notes}
                />
                <ExcersizeInput
                  exerciseData={exercise}
                  value={value}
                  onChange={(next) => onChange(slotIndex, next)}
                  scrollOnMount={false}
                  compact
                />
                {showError && (
                  <p className="text-sm text-red-500 font-medium">
                    יש למלא חזרות ומשקל
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ExerciseFormCard);
