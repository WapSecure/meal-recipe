"use client";
import Link from "next/link";

interface MealCardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
}

export const MealCard = ({
  idMeal,
  strMeal,
  strMealThumb,
  strArea,
  strCategory,
}: MealCardProps) => (
  <Link href={`/meals/${idMeal}`}>
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img
        src={strMealThumb}
        alt={strMeal}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-green-700">{strMeal}</h3>
        <p className="text-sm text-gray-600">
          {strCategory} | {strArea}
        </p>
      </div>
    </div>
  </Link>
);
