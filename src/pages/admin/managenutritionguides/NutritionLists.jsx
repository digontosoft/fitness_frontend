import Title from "@/components/measurements/Tilte";
import Container from "@/shared/Container";
import { NutritionList } from "./NutritionList";

const NutritionLists = () => {
  return (
    <Container className="min-h-[80vh] h-auto sm:px-0 px-4">
      <Title title="רשימת תזונה" />
      <NutritionList />
    </Container>
  );
};

export default NutritionLists;
