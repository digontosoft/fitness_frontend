import { Card } from "@/components/ui/card";

const NotFound = ({ title }) => {
  return (
    <Card
      className="w-full h-auto bg-[#FAEAEB] py-4 px-4 flex justify-center items-center"
      title={title}
    >
      {title}
    </Card>
  );
};

export default NotFound;
