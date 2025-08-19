import {
  course,
  exercise,
  measurement,
  nutrationGuide,
  persomalNutration,
  recipe,
  training,
} from "../assets/index";
export const traineeLink = [
  {
    _id: 1,
    title: "קורסים",
    link: "/courses",
    icon: course,
  },
  {
    _id: 2,
    title: "מאגר תרגילים",
    link: "/exercise-library",
    icon: exercise,
  },
  {
    _id: 3,
    title: "האימונים שלי",
    link: "/trainings",
    icon: training,
  },
  {
    _id: 4,
    title: "מתכונים של פיטל",
    link: "/recipe",
    icon: recipe,
  },
  {
    _id: 5,
    title: "מדריכי תזונה",
    link: "/nutrition-guide",
    icon: nutrationGuide,
  },
  {
    _id: 6,
    title: "התפריט שלי",
    link: "/personal-nutration",
    icon: persomalNutration,
  },
  {
    _id: 7,
    title: "המדדים שלי",
    link: "/measurements-tracking",
    icon: measurement,
  },
  // {
  //   _id: 8,
  //   title: "דף הבית",
  //   link: "/",
  //   icon: nutrationGuide,
  // },
];
export const supperAdminLink = [
  {
    _id: 1,
    title: "נהל תרגילים",
    link: "/dashboard/exercise-list",
    icon: nutrationGuide,
  },
  {
    _id: 2,
    title: "נהל אימונים",
    link: "/dashboard/workout-list",
    icon: nutrationGuide,
  },
  {
    _id: 3,
    title: "נהל תוכניות אימון",
    link: "dashboard/training-list",
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
    title: "ניהול מדריכי תזונה",
    link: "dashboard/nutrition-lists",
    icon: nutrationGuide,
  },
  {
    _id: 6,
    title: "ניהול מתאמנים קיימים",
    link: "dashboard/trainee-users-list",
    icon: nutrationGuide,
  },
  {
    _id: 7,
    title: "ניהול ספר מתכונים",
    link: "/dashboard/manage-recipe-book",
    icon: nutrationGuide,
  },
   {
     _id: 8,
    title: "רשימת מנהלים",
    link: "/dashboard/admin-list",
    icon: nutrationGuide,
  },
  {
    _id: 9,
    title: "דף הבית",
    link: "/dashboard",
    icon: nutrationGuide,
  },
 
];
export const adminLink = [
  // {
  //   _id: 1,
  //   title: "נהל תרגילים",
  //   link: "/dashboard/exercise-list",
  //   icon: nutrationGuide,
  // },
  // {
  //   _id: 2,
  //   title: "נהל אימונים",
  //   link: "/dashboard/workout-list",
  //   icon: nutrationGuide,
  // },
  // {
  //   _id: 3,
  //   title: "נהל תוכניות אימון",
  //   link: "dashboard/training-list",
  //   icon: nutrationGuide,
  // },
  // {
  //   _id: 5,
  //   title: "ניהול מדריכי תזונה",
  //   link: "dashboard/nutrition-lists",
  //   icon: nutrationGuide,
  // },

  {
    _id: 1,
    title: "אישור מתאמנים חדשים",
    link: "/admin-dashboard/approve-email",
    icon: nutrationGuide,
  },
  {
    _id: 2,
    title: "ניהול מתאמנים קיימים",
    link: "/admin-dashboard/trainee-users-list",
    icon: nutrationGuide,
  },
  {
    _id: 3,
    title: "דף הבית",
    link: "/admin-dashboard",
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
