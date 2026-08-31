import HeroVideo from "@/components/startTraining/HeroVideo";

// Placeholder — replace with real tutorial links / copy later
const PLACEHOLDER_VIDEO =
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

const tutorialVideos = [
  {
    id: 1,
    url: PLACEHOLDER_VIDEO,
    subtitle: "איך מתחילים לעבוד עם המערכת",
    description:
      "בסרטון זה תלמדו כיצד להתחבר לחשבון, לנווט בתפריט הראשי ולהתחיל את האימון הראשון שלכם בצורה פשוטה וברורה.",
  },
  {
    id: 2,
    url: PLACEHOLDER_VIDEO,
    subtitle: "מילוי מדדים ומעקב התקדמות",
    description:
      "כאן נסביר איך למלא את המדדים האישיים, לעקוב אחרי ההתקדמות לאורך זמן ולהשתמש בכלים שיעזרו לכם להגיע למטרות.",
  },
];

const Tutorial = () => {
  return (
    <div className="w-full min-h-[70vh] bg-[#E8EEF8] py-8 sm:py-12 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-white/60 shadow-sm p-4 sm:p-8 md:p-10">
        <div className="text-center mb-8 sm:mb-10" dir="rtl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A2533]">
            וידאו הדרכה
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#7F7F7F]">
            צפו בסרטוני ההדרכה למטה
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {tutorialVideos.map((video) => (
            <article
              key={video.id}
              className="flex flex-col rounded-2xl border border-gray-200 overflow-hidden bg-[#F7F9FC] p-3 sm:p-4 h-full"
              dir="rtl"
            >
              <HeroVideo videoUrl={video.url} className="mt-0" compact />

              <div className="mt-4 space-y-2 text-right flex-1">
                <h2 className="text-base sm:text-lg font-bold text-[#0A2533] leading-snug">
                  {video.subtitle}
                </h2>
                <p className="text-sm sm:text-[15px] text-[#7F7F7F] leading-relaxed">
                  {video.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
