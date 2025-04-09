import { base_url } from "@/api/baseUrl";
import { blackLogo, googleIcon, whiteLogo, bodyBuilder } from "../../assets";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loading from "@/components/common/Loading";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const handleLoginWithGoogle = (role) => {
    setLoading(true);
    window.location.href = `${base_url}/auth/google?role=${role}`;
  };
  if (loading) {
    return <Loading />;
  }
  const LoginButton = ({ role, text, className }) => (
    <Button
      variant="ai"
      size="lg"
      className={`rounded-full text-white flex justify-center items-center border-[2px] border-slate-50 ${className}`}
      onClick={() => handleLoginWithGoogle(role)}
    >
      <p>{text}</p>
      {role === "admin" && (
        <img className="w-8" src={googleIcon} alt="Google Icon" />
      )}
    </Button>
  );

  const WelcomeContent = ({ logo, textColor }) => (
    <div className="flex flex-col justify-center gap-8 items-center">
      <p className={`text-4xl ${textColor}`}>
        ברוכים הבאים
        <br />
        <span className="font-bold">למרכז הפיטנס</span>
      </p>
      <div className="flex gap-3 justify-start items-center">
        <img
          src={logo}
          alt="Logo"
          className={logo === blackLogo ? "hidden md:block" : ""}
        />
        <p className={`text-4xl ${textColor}`}>של</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-8 w-full">
        <LoginButton
          role="trainee"
          text="התחברות מהירה באמצעות גוגל"
          className="bg-[#151515] hover:bg-gray-700 transition duration-300 px-2"
        />
        <LoginButton
          role="recipe"
          text="התחברות ללקוחות ספר המתכונים"
          className="w-full bg-gradient-to-tr from-[#FD4753] to-[#940019] hover:opacity-80 transition duration-300 px-4"
        />
        <p
          className={`underline text-sm font-semibold ${textColor} hover:text-blue-600`}
        >
          יצירת חשבון חדש
        </p>
      </div>
    </div>
  );

  return (
    <div className="relative flex md:flex-row flex-col-reverse w-full min-h-screen bg-gradient-to-tr from-[#0A0A0A] via-[#343434] to-[#0A0A0A] ">
      <div className="flex-1 relative">
        <img
          src={bodyBuilder}
          alt="Body Builder"
          className="w-full md:w-[90%] h-[100vh] object-cover md:object-fill"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center md:hidden bg-black/50">
          <WelcomeContent logo={whiteLogo} textColor="text-white" />
        </div>
      </div>

      <div className="flex-1 hidden md:flex md:bg-white bg-transparent pt-40 justify-center items-center md:pt-0 py-4 md:relative">
        <WelcomeContent logo={blackLogo} textColor="md:text-black text-white" />
      </div>
    </div>
  );
};

export default LoginPage;
