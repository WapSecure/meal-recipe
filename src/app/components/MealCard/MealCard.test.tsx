import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MealCard } from "./MealCard";

describe("MealCard", () => {
  const mockMeal = {
    idMeal: "1",
    strMeal: "Test Meal",
    strMealThumb: "https://example.com/test.jpg",
    strCategory: "Test Category",
    strArea: "Test Area",
  };

  it("renders meal details correctly", () => {
    render(<MealCard {...mockMeal} />);

    expect(screen.getByText(mockMeal.strMeal)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockMeal.strCategory} | ${mockMeal.strArea}`)
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      mockMeal.strMealThumb
    );
  });
});
