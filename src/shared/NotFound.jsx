import { Card } from "@/components/ui/card";

const NotFound = ({ title }) => {
  return (
    <Card
      className="w-full h-auto bg-[#E6F4FF] py-4 px-4 flex justify-center items-center"
      title={title}
    >
      {title}
    </Card>
  );
};

export default NotFound;
