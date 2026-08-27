import { base_url } from "@/api/baseUrl";
import femaleLockScreen from "@/assets/image/female-lock-screen.png";
import maleLockScreen from "@/assets/image/male-lock-screen.png";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Full-screen gate shown to a trainee after the onboarding questionnaire is
// submitted. Admin/superadmin unlock the user from their dashboard
// (screen: "unlock"), after which this page redirects to the home screen.
const LockScreen = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const lockImage = userInfo?.gender === "male" ? maleLockScreen : femaleLockScreen;

  const checkUnlockStatus = useCallback(async () => {
    const userId = userInfo?._id;
    if (!userId) return;
    try {
      const response = await axios.get(`${base_url}/getUser/${userId}`);
      if (response.status === 200 && response.data?.data?.screen === "unlock") {
        const updatedUser = { ...userInfo, ...response.data.data };
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Failed to check unlock status:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login", { replace: true });
      return;
    }
    checkUnlockStatus();
    const interval = setInterval(checkUnlockStatus, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    navigate("/login", { replace: true });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#647BA7]">
      <img
        src={lockImage}
        alt="מסך נעילה"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <div className="relative z-10 flex flex-col items-center justify-end gap-2 h-full px-4 pb-24 md:pb-16 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-white" dir="rtl">
          החשבון שלך נעול
        </h1>
        <p className="max-w-md text-sm text-white/90" dir="rtl">
          יש להמתין לאישור והפעלת החשבון על ידי המנהל. ברגע שהחשבון שלך
          יופעל תועבר אוטומטית לדף הבית.
        </p>
        <Button
          type="button"
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-full border border-white/70 px-6 text-white hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          התנתק
        </Button>
      </div>
    </div>
  );
};

export default LockScreen;
