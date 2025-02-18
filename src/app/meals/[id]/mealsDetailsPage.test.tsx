import { render, screen, waitFor } from "@testing-library/react";
import MealDetailsPage from "../[id]/page";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

jest.mock("axios");
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

const mockMeal = {
  idMeal: "1",
  strMeal: "Test Meal",
  strMealThumb: "https://example.com/test.jpg",
  strCategory: "Test Category",
  strArea: "Test Area",
  strInstructions: "Test Instructions",
  strIngredient1: "Ingredient 1",
  strIngredient2: "Ingredient 2",
};

describe("MealDetailsPage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: [mockMeal] } });
  });

  it("renders meal details correctly", async () => {
    render(<MealDetailsPage />);

    // Wait for the meal details to render
    await waitFor(() => {
      expect(screen.getByText(mockMeal.strMeal)).toBeInTheDocument();
      expect(screen.getByText(mockMeal.strCategory)).toBeInTheDocument();
      expect(screen.getByText(mockMeal.strArea)).toBeInTheDocument();
      expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
      expect(screen.getByText("Ingredient 2")).toBeInTheDocument();
      expect(screen.getByText(mockMeal.strInstructions)).toBeInTheDocument();
    });
  });

  it("displays a loading spinner while fetching data", async () => {
    (axios.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Simulate loading

    render(<MealDetailsPage />);

    expect(screen.getByRole("status")).toBeInTheDocument(); // Loading spinner
  });

  it("displays an error message when fetching fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    render(<MealDetailsPage />);

    await waitFor(() => {
      expect(screen.getByText("Error loading meal details")).toBeInTheDocument();
    });
  });
});