import { useQuery } from "@tanstack/react-query";
import { fetchMeals, fetchMealsByArea } from "@/app/api/meals/meal";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Meal } from "@/app/types";

export const useMeals = (searchTerm: string = "", area: string = "") => {
  const localMeals = useSelector((state: RootState) => state.meals.localMeals);

  const {
    data: apiMeals,
    isLoading,
    error,
  } = useQuery<Meal[]>({
    queryKey: ["meals", searchTerm, area],
    queryFn: () => (area ? fetchMealsByArea(area) : fetchMeals(searchTerm)),
  });

  const normalizedApiMeals = apiMeals?.map((meal) => ({
    id: meal.idMeal, 
    idMeal: meal.idMeal, 
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory || "N/A",
    strArea: meal.strArea || area || "N/A",
  }));

  const meals = [...localMeals, ...(normalizedApiMeals || [])];

  return { data: meals, isLoading, error };
};