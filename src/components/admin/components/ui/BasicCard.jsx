import { Card } from "@/components/ui/card";

const BasicCard = ({ children }) => {
  return (
    <div>
      <Card className="w-full bg-[#FAEAEB] py-4 px-4 flex justify-between items-center">
        {children}
      </Card>
    </div>
  );
};

export default BasicCard;
