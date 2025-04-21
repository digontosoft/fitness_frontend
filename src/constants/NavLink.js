import {
  Measurement,
  ReceipeUser,
  NutrationGuide,
  Trainings,
  Course,
} from "../assets/index";
export const traineeLink = [
  {
    _id: 1,
    title: "דף הבית",
    link: "/",
    icon: NutrationGuide,
  },
  {
    _id: 2,
    title: "המדדים שלי",
    link: "/measurements-tracking",
    icon: Measurement,
  },
  {
    _id: 3,
    title: "התפריט שלי",
    link: "/personal-nutration",
    icon: NutrationGuide,
  },
  {
    _id: 4,
    title: "מדריך תזונה",
    link: "/nutrition-guide",
    icon: NutrationGuide,
  },
  {
    _id: 5,
    title: "מתכונים של פיטל",
    link: "/recipe",
    icon: ReceipeUser,
  },
  {
    _id: 6,
    title: "האימונים שלי",
    link: "/trainings",
    icon: Trainings,
  },
  {
    _id: 7,
    title: "מאגר תרגילים",
    link: "/exercise-library",
    icon: Course,
  },
  {
    _id: 8,
    title: "קורסים",
    link: "/courses",
    icon: Course,
  },
  // {
  //   _id:8,
  //   title:"יומן אוכל",
  //   link:'/food-dairy',
  //   icon:'NutrationGuide',
  // }
];
export const adminLink = [
  {
    _id: 1,
    title: "דף הבית",
    link: "/dashboard",
    icon: NutrationGuide,
  },
  {
    _id: 2,
    title: "ניהול מתאמנים קיימים",
    link: "dashboard/trainee-users-list",
    icon: NutrationGuide,
  },
  {
    _id: 3,
    title: "ניהול מדריכי תזונה",
    link: "dashboard/nutrition-lists",
    icon: NutrationGuide,
  },
  {
    _id: 4,
    title: "אישור מתאמנים חדשים",
    link: "/dashboard/approve-email",
    icon: NutrationGuide,
  },
  {
    _id: 5,
    title: "נהל תוכניות אימון",
    link: "dashboard/training-list",
    icon: NutrationGuide,
  },

  {
    _id: 6,
    title: "נהל אימונים",
    link: "/dashboard/workout-list",
    icon: NutrationGuide,
  },

  {
    _id: 7,
    title: "נהל תרגילים",
    link: "/dashboard/exercise-list",
    icon: NutrationGuide,
  },
  // {
  //   _id: 2,
  //   title: "Workout Programm",
  //   link: "/dashboard/workout-programme",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 3,
  //   title: "Workout List",
  //   link: "/dashboard/workout-list",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 4,
  //   title: "Exercise Library",
  //   link: "/dashboard/exercise-library",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 5,
  //   title: "Exercise List",
  //   link: "/dashboard/exercise-list",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 6,
  //   title: "Trainer",
  //   link: "/dashboard/traineer",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 7,
  //   title: "Measurement Women",
  //   link: "/measurement-women",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 8,
  //   title: "Training Programm",
  //   link: "/dashboard/add-training-program",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 9,
  //   title: "Training List",
  //   link: "/dashboard/training-list",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 10,
  //   title: "Add Nutrition Guide",
  //   link: "/dashboard/add-nutrition-guide",
  //   icon: NutrationGuide,
  // },
  // {
  //   _id: 11,
  //   title: "Nutrition List",
  //   link: "/dashboard/nutrition-lists",
  //   icon: NutrationGuide,
  // },

  // {
  //   _id: 2,
  //   title: "מתכונים",
  //   link: "/dashboard/recipe",
  //   icon: ReceipeUser,
  // },
  // {
  //   _id: 3,
  //   title: "קורסים",
  //   link: "/dashboard/courses",
  //   icon: Course,
  // },
];
export const recipeLink = [
  {
    _id: 1,
    title: "מתכונים",
    link: "/recipe",
    icon: ReceipeUser,
  },
  {
    _id: 2,
    title: "קורסים",
    link: "/courses",
    icon: Course,
  },
];
