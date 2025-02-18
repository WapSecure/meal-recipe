import { renderHook, waitFor } from "@testing-library/react";
import { useMeals } from "./useMeals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "@/app/redux/meals/meals.slice";
import axios from "axios";

jest.mock("axios");

const mockApiMeals = [
  { idMeal: "1", strMeal: "API Meal", strMealThumb: "https://example.com/api.jpg", strCategory: "API Category", strArea: "API Area" },
];

const mockLocalMeals = [
  { id: "2", strMeal: "Local Meal", strMealThumb: "https://example.com/local.jpg", strCategory: "Local Category", strArea: "Local Area" },
];

const store = configureStore({
  reducer: {
    meals: mealsReducer,
  },
  preloadedState: {
    meals: {
      localMeals: mockLocalMeals,
    },
  },
});

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
);

describe("useMeals", () => {
  it("combines API and local meals", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: { meals: mockApiMeals } });

    const { result } = renderHook(() => useMeals("", ""), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual([...mockLocalMeals, ...mockApiMeals]);
    });
  });
});