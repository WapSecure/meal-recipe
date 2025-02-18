import { useQuery } from "@tanstack/react-query";
import { fetchMeals, fetchMealsByArea } from "../../api/meals/meal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const useMeals = (searchTerm: string = "", area: string = "") => {
  const localMeals = useSelector((state: RootState) => state.meals.localMeals);

  const {
    data: apiMeals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meals", searchTerm, area],
    queryFn: () => (area ? fetchMealsByArea(area) : fetchMeals(searchTerm)),
  });

  const normalizedApiMeals = apiMeals?.map((meal: any) => ({
    ...meal,
    strCategory: meal.strCategory || "N/A",
    strArea: meal.strArea || area || "N/A",
  }));

  const meals = [...localMeals, ...(normalizedApiMeals || [])];

  return { data: meals, isLoading, error };
};
