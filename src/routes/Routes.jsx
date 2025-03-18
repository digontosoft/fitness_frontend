import ActionCourseCart from "@/components/courseList/ActionCourseCart";
import ProgressCourseCart from "@/components/courseList/ProgressCourseCart";
import Main from "@/layout/Main";
import ApproveEmail from "@/pages/admin/approveemail/ApproveEmail";
import Dashboard from "@/pages/admin/dashboard/Dashboard";
import ExerciseLibrary from "@/pages/admin/exercise-library/ExerciseLibrary";
import ManageNutritionGuide from "@/pages/admin/managenutritionguides/ManageNutritionGuide";
import Trainer from "@/pages/admin/traineer/Trainer";
import AddExercise from "@/pages/admin/users/manageexercise/AddExercise";
import ManageExercise from "@/pages/admin/users/manageexercise/ManageExercise";
import Users from "@/pages/admin/users/Users";
import WorkoutProgramme from "@/pages/admin/workout-programme/WorkoutProgramme";
import Course from "@/pages/courseList/Course";
import CourseList from "@/pages/courseList/CourseList";
import GenderSelection from "@/pages/genderSelection/GenderSelection";
import Home from "@/pages/Home/Home";
import LoginPage from "@/pages/Login/LoginPage";
import Measurements from "@/pages/measurements/Measurements";
import NutritionGuides from "@/pages/nutritionGuides/NutritionGuides";
import PdfNutration from "@/pages/personalNutrationMenu/PdfNutration";
import PersonalNutrationMenu from "@/pages/personalNutrationMenu/PersonalNutrationMenu";
import RecipeBook from "@/pages/recipe/RecipeBook";
import StartTraining from "@/pages/startTraining/StartTraining";
import Supermarket from "@/pages/supermarket/Supermarket";
import WorkOutList from "@/pages/workoutList/WorkOutList";
import WorkOutListVideo from "@/pages/workoutList/WorkOutListVideo";

import { createBrowserRouter, Outlet } from "react-router-dom";
import SuperMarketTwo from "@/pages/supermarket/SuperMarketTwo";
import SideNavSupperShop from "@/pages/supermarket/SideNavSupperShop";
import MeasurementsWatch from "@/pages/measurements/MeasurementsWatch";
import MeasurementWomen from "@/pages/measurmentwomen/MeasurementWomen";
import ProtectedRoutes from "./ProtectedRoutes";
import Regulation from "@/pages/regulation/Regulation";
import NotFound from "@/components/notFound/NotFound";
import UserRoleProtectedRoutes from "./UserRoleProtectedRoutes";
import ExerciseList from "@/pages/admin/exerciselist/ExerciseList";
import WorkoutList from "@/pages/admin/workout-programme/WorkoutList";
import EditWorkout from "@/components/admin/components/workout-programms/EditWorkout";
import TriningProgram from "@/components/admin/components/Training/TriningProgram";
import TrainingLists from "@/components/admin/components/Training/TrainingLists";
import EditTraining from "@/components/admin/components/Training/EditTraining";
import GlobalLoading from "@/components/common/GlobalLoading";
import AddNutrition from "@/pages/admin/managenutritionguides/AddNutrition";
import NutritionLists from "@/pages/admin/managenutritionguides/NutritionLists";
import EditNutrition from "@/pages/admin/managenutritionguides/EditNutrition";
import NutritionDetails from "@/pages/admin/managenutritionguides/NutritionDetails";
import ThankYou from "@/pages/thankyou/Thankyou";
import AssignTrainingList from "@/pages/admin/assigntraining/AssignTrainingList";
import EditTraineUser from "@/components/admin/components/Training/EditTraineUser";
import AssignTraining from "@/pages/admin/assigntraining/AssignTraining";
import TraineeUsers from "@/pages/admin/traineeusers/TraineeUsers";
import Complete from "@/pages/Home/mesurementForm/Complete";
import UpdateMesurement from "@/pages/Home/mesurementForm/UpdateMesurement";
import MesurementPdf from "@/components/measurements/measurementWatch/MesurementPdf";

export const routes = createBrowserRouter([
  {
    element: (
      <ProtectedRoutes>
        <Main />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: (
          <UserRoleProtectedRoutes allowedRoles={["trainee"]}>
            <Outlet />
          </UserRoleProtectedRoutes>
        ),
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/measurements",
            element: <Measurements />,
          },
          {
            path: "/mesurement-complete",
            element: <Complete />,
          },
          {
            path: "/mesurement-update",
            element: <UpdateMesurement />,
          },
          {
            path: "/measurement-watch",
            element: <MeasurementsWatch />,
          },
          {
            path: "/measurement-women",
            element: <MeasurementWomen />,
          },
          {
            path: "/mesurement-pdf",
            element: <MesurementPdf />,
          },
          {
            path: "/nutrition-guide",
            element: <NutritionGuides />,
          },
          {
            path: "/personal-nutration",
            element: <PersonalNutrationMenu />,
          },
          {
            path: "/nutration-pdf/:id",
            element: <PdfNutration />,
          },
          {
            path: "/trainings",
            element: <WorkOutList />,
          },
          {
            path: "/exercise-library",
            element: <CourseList />,
          },

          {
            path: "/startTraining",
            element: <StartTraining />,
          },
          {
            path: "/worklistVideo",
            element: <WorkOutListVideo />,
          },
          {
            path: "/action-course-cart/:id",
            element: <ActionCourseCart />,
          },

          {
            path: "/personal-workout/:id",
            element: <ProgressCourseCart />,
          },

          {
            path: "/superTwo",
            element: <SuperMarketTwo />,
          },
          {
            path: "/super-side-nav",
            element: <SideNavSupperShop />,
          },
          {
            path: "/regulation",
            element: <Regulation />,
          },
        ],
      },

      {
        path: "/dashboard",
        element: (
          <UserRoleProtectedRoutes allowedRoles={["admin"]}>
            <Outlet />
          </UserRoleProtectedRoutes>
        ),
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          // {
          //   path: "/dashboard/mesurements/:id",
          //   element: <Measurements />,
          // },
          {
            path: "/dashboard/users",
            element: <Users />,
          },
          {
            path: "/dashboard/manage-exercise",
            element: <ManageExercise />,
          },
          {
            path: "/dashboard/add-exercise",
            element: <AddExercise />,
          },
          {
            path: "/dashboard/manage-nutrition-guides",
            element: <ManageNutritionGuide />,
          },
          {
            path: "/dashboard/add-nutrition-guide",
            element: <AddNutrition />,
          },
          {
            path: "/dashboard/add-nutrition-menu/:id",
            element: <AddNutrition />,
          },
          {
            path: "/dashboard/nutrition-lists",
            element: <NutritionLists />,
          },
          {
            path: "/dashboard/edit-nutrition/:id",
            element: <EditNutrition />,
          },
          {
            path: "/dashboard/mesurements-watch",
            element: <MeasurementsWatch />,
          },
          {
            path: "/dashboard/nutrition-details/:id",
            element: <NutritionDetails />,
          },
          {
            path: "/dashboard/approve-email",
            element: <ApproveEmail />,
          },
          {
            path: "/dashboard/exercise-list",
            element: <ExerciseList />,
          },
          {
            path: "/dashboard/edit-exercise/:id",
            element: <ExerciseLibrary />,
          },
          {
            path: "/dashboard/workout-programme",
            element: <WorkoutProgramme />,
          },
          {
            path: "/dashboard/workout-list",
            element: <WorkoutList />,
          },
          // {
          //   path: "/dashboard/workout-programme/:id",
          //   element: <WorkoutProgramms />,
          // },
          {
            path: "/dashboard/edit-workout/:id",
            element: <EditWorkout />,
          },
          {
            path: "/dashboard/add-training-program",
            element: <TriningProgram />,
          },
          {
            path: "/dashboard/exercise-library",
            element: <ExerciseLibrary />,
          },
          {
            path: "/dashboard/traineer",
            element: <Trainer />,
          },
          {
            path: "/dashboard/traineer/:id",
            element: <Trainer />,
          },
          {
            path: "/dashboard/trainee-users-list",
            element: <TraineeUsers />,
          },
          {
            path: "/dashboard/training-list",
            element: <TrainingLists />,
          },
          {
            path: "/dashboard/assigned-training-list/:id",
            element: <AssignTrainingList />,
          },
          {
            path: "/dashboard/assign-training/:userId",
            element: <AssignTraining />,
          },
          {
            path: "/dashboard/edit-training/:id",
            element: <EditTraining />,
          },
          {
            path: "/dashboard/edit-training/:trainingId/:userId",
            element: <EditTraineUser />,
          },
        ],
      },
    ],
  },
  {
    element: (
      <ProtectedRoutes>
        {" "}
        <Main />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/recipe",
        element: <RecipeBook />,
      },
      {
        path: "/courses",
        element: <Course />,
      },
      {
        path: "/supermarket/:id",
        element: <Supermarket />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/gender",
    element: <GenderSelection />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/loading",
    element: <GlobalLoading />,
  },
  {
    path: "/thankyou",
    element: <ThankYou />,
  },
]);
