import { base_url } from "@/api/baseUrl";
import { Ellipse92, Ellipse93, EllipseE8 } from "@/assets";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowAnswerModal() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { Id } = useParams();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/userDetails/${Id}`);
        setUserInfo(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, [Id]);

  console.log('user info:', userInfo);

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
        <div
          className="grid grid-cols-1 gap-5 max-w-3xl mx-auto"
          dir="rtl"
        >
          <div dir="rtl">
            <div className="font-bold">שם מלא</div>
            <div>
              {userInfo.full_name || "N/A"}
            </div>
          </div>
          <div dir="rtl">
            <div className="font-bold">מס׳ נייד</div>
            <div>
              {userInfo.cell_phone_number ? userInfo?.cell_phone_number : "N/A"}
            </div>
          </div>
          
          
          <div dir="rtl">
            <div className="font-bold"> גיל</div>
            <div>{userInfo.age ? userInfo?.age : "N/A"}</div>
          </div>
          <div dir="rtl">
            <div className="font-bold">גובה</div>
            <div>{userInfo.height ? userInfo?.height : "N/A"}</div>
          </div>
          <div dir="rtl">
            <div className="font-bold">משקל נוכחי - (גם בערך זה טוב)</div>
            <div>{userInfo?.weight ? userInfo?.weight : "N/A"}</div>
          </div>
          <div dir="rtl">
            <div className="font-bold">המשקל הגבוה שהגעת אליו במהלך חייך (לא חובה)</div>
            <div>
              {userInfo.highest_weight ? userInfo?.highest_weight : "N/A"}
            </div>
          </div>
        
          {/* <div dir="rtl">
            <div>המייל שלך שנרשמת איתו לגוגל דרייב</div>
            <div>{userInfo.email ? userInfo?.email : "N/A"}</div>
          </div> */}
          
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
        <div
          className="grid grid-cols-1 gap-5 max-w-3xl mx-auto"
          dir="rtl"
        >
          <div>
            <div className="font-bold">איפה אתה מעדיף להתאמן?</div>
            <div>
              {userInfo.preferred_training_location
                ? userInfo?.preferred_training_location
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">
              אם בחרת בבית - איזה אביזרים יש ברשותך או שתרצה לרכוש? למשל גומיות,
              רצועות TRX, משקולות, מתח, ספת משקולות? מומלץ משקולות
            </div>
            <div>
              {userInfo.home_equipment ? userInfo?.home_equipment : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">כמה פעמים בשבוע נתאמן?״/״</div>
            <div>
              {userInfo.how_many_times_want_training_in_week
                ? userInfo?.how_many_times_want_training_in_week
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">מהם התרגילים האהובים עליך? במידה ולא יודע לרשום ׳לא יודע׳</div>
            <div>
              {userInfo.favorite_exercises
                ? userInfo?.favorite_exercises
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">
              תאר את אימוני הכח שלך כרגע (איזה תרגילים, טווחי חזרות, תדירות
              וכו׳): אם לא עושה לרשום ׳לא עושה׳
            </div>
            <div>
              {userInfo.strength_training_description
                ? userInfo?.strength_training_description
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">מה האימון אירובי האהוב עליך?(אם יש)</div>
            <div>
              {userInfo.favorite_cardio ? userInfo?.favorite_cardio : "N/A"}
            </div>
          </div>
          
          <div>
            <div className="font-bold">האם יש לך פציעות או מגבלות פיזיות?</div>
            <div>
              {userInfo.injuries_description
                ? userInfo?.injuries_description
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">
              איזה אזורים אתה מעדיף שיקבלו יותר דגש בתכנית האימונים האישית שלך?
              חזה, ידיים, גב, רגליים, דגש ישבן, כתפיים, בטן ועוד.. אפשר לרשום גם
              כל הגוף באותה המידה או כמה אזורים שעדיפים עלייך.
            </div>
            <div>
              {userInfo.focused_body_areas
                ? userInfo?.focused_body_areas
                : "N/A"}
            </div>
          </div>
          <div>
            <div>
            <div className="font-bold">כמה פעמים בשבוע נתאמן?״/״</div>
            </div>
            <div>
              {userInfo.how_many_times_want_training_in_week
               || "N/A"}
            </div>
          </div>

          
          
          {/* <div>
            <div>מהם המאכלים האהובים עליך?</div>
            <div>
              {userInfo.favorite_foods ? userInfo?.favorite_foods : "N/A"}
            </div>
          </div>
        
          <div>
            <div>מהם המאכלים שלא תיגע בהם?</div>
            <div>
              {userInfo.disliked_foods ? userInfo?.disliked_foods : "N/A"}
            </div>
          </div> */}
         
          {/* <div>
            <div>
              תאר סדר יום מלא של התזונה שלך, איך נראה יום רגיל* מה אוכל כשקם,
              בצהריים, בערב, נשנושים לפרט:
            </div>
            <div>{userInfo.daily_meds ? userInfo?.daily_meds : "N/A"}</div>
          </div> */}
          
        </div>
        </div>
        <hr className="max-w-3xl mx-auto my-10" />
        <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-right text-[28px] font-bold text-[#0A2533]"
          dir="rtl">
                הרגלי תזונה
              </h1>
        <div
          className="grid grid-cols-1 gap-5 max-w-3xl mx-auto"
          dir="rtl"
        >

          <div>
            <div className="font-bold">מהם המאכלים האהובים עליך?*</div>
            <div>
              {userInfo?.favorite_foods
                ? userInfo?.favorite_foods
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">מאכלים שלא תיגע בהם? (בין אם צמחוני/טבעוני/דברים שלא אוהב)</div>
            <div>
              {userInfo?.disliked_foods
                ? userInfo?.disliked_foods
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold"> תאר סדר יום מלא של התזונה שלך, איך נראה יום רגיל* מה אוכל כשקם, בצהריים, בערב, נשנושים לפרט:</div>
            <div>
              {userInfo?.daily_meds
                ? userInfo?.daily_meds
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">ועכשיו איך נראה סופש* אם יש ארוחה מיוחדת בשישי ושבת ומה הן מכילות לרוב</div>
            <div>
              {userInfo?.descripe_weekend
                ? userInfo?.descripe_weekend
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">יש לך מתכונים שאתה אוהב להכין באופן תדיר (כאחת לשבוע)? אם כן, כתוב את המצרכים שלהם, כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה יחידות יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)</div>
            <div>
              {userInfo?.favorite_recipes
                ? userInfo?.favorite_recipes
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות?</div>
            <div>
              {userInfo?.alcohol_consumption
                ? userInfo?.alcohol_consumption
                : "N/A"}
            </div>
          </div>
          <div>
            <div className="font-bold">תרופות ומרשמים שאתה משתמש כרגע ובעבר?</div>
            <div>
              {userInfo?.daily_nutrition
                ? userInfo?.daily_nutrition
                : "N/A"}
            </div>
          </div>





          {/* <div>
            <div>במה אתה עובד כרגע ומה השעות עבודה שלך? האם עבודה יושבנית?</div>
            <div>
              {userInfo.work_and_work_hours
                ? userInfo?.work_and_work_hours
                : "N/A"}
            </div>
          </div>
          <div>
            <div>
              ועכשיו איך נראה סופש* אם יש ארוחה מיוחדת בשישי ושבת ומה הן מכילות
              לרוב
            </div>
            <div>
              {userInfo.descripe_weekend ? userInfo?.descripe_weekend : "N/A"}
            </div>
          </div>
          <div>
            <div>כאשר אתה מסתכל במראה, מה אתה מרגיש?</div>
            <div>
              {userInfo.feel_about_your_look
                ? userInfo?.feel_about_your_look
                : "N/A"}
            </div>
          </div>
          <div>
            <div>
              יש לך מתכונים שאתה אוהב להכין באופן תדיר (כאחת לשבוע)? אם כן, כתוב
              את המצרכים שלהם, כמויות וכמה יחידות יוצא. למשל מתכון לממולאים וכמה
              יחידות יוצא מתוך כל התכולה (אפשר לרשום כמה מתכונים)
            </div>
            <div>
              {userInfo.favorite_recipes ? userInfo?.favorite_recipes : "N/A"}
            </div>
          </div>
          <div>
            <div>מהן המטרות שלך לטווח הארוך ולמה?</div>
            <div>
              {userInfo.long_term_goals ? userInfo?.long_term_goals : "N/A"}
            </div>
          </div>
          <div>
            <div>האם אתה שותה אלכוהול? אם כן, באיזה כמויות ותדירות? </div>
            <div>
              {userInfo.alcohol_consumption
                ? userInfo?.alcohol_consumption
                : "N/A"}
            </div>
          </div>
          <div>
            <div>מהי רמת המוטיבציה שלך להגיע למטרה?* (צייני מספר מ 1-10) </div>
            <div>
              {userInfo.motivation_level ? userInfo?.motivation_level : "N/A"}
            </div>
          </div>
          <div>
            <div>תרופות ומרשמים שאתה משתמש כרגע ובעבר?</div>
            <div>
              {userInfo.daily_nutrition ? userInfo?.daily_nutrition : "N/A"}
            </div>
          </div>
          <div>
            <div>
              האם הנך מתחייב על הצהרה ושקיפות של כל שימוש בחומרים אסורים לפני
              תחילת העבודה המשותפת ובמהלכה? הכוונה לחומרים כמו סטרואידים
              אנאבוליים וכדומה. בתשובה פשוט תרשום - ׳מתחייב׳{" "}
            </div>
            <div>
              {userInfo.supplements_will_use
                ? userInfo?.supplements_will_use
                : "N/A"}
            </div>
          </div>
          <div>
            <div>כמה שעות אתה ישן ביום לערך?</div>
            <div>{userInfo.sleep_hours ? userInfo?.sleep_hours : "N/A"}</div>
          </div>
          <div>
            <div>הערות ודברים נוספים שתרצה לציין?</div>
            <div>
              {userInfo.additional_notes ? userInfo?.additional_notes : "N/A"}
            </div>
          </div> */}
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
              <div className="grid grid-cols-1 gap-5" dir="rtl">
                  <div>
                    <div className="font-bold">במה אתה עובד כרגע ומה השעות עבודה שלך? האם עבודה יושבנית?</div>
                    <div>{userInfo?.work_and_work_hours ? userInfo?.work_and_work_hours : "N/A"}</div>
                  </div>
                  <div>
                    <div className="font-bold">מהי רמת המוטיבציה שלך להגיע למטרה?* (ציין מספר מ 1-10)</div>
                    <div>{userInfo?.motivation_level ? userInfo?.motivation_level : "N/A"}</div>
                  </div>
                  <div>
                    <div className="font-bold">כאשר אתה מסתכל במראה, מה אתה מרגיש?*</div>
                    <div>{userInfo?.feel_about_your_look ? userInfo?.feel_about_your_look : "N/A"}</div>
                  </div>
                  <div>
                    <div className="font-bold">מהן המטרות שלך לטווח הארוך ולמה?*</div>
                    <div>{userInfo?.long_term_goals ? userInfo?.long_term_goals : "N/A"}</div>
                  </div>
                  <div>
                    <div className="font-bold">כמה שעות אתה ישן ביום לערך?</div>
                    <div>{userInfo?.sleep_hours ? userInfo?.sleep_hours : "N/A"}</div>
                  </div>
                  <div>
                    <div className="font-bold">הערות ודברים נוספים שתרצה לציין?</div>
                    <div>{userInfo?.additional_notes ? userInfo?.additional_notes : "N/A"}</div>
                  </div>
                <div>
                    <div className="font-bold">האם הנך מתחייב על הצהרה ושקיפות של כל שימוש בחומרים אסורים לפני תחילת העבודה המשותפת ובמהלכה? הכוונה לחומרים כמו סטרואידים אנאבוליים וכדומה. בתשובה פשוט תרשום - ׳מתחייב׳</div>
                    <div>{userInfo?.supplements_will_use ? userInfo?.supplements_will_use : "N/A"}</div>
                  </div>
              </div>
            </div>
      </div>
    </>
  );
}

export default ShowAnswerModal;
