import { base_url } from "@/api/baseUrl";
import { Ellipse92, Ellipse93, EllipseE8 } from "@/assets/index";
import FTForm from "@/components/admin/components/FTForm/FTForm";
import FInput from "@/components/admin/components/ui/FInput";
import FRadioInput from "@/components/admin/components/ui/FRadioIntput";
import FTextarea from "@/components/admin/components/ui/FTextarea";
import { Button } from "@/components/ui/button";
import { questionnaries } from "@/constants/ValidationSchema";
import { verifyToken } from "@/constants/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const trainingTimesOptions = [
  { id: "t1", value: "1", label: "1" },
  { id: "t2", value: "2", label: "2" },
  { id: "t3", value: "3", label: "3" },
  { id: "t4", value: "4", label: "4" },
];

const MeasurementWomen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { id } = verifyToken(token);
  const isMale = user?.gender === "male";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = { user_id: id, ...data };
      const response = await axios.post(`${base_url}/upsertUserDetails`, payload);

      if (response.status === 200) {
        const userType = user?.userType;

        if (userType === "admin" || userType === "supperadmin") {
          const updatedUser = { ...user, is_question_answered: true };
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          toast.success("השאלון נשלח בהצלחה!");
          navigate(
            userType === "admin" ? "/admin-dashboard" : "/dashboard",
            { replace: true }
          );
        } else {
          // Trainee: onboarding is complete, but the account goes back to
          // locked until an admin/superadmin unlocks it again.
          const updatedUser = {
            ...user,
            is_question_answered: true,
            screen: "lock",
          };
          localStorage.setItem("userInfo", JSON.stringify(updatedUser));
          toast.success("השאלון נשלח בהצלחה!");
          navigate("/lock-screen", { replace: true });
        }
      }
    } catch (err) {
      console.error("Questionnaire submit error:", err);
      toast.error("שגיאה בשליחת השאלון. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="w-14 h-14 animate-spin text-[#7994CB]" />
          <p className="mt-4 text-lg font-semibold text-[#0A2533]" dir="rtl">
            שולח את השאלון, אנא המתן...
          </p>
        </div>
      )}

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
            {isMale ? "שאלון פתיחה FITAL לגברים" : "שאלון פתיחה FITAL לנשים"}
          </h1>
          <span className="text-base font-normal text-[#0A2533]" dir="rtl">
            שאלון היכרות בשביל שאתאים אליך את התכנית האישית הטובה ביותר
          </span>
          <span className="text-base font-normal text-[#0A2533]" dir="rtl">
            שים לב שאלות המסומנות בכוכבית הן שאלות חובה.
          </span>
        </div>

        {isMale ? (
          <FTForm
            onSubmit={handleFormSubmit}
            resolver={zodResolver(questionnaries)}
          >
            {/* Section 1 — פרטים אישיים */}
            <div className="max-w-3xl mx-auto space-y-8">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                פרטים אישיים
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <FInput
                  label="שם מלא: פרטי + משפחה*"
                  placeholder="התשובה שלך"
                  name="full_name"
                  dir="rtl"
                />
                <FInput
                  type="email"
                  label="המייל שלך (מייל של גוגל)*"
                  placeholder="התשובה שלך"
                  name="email"
                  dir="rtl"
                />
                <FInput
                  label="מספר טלפון*"
                  placeholder="התשובה שלך"
                  name="cell_phone_number"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="גיל"
                  placeholder="התשובה שלך"
                  name="age"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="גובה"
                  placeholder="התשובה שלך"
                  name="height"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="משקל נוכחי - אם לא יודע לרשום בערך 5/10 קילו פלוס מינוס"
                  placeholder="התשובה שלך"
                  name="weight"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="המשקל הכי גבוה שהיית בו במהלך חייך (לא חובה לרשום)"
                  placeholder="התשובה שלך"
                  name="highest_weight"
                  dir="rtl"
                />
                <FInput
                  label="תרופות ומרשמים שאתה משתמש כרגע ובעבר? (אם לא חשוב לציין תרשום 'אין')"
                  placeholder="התשובה שלך"
                  name="daily_nutrition"
                  dir="rtl"
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
                  <FInput
                    label="במה אתה עובד כרגע ומה שעות העבודה שלך? העבודה יושבנית?"
                    placeholder="התשובה שלך"
                    name="work_and_work_hours"
                    dir="rtl"
                  />
                  <FInput
                    label="מהם המאכלים האהובים עליך?"
                    placeholder="התשובה שלך"
                    name="favorite_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="מהם המאכלים שלא תיגע בהם?"
                    placeholder="התשובה שלך"
                    name="disliked_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="צמחוני/טבעוני/רגיש למשהו (לפרט) או אוכל הכל?"
                    placeholder="התשובה שלך"
                    name="weekend_nutrition"
                    dir="rtl"
                  />
                  <FTextarea
                    label="תאר סדר יום מלא של התזונה שלך כרגע! לפרט מה אוכל: בבוקר / בצהריים / בערב / נשנושים בין לבין או בלילה לפרט"
                    placeholder="התשובה שלך"
                    name="daily_meds"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-5">
                  <FTextarea
                    label='ועכשיו סופ"ש! לפרט שישי איך נראה בוקר צהריים ערב (אם יש קידוש וכו) מתוקים של אחרי שבת בוקר צהריים ערב ונשנושים'
                    placeholder="התשובה שלך"
                    name="descripe_weekend"
                    dir="rtl"
                  />
                  <FInput
                    label="מסעדות: באיזה תדירות הולך או מזמין אוכל מבחוץ ואם יש מסעדות/דברים קבועים שאוהב להזמין?"
                    placeholder="התשובה שלך"
                    name="home_equipment"
                    dir="rtl"
                  />
                  <FTextarea
                    label="יש לך מתכונים שאתה אוהב להכין נגיד אחת לשבוע? אם כן תרשום את כל המצרכים שלהם כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות ממולאים יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
                    placeholder="התשובה שלך"
                    name="favorite_recipes"
                    dir="rtl"
                  />
                  <FInput
                    label="האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
                    placeholder="התשובה שלך"
                    name="alcohol_consumption"
                    dir="rtl"
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
                <FTextarea
                  label="מהן המטרות שלך לטווח הארוך ולמה?"
                  placeholder="התשובה שלך"
                  name="long_term_goals"
                  dir="rtl"
                />
                <FTextarea
                  label="כאשר אתה מסתכל במראה מה אתה מרגיש?"
                  placeholder="התשובה שלך"
                  name="feel_about_your_look"
                  dir="rtl"
                />
                <FTextarea
                  label="דברים שתרצה להוסיף? (מאמין בך ובנו מלך)"
                  placeholder="התשובה שלך"
                  name="additional_notes"
                  dir="rtl"
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
                  <FRadioInput
                    label="כמה פעמים היית מעדיף להתאמן בשבוע? תבחר מספר 1 עד 4"
                    name="how_many_times_want_training_in_week"
                    options={trainingTimesOptions}
                    dir="rtl"
                    type="radio"
                  />
                  <FRadioInput
                    label="איפה אתה מעדיף להתאמן בחדר כושר או בבית?"
                    name="preferred_training_location"
                    options={[
                      { id: "r2", value: "gym", label: "בחדר הכושר" },
                      { id: "r3", value: "home", label: "בבית" },
                    ]}
                    dir="rtl"
                    type="radio"
                  />
                  <FInput
                    label="האם יש לך פציעות או מגבלות פיזיות?"
                    placeholder="התשובה שלך"
                    name="injuries_description"
                    dir="rtl"
                  />
                  <FTextarea
                    label="תאר את אימוני הכח שלך כרגע (איזה תרגילים עושה אם יש תכנית מסודרת ואם כן מהי) אם לא עושה לרשום 'לא עושה'"
                    placeholder="התשובה שלך"
                    name="strength_training_description"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="מהם התרגילים האהובים עליך? במידה ולא יודע לרשום 'לא יודע'"
                    placeholder="התשובה שלך"
                    name="favorite_exercises"
                    dir="rtl"
                  />
                  <FInput
                    label="איזה אזורים אתה מעדיף שיקבלו יותר דגש בתכנית האימונים האישית שלך? ישבן, ידיים, יריכיים, גב, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עליך."
                    placeholder="התשובה שלך"
                    name="focused_body_areas"
                    dir="rtl"
                  />
                  <FInput
                    label="מה האימון אירובי האהוב עליך? (יכול להיות גם הליכות ויכול לרשום גם כלום)"
                    placeholder="התשובה שלך"
                    name="favorite_cardio"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center my-10">
              <Button
                type="submit"
                className="w-56 h-14 p-4 text-base font-bold text-slate-200 bg-black rounded-full"
                dir="rtl"
              >
                שליחת הטופס
              </Button>
            </div>
          </FTForm>
        ) : (
          <FTForm
            onSubmit={handleFormSubmit}
            resolver={zodResolver(questionnaries)}
          >
            {/* Section 1 — פרטים אישיים */}
            <div className="max-w-3xl mx-auto space-y-8">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                פרטים אישיים
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <FInput
                  label="שם מלא: פרטי + משפחה*"
                  placeholder="התשובה שלך"
                  name="full_name"
                  dir="rtl"
                />
                <FInput
                  type="email"
                  label="המייל שלך (מייל של גוגל)*"
                  placeholder="התשובה שלך"
                  name="email"
                  dir="rtl"
                />
                <FInput
                  label="מספר טלפון*"
                  placeholder="התשובה שלך"
                  name="cell_phone_number"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="גיל"
                  placeholder="התשובה שלך"
                  name="age"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="גובה"
                  placeholder="התשובה שלך"
                  name="height"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="משקל נוכחי - אם לא יודעת לרשום בערך 5/10 קילו פלוס מינוס"
                  placeholder="התשובה שלך"
                  name="weight"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  min={0}
                  label="המשקל הכי גבוה שהיית בו במהלך חייך (לא חובה לרשום)"
                  placeholder="התשובה שלך"
                  name="highest_weight"
                  dir="rtl"
                />
                <FInput
                  label="תרופות ומרשמים שאת משתמשת כרגע ובעבר? (אם לא חשוב לציין תרשמי 'אין')"
                  placeholder="התשובה שלך"
                  name="daily_nutrition"
                  dir="rtl"
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
                  <FInput
                    label="במה את עובדת כרגע ומה שעות העבודה שלך? העבודה יושבנית?"
                    placeholder="התשובה שלך"
                    name="work_and_work_hours"
                    dir="rtl"
                  />
                  <FInput
                    label="מהם המאכלים האהובים עליך?"
                    placeholder="התשובה שלך"
                    name="favorite_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="מהם המאכלים שלא תיגעי בהם?"
                    placeholder="התשובה שלך"
                    name="disliked_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="צמחונית/טבעונית/רגישה למשהו (לפרט) או אוכלת הכל?"
                    placeholder="התשובה שלך"
                    name="weekend_nutrition"
                    dir="rtl"
                  />
                  <FTextarea
                    label="תארי סדר יום מלא של התזונה שלך כרגע! לפרט מה אוכלת: בבוקר / בצהריים / בערב / נשנושים בין לבין או בלילה לפרט"
                    placeholder="התשובה שלך"
                    name="daily_meds"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-5">
                  <FTextarea
                    label='ועכשיו סופ"ש! לפרט שישי איך נראה בוקר צהריים ערב (אם יש קידוש וכו) מתוקים של אחרי שבת בוקר צהריים ערב ונשנושים'
                    placeholder="התשובה שלך"
                    name="descripe_weekend"
                    dir="rtl"
                  />
                  <FInput
                    label="מסעדות: באיזה תדירות הולכת או מזמינה אוכל מבחוץ ואם יש מסעדות/דברים קבועים שאוהבת להזמין?"
                    placeholder="התשובה שלך"
                    name="home_equipment"
                    dir="rtl"
                  />
                  <FTextarea
                    label="יש לך מתכונים שאת אוהבת להכין נגיד אחת לשבוע? אם כן תרשמי את כל המצרכים שלהם כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות ממולאים יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
                    placeholder="התשובה שלך"
                    name="favorite_recipes"
                    dir="rtl"
                  />
                  <FInput
                    label="האם את שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
                    placeholder="התשובה שלך"
                    name="alcohol_consumption"
                    dir="rtl"
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
                <FTextarea
                  label="מהן המטרות שלך לטווח הארוך ולמה?"
                  placeholder="התשובה שלך"
                  name="long_term_goals"
                  dir="rtl"
                />
                <FTextarea
                  label="כאשר את מסתכלת במראה מה את מרגישה?"
                  placeholder="התשובה שלך"
                  name="feel_about_your_look"
                  dir="rtl"
                />
                <FTextarea
                  label="דברים שתרצי להוסיף? (מאמין בך ובנו מלכה)"
                  placeholder="התשובה שלך"
                  name="additional_notes"
                  dir="rtl"
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
                  אם נרשמת רק לתזונה תדלגי ותעשי שלח טופס
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <div className="space-y-5">
                  <FRadioInput
                    label="כמה פעמים היית מעדיפה להתאמן בשבוע? תבחרי מספר 1 עד 4"
                    name="how_many_times_want_training_in_week"
                    options={trainingTimesOptions}
                    dir="rtl"
                    type="radio"
                  />
                  <FRadioInput
                    label="איפה את מעדיפה להתאמן בחדר כושר או בבית?"
                    name="preferred_training_location"
                    options={[
                      { id: "r2", value: "gym", label: "בחדר הכושר" },
                      { id: "r3", value: "home", label: "בבית" },
                    ]}
                    dir="rtl"
                    type="radio"
                  />
                  <FInput
                    label="האם יש לך פציעות או מגבלות פיזיות?"
                    placeholder="התשובה שלך"
                    name="injuries_description"
                    dir="rtl"
                  />
                  <FTextarea
                    label="תארי את אימוני הכח שלך כרגע (איזה תרגילים עושה אם יש תכנית מסודרת ואם כן מהי) אם לא עושה לרשום 'לא עושה'"
                    placeholder="התשובה שלך"
                    name="strength_training_description"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="מהם התרגילים האהובים עליך? במידה ולא יודעת לרשום 'לא יודעת'"
                    placeholder="התשובה שלך"
                    name="favorite_exercises"
                    dir="rtl"
                  />
                  <FInput
                    label="איזה אזורים את מעדיפה שיקבלו יותר דגש בתכנית האימונים האישית שלך? ישבן, ידיים, יריכיים, גב, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עלייך."
                    placeholder="התשובה שלך"
                    name="focused_body_areas"
                    dir="rtl"
                  />
                  <FInput
                    label="מה האימון אירובי האהוב עליך? (יכול להיות גם הליכות ויכולה לרשום גם כלום)"
                    placeholder="התשובה שלך"
                    name="favorite_cardio"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center my-10">
              <Button
                type="submit"
                className="w-56 h-14 p-4 text-base font-bold text-slate-200 bg-black rounded-full"
                dir="rtl"
              >
                שליחת הטופס
              </Button>
            </div>
          </FTForm>
        )}
      </div>
    </>
  );
};

export default MeasurementWomen;
