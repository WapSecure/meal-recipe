"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMealDetails } from "@/app/hooks/useMealDetaills/useMealDetails";
import { MealTable } from "@/app/components/MealTable/MealTable";
import LoadingSpinner from "@/app/assets/icons/components/LoadingSpinner";
import Image from "next/image";

export default function MealDetailsPage() {
  const params = useParams();
  const { id } = params as { id: string };
  const router = useRouter();

  const { data: meal, isLoading, error } = useMealDetails(id);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (isLoading)
    return (
      <div className="text-center text-black dark:text-gray-400">
        <LoadingSpinner />
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-600 dark:text-red-400">
        Error loading meal details
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <button
        onClick={() => router.push("/")}
        className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
      >
        &larr; Back to Meals
      </button>
      <div className="flex flex-col items-center justify-center mb-6">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          width={500}
          height={300}
          className="w-80 h-auto rounded-lg shadow-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-center text-black dark:text-white">
          {meal.strMeal}
        </h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 text-black dark:text-gray-300">
          Ingredients
        </h2>
        <ul className="grid grid-cols-2 gap-2">
          {Array.from({ length: 20 }).map((_, i) => {
            const ingredient = meal[`strIngredient${i + 1}`];
            return ingredient ? (
              <li
                key={i}
                className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-black dark:text-white"
              >
                {ingredient}
              </li>
            ) : null;
          })}
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-black dark:text-gray-300">
          Instructions
        </h2>
        <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-black dark:text-white">
          {meal.strInstructions}
        </p>
        <MealTable category={meal.strCategory} />
      </div>
    </div>
  );
}
