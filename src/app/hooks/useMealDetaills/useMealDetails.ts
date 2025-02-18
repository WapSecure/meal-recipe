import { useQuery } from "@tanstack/react-query";
import { fetchMealDetails } from "../../api/meals/meal";

export const useMealDetails = (mealId: string) => {
  return useQuery({
    queryKey: ["mealDetails", mealId],
    queryFn: () => fetchMealDetails(mealId),
  });
};
