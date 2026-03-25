import { Card } from "@/components/ui/card";

const BasicCard = ({ children }) => {
  return (
    <div>
      <Card className="w-full bg-[#E6F4FF] py-4 px-4 flex justify-between items-center">
        {children}
      </Card>
    </div>
  );
};

export default BasicCard;
