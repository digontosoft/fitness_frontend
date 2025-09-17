import { base_url } from "@/api/baseUrl";
import { Ellipse92, Ellipse93, EllipseE8 } from "@/assets/index";
import FTForm from "@/components/admin/components/FTForm/FTForm";
import FInput from "@/components/admin/components/ui/FInput";
import FRadioInput from "@/components/admin/components/ui/FRadioIntput";
import Loading from "@/components/common/Loading";
import { Button } from "@/components/ui/button";
import { questionnaries } from "@/constants/ValidationSchema";
import { verifyToken } from "@/constants/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const MeasurementWomen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log("gender", user?.gender);
  const { id } = verifyToken(token);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleFormSubmit = (data) => {
    console.log("data:", data);
    setLoading(true);
    const questionnaries = {
      user_id: id,
      ...data,
    };
    try {
      axios
        .post(`${base_url}/upsertUserDetails`, questionnaries)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Questionaries Upload successfully!!!");
            navigate("/");
          }
        });
      console.log("questionnaries", questionnaries);
    } catch (err) {
      toast.error(err);
      console.log("quesntionariesError:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }
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
            שאלון פתיחה
          </h1>
          <span className="text-base font-normal text-[#0A2533]" dir="rtl">
            היי אלוף! ברוך הבא למשפחת פיטל! הכנו שאלון היכרות מותאם אישית שיעזור
            לי לבנות את התכנית המושלמת עבורך! כמה שאלות ומתחילים.
          </span>
          <span className="text-base font-normal text-[#0A2533]" dir="rtl">
            שים לב שאלות המסומנות בכוכבית הן שאלות חובה.
          </span>
        </div>
        {/* <FTForm
          onSubmit={handleFormSubmit}
          resolver={zodResolver(questionnaries)}
        >
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1
                className="text-right text-base font-normal text-[#0A2533]"
                dir="rtl"
              >
                *אם נרשמת רק לתזונה לדלג על השאלות הרגלי כושר
              </h1>
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                פרטים אישיים
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
              <FInput
                label="שם מלא"
                placeholder="התשובה שלך"
                name="full_name"
                dir="rtl"
              />
              <FInput
                label="מס׳ נייד*"
                placeholder="התשובה שלך"
                name="cell_phone_number"
                dir="rtl"
              />
              <FInput
                type="number"
                label="גיל"
                placeholder="התשובה שלך"
                name="age"
                dir="rtl"
              />
              <FInput
                label="גובה"
                placeholder="התשובה שלך"
                name="height"
                dir="rtl"
              />
              <FInput
                label="משקל נוכחי - (גם בערך זה טוב)"
                placeholder="התשובה שלך"
                name="weight"
                dir="rtl"
              />
              <FInput
                label="המשקל הגבוה שהגעת אליו במהלך חייך (לא חובה)"
                placeholder="התשובה שלך"
                name="highest_weight"
                dir="rtl"
              />
            </div>
          </div>
          <hr className="max-w-3xl mx-auto my-10" />
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                הרגלי כושר
              </h1>
              <h1
                className="text-right text-base font-normal text-[#0A2533]"
                dir="rtl"
              >
                *אם נרשמת רק לתזונה לדלג עלזה
              </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
              <div className="space-y-5">
                <FRadioInput
                  label="איפה אתה מעדיף להתאמן?"
                  name="preferred_training_location"
                  options={[
                    { id: "r2", value: "gym", label: "בחדר כושר" },
                    { id: "r3", value: "home", label: "בבית" },
                  ]}
                  dir="rtl"
                  type="radio"
                />
                <FInput
                  label="תאר את אימוני הכח שלך כרגע (איזה תרגילים, טווחי חזרות, תדירות וכו׳): אם לא עושה לרשום ׳לא עושה׳"
                  placeholder="התשובה שלך"
                  name="strength_training_description"
                  dir="rtl"
                />
                <FInput
                  label="איזה אזורים אתה מעדיף שיקבלו יותר דגש בתכנית האימונים האישית שלך? חזה, ידיים, גב, רגליים, דגש ישבן, כתפיים, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עלייך."
                  placeholder="התשובה שלך"
                  name="focused_body_areas"
                  dir="rtl"
                />
              </div>
              <div className="space-y-5">
                <FInput
                  label="אם בחרת בבית - איזה אביזרים יש ברשותך או שתרצה לרכוש? למשל גומיות, רצועות TRX, משקולות, מתח, ספת משקולות? מומלץ משקולות"
                  placeholder="התשובה שלך"
                  name="home_equipment"
                  dir="rtl"
                />
                <FInput
                  label="מהם התרגילים האהובים עליך? במידה ולא יודע לרשום ׳לא יודע׳"
                  placeholder="התשובה שלך"
                  name="favorite_exercises"
                  dir="rtl"
                />
                <FInput
                  label="מה האימון אירובי האהוב עליך?(אם יש)"
                  placeholder="התשובה שלך"
                  name="favorite_cardio"
                  dir="rtl"
                />
                <FInput
                  label="האם יש לך פציעות או מגבלות פיזיות?"
                  placeholder="התשובה שלך"
                  name="injuries_description"
                  dir="rtl"
                />
              </div>
            </div>
          </div>
          <hr className="max-w-3xl mx-auto my-10" />
          <div className="max-w-3xl mx-auto space-y-8">
            <h1
              className="text-right text-[28px] font-bold text-[#0A2533]"
              dir="rtl"
            >
              הרגלי תזונה
            </h1>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
              dir="rtl"
            >
              <div className="space-y-5">
                <FInput
                  label="מהם המאכלים האהובים עליך?*"
                  placeholder="התשובה שלך"
                  name="favorite_foods"
                  dir="rtl"
                />

                <FInput
                  label="מהם המאכלים שלא תיגע בהם?*"
                  placeholder="התשובה שלך"
                  name="disliked_foods"
                  dir="rtl"
                />

                <FInput
                  label="תאר סדר יום מלא של התזונה שלך, איך נראה יום רגיל* מה אוכל כשקם, בצהריים, בערב, נשנושים לפרט:)"
                  placeholder="התשובה שלך"
                  name="daily_meds"
                  dir="rtl"
                />
                <FInput
                  label="ועכשיו איך נראה סופש* אם יש ארוחה מיוחדת בשישי ושבת ומה הן מכילות לרוב"
                  placeholder="התשובה שלך"
                  name="descripe_weekend"
                />
              </div>
              <div className="space-y-5">
                <FInput
                  label="יש לך מתכונים שאתה אוהב להכין באופן תדיר (כאחת לשבוע)? אם כן, כתוב את המצרכים שלהם, כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
                  placeholder="התשובה שלך"
                  name="favorite_recipes"
                />
                <FInput
                  label="האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
                  placeholder="התשובה שלך"
                  name="alcohol_consumption"
                />

                <FInput
                  label="תרופות ומרשמים שאתה משתמש כרגע ובעבר?"
                  placeholder="התשובה שלך"
                  name="daily_nutrition"
                />
              </div>
            </div>
          </div>
          <hr className="max-w-3xl mx-auto my-10" />
          <div className="max-w-3xl mx-auto space-y-8">
            <h1
              className="text-right text-[28px] font-bold text-[#0A2533]"
              dir="rtl"
            >
              פרטים נוספים
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
              <div className="space-y-5">
                <FInput
                  label="במה אתה עובד כרגע ומה השעות עבודה שלך? האם עבודה יושבנית?"
                  placeholder="התשובה שלך"
                  name="work_and_work_hours"
                />

                <FInput
                  label="כאשר אתה מסתכל במראה, מה אתה מרגיש?*"
                  placeholder="התשובה שלך"
                  name="feel_about_your_look"
                />

                <FInput
                  label="הערות ודברים נוספים שתרצה לציין?"
                  placeholder="התשובה שלך"
                  name="additional_notes"
                />
                <FInput
                  label="כמה שעות אתה ישן ביום לערך?"
                  placeholder="התשובה שלך"
                  name="sleep_hours"
                />
              </div>
              <div className="space-y-5">
                <FInput
                  label="מהי רמת המוטיבציה שלך להגיע למטרה?* (צייני מספר מ 1-10)"
                  placeholder="התשובה שלך"
                  name="motivation_level"
                />
                <FInput
                  label="מהן המטרות שלך לטווח הארוך ולמה?*"
                  placeholder="התשובה שלך"
                  name="long_term_goals"
                />
                <FInput
                  label="האם הנך מתחייב על הצהרה ושקיפות של כל שימוש בחומרים אסורים לפני תחילת העבודה המשותפת ובמהלכה? הכוונה לחומרים כמו סטרואידים אנאבוליים וכדומה. בתשובה פשוט תרשום - ׳מתחייב׳"
                  placeholder="התשובה שלך"
                  name="supplements_will_use"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center my-10">
            <Button
              type="submit"
              className="w-56 h-14 p-4 text-base font-bold text-slate-200 bg-black rounded-full "
              dir="rtl"
            >
              שליחת הטופס
            </Button>
          </div>
        </FTForm> */}

        {user?.gender === "male" ? (
          <FTForm
            onSubmit={handleFormSubmit}
            resolver={zodResolver(questionnaries)}
          >
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-right text-base font-normal text-[#0A2533]"
                  dir="rtl"
                >
                  *אם נרשמת רק לתזונה לדלג על השאלות הרגלי כושר
                </h1>
                <h1
                  className="text-right text-[28px] font-bold text-[#0A2533]"
                  dir="rtl"
                >
                  פרטים אישיים
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <FInput
                  label="שם מלא"
                  placeholder="התשובה שלך"
                  name="full_name"
                  dir="rtl"
                />
                <FInput
                  label="מס׳ נייד*"
                  placeholder="התשובה שלך"
                  name="cell_phone_number"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  label="גיל"
                  placeholder="התשובה שלך"
                  name="age"
                  dir="rtl"
                />
                <FInput
                  label="גובה"
                  placeholder="התשובה שלך"
                  name="height"
                  dir="rtl"
                />
                <FInput
                  label="משקל נוכחי - (גם בערך זה טוב)"
                  placeholder="התשובה שלך"
                  name="weight"
                  dir="rtl"
                />
                <FInput
                  label="המשקל הגבוה שהגעת אליו במהלך חייך (לא חובה)"
                  placeholder="התשובה שלך"
                  name="highest_weight"
                  dir="rtl"
                />
              </div>
            </div>

            <hr className="max-w-3xl mx-auto my-10" />

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-right text-[28px] font-bold text-[#0A2533]"
                  dir="rtl"
                >
                  הרגלי כושר
                </h1>
                <h1
                  className="text-right text-base font-normal text-[#0A2533]"
                  dir="rtl"
                >
                  *אם נרשמת רק לתזונה לדלג עלזה
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-5">
                  <FRadioInput
                    label="איפה אתה מעדיף להתאמן?"
                    name="preferred_training_location"
                    options={[
                      { id: "r2", value: "gym", label: "בחדר כושר" },
                      { id: "r3", value: "home", label: "בבית" },
                    ]}
                    dir="rtl"
                    type="radio"
                  />
                  {/* <FRadioInput
                    label="כמה פעמים בשבוע ? 1-5"
                    name="preferred_training_location"
                    options={[
                      { id: "r2", value: "gym", label: "בחדר כושר" },
                      { id: "r3", value: "home", label: "בבית" },
                    ]}
                    dir="rtl"
                    type="radio"
                  /> */}
                  <FInput
                    label="כמה פעמים בשבוע ? 1-5"
                    placeholder="התשובה שלך"
                    name="strength_training_description"
                    dir="rtl"
                  />
                  <FInput
                    label="תאר את אימוני הכח שלך כרגע (איזה תרגילים, טווחי חזרות, תדירות וכו׳): אם לא עושה לרשום ׳לא עושה׳"
                    placeholder="התשובה שלך"
                    name="strength_training_description"
                    dir="rtl"
                  />
                  <FInput
                    label="איזה אזורים אתה מעדיף שיקבלו יותר דגש בתכנית האימונים האישית שלך? חזה, ידיים, גב, רגליים, דגש ישבן, כתפיים, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עלייך."
                    placeholder="התשובה שלך"
                    name="focused_body_areas"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="אם בחרת בבית - איזה אביזרים יש ברשותך או שתרצה לרכוש? למשל גומיות, רצועות TRX, משקולות, מתח, ספת משקולות? מומלץ משקולות"
                    placeholder="התשובה שלך"
                    name="home_equipment"
                    dir="rtl"
                  />
                  <FInput
                    label="מהם התרגילים האהובים עליך? במידה ולא יודע לרשום ׳לא יודע׳"
                    placeholder="התשובה שלך"
                    name="favorite_exercises"
                    dir="rtl"
                  />
                  <FInput
                    label="מה האימון אירובי האהוב עליך?(אם יש)"
                    placeholder="התשובה שלך"
                    name="favorite_cardio"
                    dir="rtl"
                  />
                  <FInput
                    label="האם יש לך פציעות או מגבלות פיזיות?"
                    placeholder="התשובה שלך"
                    name="injuries_description"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <hr className="max-w-3xl mx-auto my-10" />

            <div className="max-w-3xl mx-auto space-y-8">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                הרגלי תזונה
              </h1>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
                dir="rtl"
              >
                <div className="space-y-5">
                  <FInput
                    label="מהם המאכלים האהובים עליך?*"
                    placeholder="התשובה שלך"
                    name="favorite_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="מאכלים שלא תיגע בהם? (בין אם צמחוני/טבעוני/דברים שלא אוהב)"
                    placeholder="התשובה שלך"
                    name="disliked_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="תאר סדר יום מלא של התזונה שלך, איך נראה יום רגיל* מה אוכל כשקם, בצהריים, בערב, נשנושים לפרט:)"
                    placeholder="התשובה שלך"
                    name="daily_meds"
                    dir="rtl"
                  />
                  <FInput
                    label="ועכשיו איך נראה סופש* אם יש ארוחה מיוחדת בשישי ושבת ומה הן מכילות לרוב"
                    placeholder="התשובה שלך"
                    name="descripe_weekend"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="יש לך מתכונים שאתה אוהב להכין באופן תדיר (כאחת לשבוע)? אם כן, כתוב את המצרכים שלהם, כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
                    placeholder="התשובה שלך"
                    name="favorite_recipes"
                  />
                  <FInput
                    label="האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
                    placeholder="התשובה שלך"
                    name="alcohol_consumption"
                  />
                  <FInput
                    label="תרופות ומרשמים שאתה משתמש כרגע ובעבר?"
                    placeholder="התשובה שלך"
                    name="daily_nutrition"
                  />
                </div>
              </div>
            </div>

            <hr className="max-w-3xl mx-auto my-10" />

            <div className="max-w-3xl mx-auto space-y-8">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                פרטים נוספים
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <div className="space-y-5">
                  <FInput
                    label="במה אתה עובד כרגע ומה השעות עבודה שלך? האם עבודה יושבנית?"
                    placeholder="התשובה שלך"
                    name="work_and_work_hours"
                  />
                  <FInput
                    label="כאשר אתה מסתכל במראה, מה אתה מרגיש?*"
                    placeholder="התשובה שלך"
                    name="feel_about_your_look"
                  />
                  <FInput
                    label="הערות ודברים נוספים שתרצה לציין?"
                    placeholder="התשובה שלך"
                    name="additional_notes"
                  />
                  <FInput
                    label="כמה שעות אתה ישן ביום לערך?"
                    placeholder="התשובה שלך"
                    name="sleep_hours"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="מהי רמת המוטיבציה שלך להגיע למטרה?* (ציין מספר מ 1-10)"
                    placeholder="התשובה שלך"
                    name="motivation_level"
                  />
                  <FInput
                    label="מהן המטרות שלך לטווח הארוך ולמה?*"
                    placeholder="התשובה שלך"
                    name="long_term_goals"
                  />
                  <FInput
                    label="האם הנך מתחייב על הצהרה ושקיפות של כל שימוש בחומרים אסורים לפני תחילת העבודה המשותפת ובמהלכה? הכוונה לחומרים כמו סטרואידים אנאבוליים וכדומה. בתשובה פשוט תרשום - ׳מתחייב׳"
                    placeholder="התשובה שלך"
                    name="supplements_will_use"
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
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-right text-base font-normal text-[#0A2533]"
                  dir="rtl"
                >
                  *אם נרשמת רק לתזונה לדלג על השאלות הרגלי כושר
                </h1>
                <h1
                  className="text-right text-[28px] font-bold text-[#0A2533]"
                  dir="rtl"
                >
                  פרטים אישיים
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <FInput
                  label="שם מלא"
                  placeholder="התשובה שלך"
                  name="full_name"
                  dir="rtl"
                />
                <FInput
                  label="מס׳ נייד*"
                  placeholder="התשובה שלך"
                  name="cell_phone_number"
                  dir="rtl"
                />
                <FInput
                  type="number"
                  label="גיל"
                  placeholder="התשובה שלך"
                  name="age"
                  dir="rtl"
                />
                <FInput
                  label="גובה"
                  placeholder="התשובה שלך"
                  name="height"
                  dir="rtl"
                />
                <FInput
                  label="משקל נוכחי - (גם בערך זה טוב)"
                  placeholder="התשובה שלך"
                  name="weight"
                  dir="rtl"
                />
                <FInput
                  label="המשקל הגבוה שהגעת אליו במהלך חייך (לא חובה)"
                  placeholder="התשובה שלך"
                  name="highest_weight"
                  dir="rtl"
                />
              </div>
            </div>

            <hr className="max-w-3xl mx-auto my-10" />

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="space-y-4">
                <h1
                  className="text-right text-[28px] font-bold text-[#0A2533]"
                  dir="rtl"
                >
                  הרגלי כושר
                </h1>
                <h1
                  className="text-right text-base font-normal text-[#0A2533]"
                  dir="rtl"
                >
                  *אם נרשמת רק לתזונה לדלג עלזה
                </h1>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
                <div className="space-y-5">
                  <FRadioInput
                    label="איפה אתה מעדיף להתאמן?"
                    name="preferred_training_location"
                    options={[
                      { id: "r2", value: "gym", label: "בחדר כושר" },
                      { id: "r3", value: "home", label: "בבית" },
                    ]}
                    dir="rtl"
                    type="radio"
                  />
                  <FInput
                    label="תארי את אימוני הכח שלך כרגע (איזה תרגילים, טווחי חזרות, תדירות וכו׳): אם לא עושה לרשום ׳לא עושה׳"
                    placeholder="התשובה שלך"
                    name="strength_training_description"
                    dir="rtl"
                  />
                  <FInput
                    label="איזה אזורים את מעדיפה שיקבלו יותר דגש בתכנית האימונים האישית שלך? חזה, ידיים, גב, רגליים, ישבן, כתפיים, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עלייך."
                    placeholder="התשובה שלך"
                    name="focused_body_areas"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="אם בחרת בבית - איזה אביזרים יש ברשותך או שתרצי לרכוש? למשל גומיות, רצועות TRX, משקולות, מתח, ספת משקולות? מומלץ משקולות"
                    placeholder="התשובה שלך"
                    name="home_equipment"
                    dir="rtl"
                  />
                  <FInput
                    label="מהם התרגילים האהובים עליך? במידה ולא יודעת לרשום ׳לא יודעת׳"
                    placeholder="התשובה שלך"
                    name="favorite_exercises"
                    dir="rtl"
                  />
                  <FInput
                    label="מה האימון אירובי האהוב עליך?(אם יש)"
                    placeholder="התשובה שלך"
                    name="favorite_cardio"
                    dir="rtl"
                  />
                  <FInput
                    label="האם יש לך פציעות או מגבלות פיזיות?"
                    placeholder="התשובה שלך"
                    name="injuries_description"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <hr className="max-w-3xl mx-auto my-10" />

            <div className="max-w-3xl mx-auto space-y-8">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                הרגלי תזונה
              </h1>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
                dir="rtl"
              >
                <div className="space-y-5">
                  <FInput
                    label="מהם המאכלים האהובים עליך?*"
                    placeholder="התשובה שלך"
                    name="favorite_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="מאכלים שלא תיגעי בהם? (בין אם צמחונית/טבעונית/דברים שלא אוהבת)"
                    placeholder="התשובה שלך"
                    name="disliked_foods"
                    dir="rtl"
                  />
                  <FInput
                    label="תארי סדר יום מלא של התזונה שלך, איך נראה יום רגיל* מה אוכלת כשקמה, בצהריים, בערב, נשנושים לפרט:)"
                    placeholder="התשובה שלך"
                    name="daily_meds"
                    dir="rtl"
                  />
                  <FInput
                    label="ועכשיו איך נראה סופש* אם יש ארוחה מיוחדת בשישי ושבת ומה הן מכילות לרוב"
                    placeholder="התשובה שלך"
                    name="descripe_weekend"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="יש לך מתכונים שאת אוהבת להכין באופן תדיר (כאחת לשבוע)? אם כן, כתבי את המצרכים שלהם, כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
                    placeholder="התשובה שלך"
                    name="favorite_recipes"
                  />
                  <FInput
                    label="האם את שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
                    placeholder="התשובה שלך"
                    name="alcohol_consumption"
                  />
                  <FInput
                    label="תרופות ומרשמים שאת משתמשת כרגע ובעבר?"
                    placeholder="התשובה שלך"
                    name="daily_nutrition"
                  />
                </div>
              </div>
            </div>

            <hr className="max-w-3xl mx-auto my-10" />

            <div className="max-w-3xl mx-auto space-y-8">
              <h1
                className="text-right text-[28px] font-bold text-[#0A2533]"
                dir="rtl"
              >
                פרטים נוספים
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" dir="rtl">
                <div className="space-y-5">
                  <FInput
                    label="במה את עובדת כרגע ומה השעות עבודה שלך? האם עבודה יושבנית?"
                    placeholder="התשובה שלך"
                    name="work_and_work_hours"
                  />
                  <FInput
                    label="כאשר את מסתכלת במראה, מה את מרגישה?*"
                    placeholder="התשובה שלך"
                    name="feel_about_your_look"
                  />
                  <FInput
                    label="הערות ודברים נוספים שתרצה לציין?"
                    placeholder="התשובה שלך"
                    name="additional_notes"
                  />
                  <FInput
                    label="כמה שעות את ישנה ביום לערך?"
                    placeholder="התשובה שלך"
                    name="sleep_hours"
                  />
                </div>
                <div className="space-y-5">
                  <FInput
                    label="מהי רמת המוטיבציה שלך להגיע למטרה?* (צייני מספר מ 1-10)"
                    placeholder="התשובה שלך"
                    name="motivation_level"
                  />
                  <FInput
                    label="מהן המטרות שלך לטווח הארוך ולמה?*"
                    placeholder="התשובה שלך"
                    name="long_term_goals"
                  />
                  <FInput
                    label="האם הנך מתחייבת על הצהרה ושקיפות של כל שימוש בחומרים אסורים לפני תחילת העבודה המשותפת ובמהלכה? הכוונה לחומרים כמו סטרואידים אנאבוליים וכדומה. בתשובה פשוט תרשמי - ׳מתחייבת׳"
                    placeholder="התשובה שלך"
                    name="supplements_will_use"
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
