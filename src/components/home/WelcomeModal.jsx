import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function WelcomeModal({ isModalOpen, setIsModalOpen }) {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[739px] h-[546px] rounded-full border-none">
        <div className="space-y-5">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="text-2xl font-bold" dir="rtl">
              היי, ברוך הבא (:
            </h1>
            <p className="text-sm font-normal text-center leading-5" dir="rtl">
              לפניך סרטון היכרות עם הממשק, קצת הסברים על איך להשתמש ומה ניתן
              לעשות. הולך להיות לנו תהליך מדהים ביחד! יאללה יוצאים לדרך תצפה
              בסרטון 😊
            </p>
          </div>
          <iframe
            className="w-full h-[380px] rounded-2xl"
            src="https://www.youtube.com/embed/-hSma-BRzoo?si=nCUIZ0VK09ROxEQE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
