import { renderHook, waitFor } from "@testing-library/react";
import { useMealDetails } from "./useMealDetails";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("axios");

const mockMeal = {
  idMeal: "1",
  strMeal: "Test Meal",
  strMealThumb: "https://example.com/test.jpg",
  strCategory: "Test Category",
  strArea: "Test Area",
};

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMealDetails", () => {
  it("fetches meal details", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: [mockMeal] } });

    const { result } = renderHook(() => useMealDetails("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockMeal);
    });
  });

  it("handles errors when fetching meal details", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() => useMealDetails("1"), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
  });
});