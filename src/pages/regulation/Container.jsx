import { base_url } from "@/api/baseUrl";
import { Gentelmen, leftElips } from "@/assets";
import Loading from "@/components/common/Loading";
import { verifyToken } from "@/constants/verifyToken";
import { UserInfoContext } from "@/context";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Container = () => {
  const [loading, setLoading] = useState(false);

  const userDetails = JSON.parse(localStorage.getItem("userInfo"));

  const navigate = useNavigate();

  const handleNextStep = async () => {
    setLoading(true);
    const updateUserInfo = {
      user_id: userDetails?._id,
      termsAndConditions: false,
      isNewUser: false,
    };

    try {
      const [updateResponse, foodDairyResponse] = await Promise.all([
        axios.post(`${base_url}/updateUserInfo`, updateUserInfo),
        axios.post(`${base_url}/food-dairy`, { user_id: userDetails?._id }),
      ]);

      if (updateResponse.status === 200 && foodDairyResponse.status === 201) {
        navigate("/measurement-women");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto rounded-2xl shadow-xl p-10 mt-10 md:mt-20 bg-white">
      <div dir="rtl">
        1 אנו שמחים שבחרת לרכוש את תוכנית התזונה ו/או האימונים של ׳פיטל׳ .{" "}
        <br />2 הסכם זה נערך בינך ובין חברת ׳פיטל׳ בהנהלת טל מועלם להלן
        :"החברה״. <br />
        .3 ההסכם מנוסח בלשון זכר מטעמי נוחות בלבד, אך פונה לכל המינים בצורה
        שווה. . <br />4 התוכנית מיועדת לאנשים בריאים ואינה מיועדת לאנשים בעלי
        מחלות, בשינוי במצבך הבריאותי יש להודיע לנו. . <br />5 התוכנית אותה רכשת
        תימסר לך בתום מילוי שאלון אישי ו/או תיעוד יומן אכילה אישי. . <br />6
        יובהר כי ההרשמה לתוכנית הינה אישית ולא ניתן להעביר אותה לצד ג' כלשהו,
        ללא הסכמת החברה מראש ובכתב . <br /> 7 כל מידע מקצועי ו/או ייעוץ שימסרו
        למתאמן/ת במסגרת האימון ו/או הייעוץ לרבות תכניות אימונים, הדרכות, הנחיות,
        הוראות וכו', הינם קניינו הבלעדי של המאמן/ת והמצטרף (הלקוח) לא יוכל לעשות
        כל שימוש בחומרים שהועברו אליו ולהעבירם בכל דרך שהיא, לכל צד ג' ללא קבלת
        אישור והסכמת החברה שתינתן מראש ובכתב. . <br /> 8 ידוע ללקוח כי מר טל
        מועלם ו/או יועצי החברה אינם תזונאים ו/או תזונאים קליניים ו/או רופאים. .{" "}
        <br /> 9 ידוע ללקוח כי הייעוץ במסגרת התוכנית אינו תחליף לטיפול רפואי
        ואינו מפסיק ו/או מבטל ו/או מתחיל ו/או בא לשנות ו/או להוסיף על טיפול
        רפואי כלשהו. . <br /> 10 הלקוח מודע ומסכים כי המידע אותו ימסור והמידע
        אשר ייאסף לגביו ,במסגרת התוכנית, יתועדו ע"י החברה לצרכי הייעוץ ולצרכי
        בקרה ופיקוח, לרבות באמצעות מאגר מידע. החברה לא תעשה שימוש כלשהו במידע
        כאמור ולא תעבירו לצד ג', אלא בהסכמת הלקוח. . <br /> 11 ההשתתפות בתוכנית
        הינה על אחריותו הבלעדית והמלאה של הלקוח. . <br /> 12 הלקוח מאשר כי החברה
        ו/או מי מטעמה לא יישאו באחריות כלשהי למצבו הרפואי לרבות בגין אי אבחנה
        ו/או מניעה ו/או טיפול בבעיה או מחלה והלקוח מוותר על כל טענה ו/או דרישה
        ו/או תביעה כלפי החברה ו/או מי מטעמה בכל הקשור בכך. . <br /> 13 באחריות
        הלקוח לבחור את מקום ביצוע האימונים ולוודא את בטיחותו וכשירותו של מקום
        האימונים והמתקנים בו וכן וליישם את תכנית האימונים בביטחה. הלקוח מצהיר כי
        הינו נושא באחריות בלעדית עם ביצוע תכנית האימונים והתזונה וכי הוא מוותר
        על כל טענה ו/או דרישה ו/או תביעה כלפי החברה ו/או מי מטעמה בקשר לכך. .{" "}
        <br /> 14 מדיניות הביטולים שלנו הינה בהתאם לחוק הגנת הצרכן ,תשמ"א
        1981(להלן:"חוק הגנת הצרכן"). . <br /> 15 בהתאם לחוק הגנת הצרכן ניתן לבטל
        את העסקה תוך 14 ימים ממועד ההרשמה ,ללא דמי ביטול ,למעט ניכוי בסך 100 ש"ח
        או 5% משווי העסקה, לפי הנמוך מבניהם וזאת בכפוף לכך שהביטול נעשה טרם קבלת
        התוכנית המפורטת ו/או תכנים דיגיטליים (קורס/ספר ועוד) על פי המוקדמת
        מבניהם. . <br /> 16 מובהר בזאת כי לא יתאפשר ביטול עסקה ,כולה או חלקה
        ,לאחר קבלת התוכנית המפורטת תפריט תזונה ו/או תוכנית אימונים ו/או תכנים
        דיגיטליים (ספר המתכונים/קורסים ועוד). . <br />
        17 הסכם זה מחליף כל התקשרות מקדימה בין הצדדים בעל פה ובכתב ו/או הסדר אחר
        בין הצדדים שנעשה טרם שליחתו.
        <br />
        18. הלקוח הבין ומסכים לתנאי הסכם זה ומוכן להתחיל ולהצליח בגדול ביחד.{" "}
        <br />
        שלך ואיתך, טל
      </div>

      <div className="flex justify-center items-center flex-col gap-20 relative">
        <p className="text-[#000000] font-bold mt-10 text-center">
          בהצלחה לנו! <br />
          מאמין בך, פיטל
        </p>
        <div className="flex w-40 justify-center items-center bg-gradient-to-tr  from-red-800 to-red-600 transition duration-300   py-1 rounded-full">
          <button
            type="submit"
            className="text-white cursor-pointer relative z-50 hover:opacity-80 "
            onClick={() => handleNextStep()}
          >
            אישור תקנון והמשך
          </button>
        </div>
        <div
          className="absolute top-10 inset-[-4%] w-full h-full md:flex hidden"
          style={{
            backgroundImage: `url(${leftElips})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            className="w-64 h-60 absolute top-[-20%]"
            src={Gentelmen}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Container;
