"use client";
import Link from "next/link";
import Image from "next/image";
import { MealCardProps } from "@/app/types";

export const MealCard = ({
  id,
  idMeal,
  strMeal,
  strMealThumb,
  strArea,
  strCategory,
}: MealCardProps) => (
  <Link href={`/meals/${id || idMeal}`}>
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {strMealThumb ? (
        <Image
          src={strMealThumb}
          alt={strMeal}
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="font-bold text-lg text-green-700">{strMeal}</h3>
        <p className="text-sm text-gray-600">
          {strCategory} | {strArea}
        </p>
      </div>
    </div>
  </Link>
);