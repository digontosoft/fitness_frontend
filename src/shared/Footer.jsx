import { instaIcon, tiktok, whiteLogo } from "../assets/index";
const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-[rgb(148,0,25)] to-[#FD4753]  min-h-[100px]  max-h-full ">
      <div className="max-w-7xl mx-auto lg:py-10 py-2 px-2 md:py-4 flex flex-col md:flex-row justify-center md:justify-between items-center md:gap-10 gap-5">
        <div className="flex flex-col-reverse md:flex-row gap-10 justify-between md:60 lg:gap-72">
          <div className="flex flex-col gap-4 justify-center items-center ">
            <p className=" text-white font-medium">עקבו אחרינו</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/fitalmualem?igsh=MXZjbzV6bGswa2Fndg%3D%3D&utm_source=qr"
                target="_blank"
              >
                <img src={instaIcon} alt="instagram" />
              </a>
              <a
                href="https://www.tiktok.com/@fitalmualem?_t=ZS-8umaIU37r20&_r=1"
                target="_blank"
              >
                {" "}
                <img src={tiktok} alt="tiktok" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex  flex-col justify-between items-center gap-2">
          <img className="hidden md:block w-15 h-14" src={whiteLogo} alt="" />
          <p className="text-xs font-medium text-white">
            כל הזכויות שמורות לטל מועלם Fital 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
