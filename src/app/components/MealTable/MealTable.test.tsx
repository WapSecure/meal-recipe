import { render, screen, waitFor } from "@testing-library/react";
import { MealTable } from "./MealTable";
import axios from "axios";

jest.mock("axios");

const mockMeals = [
  { idMeal: "1", strMeal: "Meal 1" },
  { idMeal: "2", strMeal: "Meal 2" },
  { idMeal: "3", strMeal: "Meal 3" },
];

describe("MealTable", () => {
  it("renders similar meals in a table", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: mockMeals } });

    render(<MealTable category="Test Category" />);

    await waitFor(() => {
      expect(screen.getByText("Similar Meal")).toBeInTheDocument();
      expect(screen.getByText("Meal 1")).toBeInTheDocument();
      expect(screen.getByText("Meal 2")).toBeInTheDocument();
      expect(screen.getByText("Meal 3")).toBeInTheDocument();
    });
  });

  it("displays an empty table when no meals are found", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: [] } });

    render(<MealTable category="Test Category" />);

    await waitFor(() => {
      expect(screen.getByText("Similar Meal")).toBeInTheDocument();
      expect(screen.queryByText("Meal 1")).not.toBeInTheDocument();
    });
  });
});
