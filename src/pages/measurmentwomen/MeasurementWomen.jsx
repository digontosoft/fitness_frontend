import FInput from "@/components/admin/components/ui/FInput";
import { Button } from "@/components/ui/button";
import { Ellipse92, Ellipse93, EllipseE8 } from "@/assets/index";
import FTForm from "@/components/admin/components/FTForm/FTForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionnaries } from "@/constants/ValidationSchema";
import FRadioInput from "@/components/admin/components/ui/FRadioIntput";
import { toast } from "sonner";
import axios from "axios";
import { base_url } from "@/api/baseUrl";
import { verifyToken } from "@/constants/verifyToken";
import { useContext, useState } from "react";
import Loading from "@/components/common/Loading";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "@/context";
const MeasurementWomen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  const { id } = verifyToken(token);
  const { userInfo } = useContext(UserInfoContext);
  console.log("userType", userInfo);
  const handleFormSubmit = (data) => {
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
            navigate("/measurements");
          }
        });
    } catch (err) {
      toast.error(err);
      console.log("quesntionariesError:", err);
    } finally {
      setLoading(false);
    }
    if (loading) {
      return <Loading />;
    }
  };
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
            שים לב: שאלות המסומנות בכוכבית הן שאלות חובה.
          </span>
        </div>
        <FTForm
          onSubmit={handleFormSubmit}
          resolver={zodResolver(questionnaries)}
        >
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
            dir="rtl"
          >
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
              label="המייל שלך שנרשמת איתו לגוגל דרייב*"
              placeholder="התשובה שלך"
              name="email"
              type="email"
              dir="rtl"
            />
            <FInput
              label="המשקל הגבוה שהגעת אליו במהלך חייך (לא חובה)"
              placeholder="התשובה שלך"
              name="highest_weight"
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
          </div>
          <hr className="max-w-3xl mx-auto my-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <FInput
              label="מה האימון אירובי האהוב עליך?(אם יש)"
              placeholder="התשובה שלך"
              name="favorite_cardio"
              // dir="rtl"
            />

            <FRadioInput
              label="איפה אתה מעדיף להתאמן?"
              name="preferred_training_location"
              options={[
                { id: "r2", value: "gym", label: "בחדר כושר" },
                { id: "r3", value: "home", label: "בבית" },
              ]}
              // dir="rtl"
              type="radio"
            />

            <FInput
              label="האם יש לך פציעות או מגבלות פיזיות?"
              placeholder="התשובה שלך"
              name="injuries_description"
              // dir="rtl"
            />

            <FInput
              label="אם בחרת בבית - איזה אביזרים יש ברשותך או שתרצה לרכוש? למשל גומיות, רצועות TRX, משקולות, מתח, ספת משקולות? מומלץ משקולות"
              placeholder="התשובה שלך"
              name="home_equipment"
              // dir="rtl"
            />

            <FInput
              label="מהם המאכלים האהובים עליך?*"
              placeholder="התשובה שלך"
              name="favorite_foods"
              // dir="rtl"
            />

            <FInput
              label="תאר את אימוני הכח שלך כרגע (איזה תרגילים, טווחי חזרות, תדירות וכו׳): אם לא עושה לרשום ׳לא עושה׳"
              placeholder="התשובה שלך"
              name="strength_training_description"
              // dir="rtl"
            />

            <FInput
              label="מהם המאכלים שלא תיגע בהם?*"
              placeholder="התשובה שלך"
              name="disliked_foods"
              // dir="rtl"
            />

            <FInput
              label="מהם התרגילים האהובים עליך? במידה ולא יודע לרשום ׳לא יודע׳"
              placeholder="התשובה שלך"
              name="favorite_exercises"
              // dir="rtl"
            />

            <FInput
              label="תאר סדר יום מלא של התזונה שלך, איך נראה יום רגיל* מה אוכל כשקם, בצהריים, בערב, נשנושים לפרט:)"
              placeholder="התשובה שלך"
              name="daily_meds"
              // dir="rtl"
            />

            <FInput
              label="איזה אזורים אתה מעדיף שיקבלו יותר דגש בתכנית האימונים האישית שלך? חזה, ידיים, גב, רגליים, דגש ישבן, כתפיים, בטן ועוד.. אפשר לרשום גם כל הגוף באותה המידה או כמה אזורים שעדיפים עלייך."
              placeholder="התשובה שלך"
              name="focused_body_areas"
              // dir="rtl"
            />
          </div>
          <hr className="max-w-3xl mx-auto my-10" />
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
            dir="rtl"
          >
            <FInput
              label="במה אתה עובד כרגע ומה השעות עבודה שלך? האם עבודה יושבנית?"
              placeholder="התשובה שלך"
              name="work_and_work_hours"
            />
            <FInput
              label="ועכשיו איך נראה סופש* אם יש ארוחה מיוחדת בשישי ושבת ומה הן מכילות לרוב"
              placeholder="התשובה שלך"
              name="descripe_weekend"
            />
            <FInput
              label="כאשר אתה מסתכל במראה, מה אתה מרגיש?*"
              placeholder="התשובה שלך"
              name="feel_about_your_look"
            />
            <FInput
              label="יש לך מתכונים שאתה אוהב להכין באופן תדיר (כאחת לשבוע)? אם כן, כתוב את המצרכים שלהם, כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)"
              placeholder="התשובה שלך"
              name="favorite_recipes"
            />
            <FInput
              label="מהן המטרות שלך לטווח הארוך ולמה?*"
              placeholder="התשובה שלך"
              name="long_term_goals"
            />
            <FInput
              label="האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות?"
              placeholder="התשובה שלך"
              name="alcohol_consumption"
            />
            <FInput
              label="מהי רמת המוטיבציה שלך להגיע למטרה?* (צייני מספר מ 1-10)"
              placeholder="התשובה שלך"
              name="motivation_level"
            />
            <FInput
              label="תרופות ומרשמים שאתה משתמש כרגע ובעבר?"
              placeholder="התשובה שלך"
              name="daily_nutrition"
            />
            <FInput
              label="האם הנך מתחייב על הצהרה ושקיפות של כל שימוש בחומרים אסורים לפני תחילת העבודה המשותפת ובמהלכה? הכוונה לחומרים כמו סטרואידים אנאבוליים וכדומה. בתשובה פשוט תרשום - ׳מתחייב׳"
              placeholder="התשובה שלך"
              name="supplements_will_use"
            />
            <FInput
              label="כמה שעות אתה ישן ביום לערך?"
              placeholder="התשובה שלך"
              name="sleep_hours"
            />
            <FInput
              label="הערות ודברים נוספים שתרצה לציין?"
              placeholder="התשובה שלך"
              name="additional_notes"
            />
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
        </FTForm>
      </div>
    </>
  );
};

export default MeasurementWomen;
