import {
  training,
  course,
  exercise,
  recipe,
  nutrationGuide,
  persomalNutration,
  measurement,
} from "../assets/index";
export const traineeLink = [
  {
    _id: 1,
    title: "דף הבית",
    link: "/",
    icon: nutrationGuide,
  },
  {
    _id: 2,
    title: "המדדים שלי",
    link: "/measurements-tracking",
    icon: measurement,
  },
  {
    _id: 3,
    title: "התפריט שלי",
    link: "/personal-nutration",
    icon: persomalNutration,
  },
  {
    _id: 4,
    title: "מדריך תזונה",
    link: "/nutrition-guide",
    icon: nutrationGuide,
  },
  {
    _id: 5,
    title: "מתכונים של פיטל",
    link: "/recipe",
    icon: recipe,
  },
  {
    _id: 6,
    title: "האימונים שלי",
    link: "/trainings",
    icon: training,
  },
  {
    _id: 7,
    title: "מאגר תרגילים",
    link: "/exercise-library",
    icon: exercise,
  },
  {
    _id: 8,
    title: "קורסים",
    link: "/courses",
    icon: course,
  },
];
export const adminLink = [
  {
    _id: 1,
    title: "דף הבית",
    link: "/dashboard",
    icon: nutrationGuide,
  },
  {
    _id: 2,
    title: "ניהול מתאמנים קיימים",
    link: "dashboard/trainee-users-list",
    icon: nutrationGuide,
  },
  {
    _id: 3,
    title: "ניהול מדריכי תזונה",
    link: "dashboard/nutrition-lists",
    icon: nutrationGuide,
  },
  {
    _id: 4,
    title: "אישור מתאמנים חדשים",
    link: "/dashboard/approve-email",
    icon: nutrationGuide,
  },
  {
    _id: 5,
    title: "נהל תוכניות אימון",
    link: "dashboard/training-list",
    icon: nutrationGuide,
  },

  {
    _id: 6,
    title: "נהל אימונים",
    link: "/dashboard/workout-list",
    icon: nutrationGuide,
  },

  {
    _id: 7,
    title: "נהל תרגילים",
    link: "/dashboard/exercise-list",
    icon: nutrationGuide,
  },
];
export const recipeLink = [
  {
    _id: 1,
    title: "מתכונים",
    link: "/recipe",
    icon: recipe,
  },
  {
    _id: 2,
    title: "קורסים",
    link: "/courses",
    icon: course,
  },
];
