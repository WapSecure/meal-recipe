"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchMealsByCategory } from "../../api/meals/meal";

interface MealTableProps {
  category: string;
}

export const MealTable = ({ category }: MealTableProps) => {
  const { data: meals } = useQuery({
    queryKey: ["similarMeals", category],
    queryFn: () => fetchMealsByCategory(category),
  });

  const mealRows = [];
  for (let i = 0; i < meals?.length; i += 3) {
    mealRows.push(meals.slice(i, i + 3));
  }

  return (
    <table className="w-full border border-gray-300 dark:border-gray-700">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white">
          <th
            colSpan={3}
            className="p-2 border border-gray-300 dark:border-gray-700 text-center"
          >
            Similar Meal
          </th>
        </tr>
      </thead>
      <tbody>
        {mealRows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="bg-gray-50 dark:bg-gray-900 text-black dark:text-white"
          >
            {row.map((meal: any) => (
              <td
                key={meal.idMeal}
                className="p-2 border border-gray-300 dark:border-gray-700"
              >
                {meal.strMeal}
              </td>
            ))}
            {Array(3 - row.length)
              .fill(null)
              .map((_, i) => (
                <td
                  key={`empty-${rowIndex}-${i}`}
                  className="p-2 border border-gray-300 dark:border-gray-700"
                ></td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
