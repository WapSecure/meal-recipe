"use client";

import { useEffect, useState } from "react";
import { useMeals } from "@/app/hooks/useMeals/useMeals";
import { MealCard } from "@/app/components/MealCard/MealCard";
import { FilterDropdown } from "@/app/components/FilterDropdown/FilterDropdown";
import { AddMealModal } from "@/app/components/AddMealModal/AddMealModal";
import LoadingSpinner from "./assets/icons/components/LoadingSpinner";
import { Moon, Sun } from "lucide-react";
import { useDebounce } from "@/app/hooks/useDebounce/useDebounce";
import {
  DEFAULT_ERROR_MESSAGE,
  MEALS_PER_PAGE,
  PAGE_DESCRIPTION,
  PAGE_TITLE,
} from "./utils/constants";
import { Input } from "@/app/components/Input/Input";
import { Button } from "@/app/components/Button/Button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const [selectedArea, setSelectedArea] = useState("");
  const {
    data: meals,
    isLoading,
    error,
  } = useMeals(debouncedSearchTerm, selectedArea);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return typeof window !== "undefined"
      ? localStorage.getItem("theme") === "dark"
      : false;
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, selectedArea]);

  const mealsPerPage = MEALS_PER_PAGE;
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals?.slice(indexOfFirstMeal, indexOfLastMeal) || [];

  const totalPages = Math.ceil((meals?.length || 0) / mealsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <header className="w-full p-4">
        <div className="flex items-center justify-between">
          <div className="flex-col mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
              {PAGE_TITLE}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {PAGE_DESCRIPTION}
            </p>
          </div>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg -mt-8"
          >
            {darkMode ? (
              <Sun size={24} className="text-yellow-500" />
            ) : (
              <Moon size={24} className="text-blue-500" />
            )}
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
          <Input
            type="text"
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-4/5"
          />
          <FilterDropdown
            onSelect={(area) => setSelectedArea(area)}
            className="w-full sm:w-1/10"
          />
          <AddMealModal className="w-full sm:w-1/10" />
        </div>

        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-400">
            <LoadingSpinner />
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 dark:text-red-400">
            {DEFAULT_ERROR_MESSAGE}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentMeals.map((meal: any, index: number) => (
            <MealCard key={meal.idMeal || `meal-${index}`} {...meal} />
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
                variant={currentPage === page ? "primary" : "secondary"}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
