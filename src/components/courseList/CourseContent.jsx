const CourseContent = ({ description, compact = false }) => {
  if (!description) return null;

  return (
    <div dir="rtl" className={`w-full ${compact ? "py-0" : "sm:py-10 py-4"}`}>
      <div className="flex flex-col justify-start items-start text-[#0A2533]">
        <h3
          className={`font-bold text-start ${compact ? "text-base" : "text-xl"}`}
        >
          איך לבצע
        </h3>
        <p
          className={`font-normal text-[#4A5568] ${
            compact ? "text-sm leading-relaxed pt-1.5" : "text-sm pt-2"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default CourseContent;
