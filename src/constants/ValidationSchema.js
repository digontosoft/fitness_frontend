import { z } from "zod";

// User-facing validation messages (Hebrew)
// PDF: only Section 1 (name, email, phone) required; rest optional
export const questionnaries = z.object({
  full_name: z.string().nonempty({ message: "נדרש שם מלא" }),
  email: z
    .string()
    .nonempty({ message: "נדרש דואר אלקטרוני" })
    .email({ message: "הזן כתובת דואר אלקטרוני תקינה" }),
  cell_phone_number: z.string().nonempty({ message: "נדרש מספר נייד" }),
  age: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  highest_weight: z.string().optional(),
  // medications (existing field name kept)
  daily_nutrition: z.string().optional(),
  work_and_work_hours: z.string().optional(),
  favorite_foods: z.string().optional(),
  disliked_foods: z.string().optional(),
  // vegetarian / vegan / allergies (reuse unused schema field)
  weekend_nutrition: z.string().optional(),
  // full day eating
  daily_meds: z.string().optional(),
  descripe_weekend: z.string().optional(),
  // restaurants (reuse home_equipment — equipment Q removed from PDF)
  home_equipment: z.string().optional(),
  favorite_recipes: z.string().optional(),
  alcohol_consumption: z.string().optional(),
  long_term_goals: z.string().optional(),
  feel_about_your_look: z.string().optional(),
  additional_notes: z.string().optional(),
  how_many_times_want_training_in_week: z.string().optional(),
  training_times_per_week: z.string().optional(),
  preferred_training_location: z.string().optional(),
  injuries_description: z.string().optional(),
  strength_training_description: z.string().optional(),
  favorite_exercises: z.string().optional(),
  focused_body_areas: z.string().optional(),
  favorite_cardio: z.string().optional(),
  // kept optional for backward compatibility (not in new PDF)
  sleep_hours: z.string().optional(),
  motivation_level: z.string().optional(),
  supplements_will_use: z.string().optional(),
});
