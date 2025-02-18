import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

export const fetchMeals = async (searchTerm: string = "") => {
  const response = await axios.get(
    `${API_BASE_URL}/search.php?s=${searchTerm}`
  );
  return response.data.meals || [];
};

export const fetchMealDetails = async (mealId: string) => {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${mealId}`);
  return response.data.meals?.[0] || null;
};

export const fetchMealsByArea = async (area: string) => {
  const response = await axios.get(`${API_BASE_URL}/filter.php?a=${area}`);
  return response.data.meals || [];
};

export const fetchMealsByCategory = async (category: string) => {
  const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
  return response.data.meals || [];
};
