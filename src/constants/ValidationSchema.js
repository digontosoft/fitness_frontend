import { z } from "zod";

// User-facing validation messages (Hebrew)
export const questionnaries = z.object({
  full_name: z.string().nonempty({ message: "נדרש שם מלא" }),
  height: z.string().optional(),
  weight: z.string().optional(),
  highest_weight: z.string().optional(),
  cell_phone_number: z
    .string()
    .nonempty({ message: "נדרש מספר נייד" }),
  // email: z
  //   .string()
  //   .email({ message: "הזן כתובת דואר אלקטרוני תקינה" })
  //   .nonempty({ message: "נדרש דואר אלקטרוני" }),
  age: z.string().optional(),
  favorite_cardio: z.string().optional(),
  preferred_training_location: z.string().optional(),
  injuries_description: z.string().optional(),
  home_equipment: z.string().optional(),
  favorite_foods: z.string({ required_error: "נדרשים מאכלים אהובים" }),
  disliked_foods: z.string({ required_error: "נדרשים מאכלים שלא אוהבים" }),
  strength_training_description: z.string().optional(),
  favorite_exercises: z.string().optional(),
  focused_body_areas: z.string().optional(),
  work_and_work_hours: z.string().optional(),
  descripe_weekend: z.string({
    required_error: "נדרש תיאור סוף השבוע",
  }),
  daily_nutrition: z.string().optional(),
  weekend_nutrition: z.string().optional(),
  feel_about_your_look: z.string({
    required_error: "נדרש תיאור המראה שלך",
  }),
  favorite_recipes: z.string().optional(),
  long_term_goals: z.string().optional(),
  alcohol_consumption: z.string().optional(),
  // motivation_level: z
  //   .string()
  //   .regex(/^\d+$/, { message: "רמת המוטיבציה חייבת להיות מספר" })
  //   .nonempty({ message: "נדרשת רמת מוטיבציה" }),
  supplements_will_use: z.string({
    required_error: "נדרש מידע על תוספים",
  }),
  sleep_hours: z.string().optional(),
  daily_meds: z.string({ required_error: "נדרש תיאור שגרת האכילה היומית" }),
  additional_notes: z.string().optional(),
  how_many_times_want_training_in_week: z.string().optional(),
});
