import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meal {
  id: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

interface MealsState {
  localMeals: Meal[];
}

const initialState: MealsState = {
  localMeals: [],
};

const mealsSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    addMeal: (state, action: PayloadAction<Meal>) => {
      state.localMeals.push(action.payload);
    },
  },
});

export const { addMeal } = mealsSlice.actions;
export default mealsSlice.reducer; 
