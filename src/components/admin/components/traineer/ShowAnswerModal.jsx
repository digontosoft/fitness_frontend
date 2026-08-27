import { base_url } from "@/api/baseUrl";
import { Ellipse92, Ellipse93, EllipseE8 } from "@/assets";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnswerRow({ label, value }) {
  return (
    <div dir="rtl" className="space-y-1 text-right">
      <div className="font-bold text-[#0A2533]">{label}</div>
      <div className="text-[#0A2533] whitespace-pre-wrap">{value || "N/A"}</div>
    </div>
  );
}

const locationLabel = {
  gym: "בחדר הכושר",
  home: "בבית",
};

function ShowAnswerModal() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { Id } = useParams();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/userDetails/${Id}`);
        setUserInfo(response.data.data || {});
      } catch (error) {
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [Id]);

  const trainingLocation =
    locationLabel[userInfo.preferred_training_location] ||
    userInfo.preferred_training_location;

  return (
    <>
      <div className="py-12 relative overflow-hidden sm:px-0 px-4">
        <div
          className="absolute top-24 inset-[24%] w-full h-full"
          style={{
            backgroundImage: `url(${Ellipse93})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="absolute top-48 inset-[30%] w-full h-full"
          style={{
            backgroundImage: `url(${Ellipse92})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="absolute top-40 inset-[89%] w-full h-full"
          style={{
            backgroundImage: `url(${EllipseE8})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="grid items-center justify-items-center max-w-3xl mx-auto text-center space-y-2 mb-16">
          <h1 className="text-[28px] font-bold text-[#0A2533]" dir="rtl">
            שאלון פתיחה FITAL לגברים
          </h1>
          <span className="text-base font-normal text-[#0A2533]" dir="rtl">
            שאלון היכרות בשביל שאתאים אליך את התכנית האישית הטובה ביותר
          </span>
        </div>

        {/* Section 1 — פרטים אישיים */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h1
            className="text-right text-[28px] font-bold text-[#0A2533]"
            dir="rtl"
          >
            פרטים אישיים
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
            <AnswerRow
              label="שם מלא: פרטי + משפחה*"
              value={userInfo.full_name}
            />
            <AnswerRow
              label="המייל שלך (מייל של גוגל)*"
              value={userInfo.email}
            />
            <AnswerRow
              label="מספר טלפון*"
              value={userInfo.cell_phone_number}
            />
            <AnswerRow label="גיל" value={userInfo.age} />
            <AnswerRow label="גובה" value={userInfo.height} />
            <AnswerRow
              label="משקל נוכחי - אם לא יודע לרשום בערך 5/10 קילו פלוס מינוס"
              value={userInfo.weight}
            />
            <AnswerRow
              label="המשקל הכי גבוה שהיית בו במהלך חייך (לא חובה לרשום)"
              value={userInfo.highest_weight}
            />
            <AnswerRow
              label="תרופות ומרשמים שאתה משתמש כרגע ובעבר? (אם לא חשוב לציין תרשום 'אין')"
              value={userInfo.daily_nutrition}
            />
          </div>
        </div>

        <hr className="max-w-3xl mx-auto my-10" />

        {/* Section 2 — תזונה ואורח חיים */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h1
            className="text-right text-[28px] font-bold text-[#0A2533]"
            dir="rtl"
          >
            תזונה ואורח חיים
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
            <div className="space-y-5">
              <AnswerRow
                label="במה אתה עובד כרגע ומה שעות העבודה שלך? העבודה יושבנית?"
                value={userInfo.work_and_work_hours}
              />
              <AnswerRow
                label="מהם המאכלים האהובים עליך?"
                value={userInfo.favorite_foods}
              />
              <AnswerRow
                label="מהם המאכלים שלא תיגע בהם?"
                value={userInfo.disliked_foods}
              />
              <AnswerRow
                label="צמחוני/טבעוני/רגיש למשהו (לפרט) או אוכל הכל?"
                value={userInfo.weekend_nutrition}
              />
              <AnswerRow
                label="תאר סדר יום מלא של התזונה שלך כרגע! לפרט מה אוכל: בבוקר / בצהריים / בערב / נשנושים בין לבין או בלילה לפרט"
                value={userInfo.daily_meds}
              />
            </div>
            <div className="space-y-5">
              <AnswerRow
                label='ועכשיו סופ"ש! לפרט שישי איך נראה בוקר צהריים ערב (אם יש קידוש וכו) מתוקים של אחרי שבת בוקר צהריים ערב ונשנושים'
                value={userInfo.descripe_weekend}
              />
              <AnswerRow
                label="מסעדות: באיזה תדירות הולך או מזמין אוכל מבחוץ ואם יש מסעדות/דברים קבועים שאוהב להזמין?"
                value={userInfo.home_equipment}
              />
              <AnswerRow
                label="יש לך מתכונים שאתה אוהב להכין נגיד אחת לשבוע? אם כן תרשום את כל המצרכים שלהם כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות ממולאים יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
                value={userInfo.favorite_recipes}
              />
              <AnswerRow
                label="האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
                value={userInfo.alcohol_consumption}
              />
            </div>
          </div>
        </div>

        <hr className="max-w-3xl mx-auto my-10" />

        {/* Section 3 — מטרות ומיינדסט */}
        <div className="max-w-3xl mx-auto space-y-8">
          <h1
            className="text-right text-[28px] font-bold text-[#0A2533]"
            dir="rtl"
          >
            מטרות ומיינדסט
          </h1>
          <div className="grid grid-cols-1 gap-5" dir="rtl">
            <AnswerRow
              label="מהן המטרות שלך לטווח הארוך ולמה?"
              value={userInfo.long_term_goals}
            />
            <AnswerRow
              label="כאשר אתה מסתכל במראה מה אתה מרגיש?"
              value={userInfo.feel_about_your_look}
            />
            <AnswerRow
              label="דברים שתרצה להוסיף? (מאמין בך ובנו מלך)"
              value={userInfo.additional_notes}
            />
          </div>
        </div>

        <hr className="max-w-3xl mx-auto my-10" />

        {/* Section 4 — אימונים ופעילות גופנית */}
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1
              className="text-right text-[28px] font-bold text-[#0A2533]"
              dir="rtl"
            >
              אימונים ופעילות גופנית
            </h1>
            <h1
              className="text-right text-base font-normal text-[#0A2533]"
              dir="rtl"
            >
              אם נרשמת רק לתזונה תדלג ותעשה שלח טופס
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
            <div className="space-y-5">
              <AnswerRow
                label="כמה פעמים היית מעדיף להתאמן בשבוע? תבחר מספר 1 עד 4"
                value={userInfo.how_many_times_want_training_in_week}
              />
              <AnswerRow
                label="איפה אתה מעדיף להתאמן בחדר כושר או בבית?"
                value={trainingLocation}
              />
              <AnswerRow
                label="האם יש לך פציעות או מגבלות פיזיות?"
                value={userInfo.injuries_description}
              />
              <AnswerRow
                label="תאר את אימוני הכח שלך כרגע (איזה תרגילים עושה אם יש תכנית מסודרת ואם כן מהי) אם לא עושה לרשום 'לא עושה'"
                value={userInfo.strength_training_description}
              />
            </div>
            <div className="space-y-5">
              <AnswerRow
                label="מהם התרגילים האהובים עליך? במידה ולא יודע לרשום 'לא יודע'"
                value={userInfo.favorite_exercises}
              />
              <AnswerRow
                label="איזה אזורים אתה מעדיף שיקבלו יותר דגש בתכנית האימונים האישית שלך? ישבן, ידיים, יריכיים, גב, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עליך."
                value={userInfo.focused_body_areas}
              />
              <AnswerRow
                label="מה האימון אירובי האהוב עליך? (יכול להיות גם הליכות ויכול לרשום גם כלום)"
                value={userInfo.favorite_cardio}
              />
            </div>
          </div>
        </div>

        {loading && (
          <p className="text-center mt-6 text-[#0A2533]" dir="rtl">
            טוען...
          </p>
        )}
      </div>
    </>
  );
}

export default ShowAnswerModal;
