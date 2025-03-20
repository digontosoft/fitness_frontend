import { Ellipse92, Ellipse93, EllipseE8 } from "@/assets/index";
import Title from "@/components/measurements/Tilte";
import Paragraph from "@/components/regulation/Paragraph";
import Container from "./Container";
const Regulation = () => {
  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
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
      <div>
        <Title title={"אישור תקנון"} />
        <Paragraph
          text={
            "ברוכים הבאים לפיטל VIP, על מנת שנוכל להתחיל יש לקרוא את התקנון ולאשר אותו ע׳׳י לחיצה על הכפתור בתחתית העמוד."
          }
        />
        <Container />
      </div>
    </div>
  );
};

export default Regulation;
