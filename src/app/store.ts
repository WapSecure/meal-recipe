import { configureStore } from "@reduxjs/toolkit";
import mealsReducer from "@/app/redux/meals/meals.slice";

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;