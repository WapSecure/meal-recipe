import { useDispatch } from "react-redux";
import Image from "next/image";
import { addMeal } from "@/app/redux/meals/meals.slice";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/app/components/Input/Input";
import { Button } from "@/app/components/Button/Button";

const mealSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  area: z.string().min(1, "Area is required"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required"),
});

type MealFormData = z.infer<typeof mealSchema>;

export const AddMealForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
  });

  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const imageInput = watch("image");
  if (imageInput && imageInput.length > 0 && !previewImage) {
    const file = imageInput[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const onSubmit: SubmitHandler<MealFormData> = (data) => {
    const file = data.image[0];
    const reader = new FileReader();

    reader.onload = () => {
      const newMeal = {
        id: Math.random().toString(36).substr(2, 9),
        strMeal: data.name,
        strMealThumb: reader.result as string,
        strCategory: data.category,
        strArea: data.area,
      };
      dispatch(addMeal(newMeal));
      reset();
      setPreviewImage(null);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Meal Name"
        placeholder="Meal Name"
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        label="Category"
        placeholder="Category"
        {...register("category")}
        error={errors.category?.message}
      />
      <Input
        label="Area"
        placeholder="Area"
        {...register("area")}
        error={errors.area?.message}
      />
      <Input
        type="file"
        accept="image/*"
        {...register("image")}
        error={errors.image?.message}
      />
      {previewImage && (
        <div className="mt-4">
          <Image
            src={previewImage || "/placeholder.jpg"}
            alt="Meal Preview"
            width={200} 
            height={200}
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
      <Button type="submit" variant="primary">
        Add Meal
      </Button>
    </form>
  );
};
