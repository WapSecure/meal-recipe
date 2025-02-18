import { useState } from "react";
import { AddMealForm } from "@/app/components/AddMealForm/AddMealForm";

interface AddMealModalProps {
  className?: string;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Add Meal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Add a New Meal
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                &times;
              </button>
            </div>
            <AddMealForm />
          </div>
        </div>
      )}
    </div>
  );
};
