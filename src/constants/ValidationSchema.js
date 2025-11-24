import { z } from "zod";

export const questionnaries = z.object({
  full_name: z.string().nonempty({ message: "Full name is required" }),
  height: z.string().optional(),
  weight: z.string().optional(),
  highest_weight: z.string().optional(),
  cell_phone_number: z
    .string()
    .nonempty({ message: "Cell phone number is required" }),
  // email: z
  //   .string()
  //   .email({ message: "Please enter a valid email" })
  //   .nonempty({ message: "Email is required" }),
  age: z.string().optional(),
  favorite_cardio: z.string().optional(),
  preferred_training_location: z.string().optional(),
  injuries_description: z.string().optional(),
  home_equipment: z.string().optional(),
  favorite_foods: z.string({ required_error: "Favorite foods are required" }),
  disliked_foods: z.string({ required_error: "Disliked foods are required" }),
  strength_training_description: z.string().optional(),
  favorite_exercises: z.string().optional(),
  focused_body_areas: z.string().optional(),
  work_and_work_hours: z.string().optional(),
  descripe_weekend: z.string({
    required_error: "Weekend description is required",
  }),
  daily_nutrition: z.string().optional(),
  weekend_nutrition: z.string().optional(),
  feel_about_your_look: z.string({
    required_error: "Description of your look is required",
  }),
  favorite_recipes: z.string().optional(),
  long_term_goals: z.string().optional(),
  alcohol_consumption: z.string().optional(),
  // motivation_level: z
  //   .string()
  //   .regex(/^\d+$/, { message: "Motivation level must be a number" })
  //   .nonempty({ message: "Motivation level is required" }),
  supplements_will_use: z.string({
    required_error: "Supplements are required",
  }),
  sleep_hours: z.string().optional(),
  daily_meds: z.string({ required_error: "Daily eating routine is required" }),
  additional_notes: z.string().optional(),
  how_many_times_want_training_in_week: z.string().optional(),
});
