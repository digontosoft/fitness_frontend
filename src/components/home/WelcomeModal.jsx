import { Dialog, DialogContent } from "@/components/ui/dialog";

export function WelcomeModal({ isModalOpen, setIsModalOpen, userId }) {
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] border-none p-4">
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-center" dir="rtl">
              היי, ברוך הבא (:
            </h1>
            <p
              className="text-sm sm:text-base font-normal text-center leading-5 sm:leading-6"
              dir="rtl"
            >
              לפניך סרטון היכרות עם הממשק, קצת הסברים על איך להשתמש ומה ניתן
              לעשות. הולך להיות לנו תהליך מדהים ביחד! יאללה יוצאים לדרך תצפה
              בסרטון 😊
            </p>
          </div>

          {/* Responsive Video */}
          <div className="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
            <iframe
              className="w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/-hSma-BRzoo?si=nCUIZ0VK09ROxEQE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
