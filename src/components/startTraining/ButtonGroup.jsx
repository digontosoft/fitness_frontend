import { Button } from "../ui/button";

const ButtonGroup = ({
  onNext,
  onPrevious,
  showPrevious,
  isFinished,
  disabled,
}) => {
  return (
    <div dir="rtl">
      <div className="flex gap-2 flex-row-reverse md:gap-6 sm:mt-20 justify-center items-center">
        <Button
          onClick={onNext}
          disabled={disabled}
          className="bg-gradient-to-tr from-red-800 to-red-600 uppercase text-white font-bold text-xs px-8 md:px-10 rounded-full"
        >
          {isFinished ? "Finish" : "הַבָּא"}
        </Button>
        {showPrevious && (
          <Button
            onClick={onPrevious}
            //disabled={disabled}
            className={`bg-[#15151573] uppercase text-white font-bold text-xs px-6 md:px-8 rounded-full`}
          >
            קוֹדֵם
          </Button>
        )}
      </div>
    </div>
  );
};

export default ButtonGroup;
