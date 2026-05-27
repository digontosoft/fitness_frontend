import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";



export function WelcomeModal({
  isModalOpen,
  setIsModalOpen,
  handleSubmit,
  user,
}) {
  console.log("gender:", user?.gender);
  const maleVideo = "https://www.youtube.com/embed/HHu0B6j6Jxw";
  const femaleVideo = "https://www.youtube.com/embed/iyIaCid4IHI";
  
  const videoUrl =
    user?.gender === "female" ? femaleVideo : maleVideo;
  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      onClick={() => handleSubmit()}
    >
      <DialogContent className="w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] border-none p-4">
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-center" dir="rtl">
              {user?.gender === "male"
                ? "ברוך הבא💪"
                : "ברוכה הבאה🤗"}
            </h1>
            <p
              className="text-sm sm:text-base font-normal text-center leading-5 sm:leading-6"
              dir="rtl"
            >
              {user?.gender === "male"
                ? `תצפה בסרטון פה שיסביר על הכל!
אם בטעות יצאת תרשום לווטסאפ של הליווי ונשלח לך את הסרטון מחדש ויאללה הולכים להצליח בענק ביחד!!🕺`
                : `תצפי בסרטון פה שיסביר על הכל!
אם בטעות יצאת תרשמי לווטסאפ של הליווי ונשלח לך את הסרטון מחדש ויאללה הולכים להצליח בענק ביחד!!🕺`}
            </p>
          </div>

          {/* Responsive Video */}
          <div className="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
            <iframe
              className="w-full h-full rounded-lg"
              src={videoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <button
              className="w-full bg-[#7994CB] uppercase text-white sm:h-auto h-10 text-center flex items-center justify-center"
              onClick={() => handleSubmit()}
            >
              הבנתי
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
