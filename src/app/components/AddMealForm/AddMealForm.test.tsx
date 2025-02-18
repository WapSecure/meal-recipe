import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AddMealForm } from "./AddMealForm";
import { useDispatch } from "react-redux";

jest.mock("react-redux");

describe("AddMealForm", () => {
  const mockDispatch = jest.fn();
  (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

  it("validates and submits the form", async () => {
    render(<AddMealForm />);

    const mealNameInput = screen.getByPlaceholderText("Meal Name");
    const categoryInput = screen.getByPlaceholderText("Category");
    const areaInput = screen.getByPlaceholderText("Area");
    const fileInput = screen.getByLabelText("Image");
    const submitButton = screen.getByText("Add Meal");

    fireEvent.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Category is required")).toBeInTheDocument();
    expect(await screen.findByText("Area is required")).toBeInTheDocument();
    expect(await screen.findByText("Image is required")).toBeInTheDocument();

    fireEvent.change(mealNameInput, { target: { value: "Test Meal" } });
    fireEvent.change(categoryInput, { target: { value: "Test Category" } });
    fireEvent.change(areaInput, { target: { value: "Test Area" } });
    fireEvent.change(fileInput, {
      target: {
        files: [new File([""], "test.jpg", { type: "image/jpeg" })],
      },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});