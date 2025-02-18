import axios from "axios";
import {
  fetchMeals,
  fetchMealDetails,
  fetchMealsByArea,
  fetchMealsByCategory,
} from "./meal";

jest.mock("axios");

describe("meal API", () => {
  const mockMeals = [{ idMeal: "1", strMeal: "Test Meal" }];
  const mockMeal = { idMeal: "1", strMeal: "Test Meal" };

  it("fetches meals by search term", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: mockMeals } });

    const result = await fetchMeals("Test");
    expect(result).toEqual(mockMeals);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("search.php?s=Test")
    );
  });

  it("fetches meal details by ID", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: [mockMeal] } });

    const result = await fetchMealDetails("1");
    expect(result).toEqual(mockMeal);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("lookup.php?i=1")
    );
  });

  it("fetches meals by area", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: mockMeals } });

    const result = await fetchMealsByArea("Test Area");
    expect(result).toEqual(mockMeals);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("filter.php?a=Test Area")
    );
  });

  it("fetches meals by category", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: mockMeals } });

    const result = await fetchMealsByCategory("Test Category");
    expect(result).toEqual(mockMeals);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("filter.php?c=Test Category")
    );
  });
});