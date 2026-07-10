// Shared Hebrew UI copy. English keys/comments kept for future maintenance.

export const UI_TEXT = {
  // Common actions
  cancel: "ביטול",
  delete: "מחק",
  deleting: "מוחק...",
  save: "שמור",
  saving: "שומר...",
  submit: "שלח",
  close: "סגור",
  continue: "המשך",
  activate: "הפעל",
  admin: "מנהל",

  // Common states
  loading: "טוען...",
  noResults: "אין תוצאות.",
  noResultsFound: "לא נמצאו תוצאות.",
  noDataFound: "לא נמצאו נתונים",

  // Delete dialogs
  confirmDeletion: "אישור מחיקה",
  confirmDelete: "אישור מחיקה",
  confirmDeletionUser: "האם אתה בטוח שברצונך למחוק משתמש זה?",
  confirmDeletionExercise: "האם אתה בטוח שברצונך למחוק תרגיל זה?",
  confirmDeletionTraining: "האם אתה בטוח שברצונך למחוק אימון זה?",
  confirmDeletionNutrition: "האם אתה בטוח שברצונך למחוק מדריך תזונה זה?",
  confirmDeletionAdmin: (name) => `האם אתה בטוח שברצונך למחוק את ${name}?`,
  confirmDeleteTaskTitle: "האם אתה בטוח לחלוטין?",
  confirmDeleteTaskBody:
    "פעולה זו אינה ניתנת לביטול. המשימה תימחק לצמיתות.",

  // Navigation
  backToDashboard: "חזרה ללוח הבקרה",
  backToHome: "חזרה לדף הבית",
  pageNotFound: "הדף לא נמצא",

  // Validation
  emailRequired: "נדרש דואר אלקטרוני",
  validEmailRequired: "הזן כתובת דואר אלקטרוני תקינה",
  roleRequired: "נדרש תפקיד",
  expiryDateRequired: "נדרש תאריך תפוגה",
  nameRequired: "נדרש שם",
  descriptionRequired: "נדרש תיאור",
  titleRequired: "נדרשת כותרת",
  taskTypeRequired: "נדרש סוג משימה",
  minTenChars: "נדרשים לפחות 10 תווים",
  fieldRequired: "שדה זה חובה",

  // Generic errors/success
  somethingWentWrong: "משהו השתבש",
  somethingWentWrongLater: "משהו השתבש, נסה שוב מאוחר יותר.",
  loadUsersFailed: "טעינת המשתמשים נכשלה",
  deleteFailed: "המחיקה נכשלה",
  updateFailed: "העדכון נכשל",
  invalidUserType: "לא נמצא סוג משתמש או אסימון תקף.",

  // Workout / training
  workoutCompleted: "האימון הושלם בהצלחה!",
  workoutCompleteFailed: "סיום האימון נכשל",
  completeAtLeastOneExercise: "נא להשלים לפחות תרגיל אחד",
  missingWorkoutInfo: "חסרים פרטי אימון נדרשים. לא ניתן לסיים את האימון.",
  workoutAlreadyAdded: "האימון כבר נוסף!",
  trainingSaved: "מפגש האימון נשמר בהצלחה!",
  trainingSaveFailed: "שמירת מפגש האימון נכשלה.",
  trainingUpdated: "מפגש האימון עודכן בהצלחה!",
  trainingUpdateFailed: "עדכון מפגש האימון נכשל.",
  workoutCreated: "האימון נוצר בהצלחה",
  workoutCreateFailed: "יצירת האימון נכשלה",
  workoutUpdated: "האימון עודכן בהצלחה",
  workoutUpdateFailed: "עדכון האימון נכשל",
  noExercisesAvailable: "אין תרגילים זמינים.",
  noWorkoutsAvailable: "אין אימונים זמינים.",

  // Measurement
  measurementUpdated: "המדידה עודכנה בהצלחה!",
  measurementUpdateFailed: "שגיאה בעדכון המדידה. נסה שוב.",
  measurementTaskComplete: "משימת המדידה הושלמה בהצלחה!",
  loadingMeasurementData: "טוען נתוני מדידה...",
  maxFourImages: "ניתן להעלות עד 4 תמונות בלבד.",
  invalidImageOrPdf: "סוג קובץ לא תקין. נא להעלות תמונה או PDF.",
  invalidImage: "סוג קובץ לא תקין. נא להעלות תמונה.",

  // Tasks
  taskAdded: "המשימה נוספה בהצלחה!",
  taskUpdated: "המשימה עודכנה בהצלחה!",
  taskDeleted: "המשימה נמחקה בהצלחה!",
  createTask: "צור משימה",
  validStepCount: "נא להזין מספר צעדים תקין.",
  submitStepsFailed: "שליחת הצעדים נכשלה.",

  // Approved mail
  approvedMailAdded: "מייל מאושר נוסף בהצלחה",

  // Delete API toasts
  emailDeleted: "הדואר האלקטרוני נמחק בהצלחה.",
  emailDeleteFailed: "מחיקת הדואר האלקטרוני נכשלה.",
  exerciseDeleted: "התרגיל נמחק בהצלחה.",
  exerciseDeleteFailed: "מחיקת התרגיל נכשלה.",
  userDeleted: "המשתמש נמחק בהצלחה.",
  userDeleteFailed: "מחיקת המשתמש נכשלה.",
  workoutDeleted: "האימון נמחק בהצלחה.",
  workoutDeleteFailed: "מחיקת האימון נכשלה.",
  trainingDeleted: "תוכנית האימון נמחקה בהצלחה.",
  trainingDeleteFailed: "מחיקת תוכנית האימון נכשלה.",
  nutritionGuideDeleted: "מדריך התזונה נמחק בהצלחה.",
  nutritionGuideDeleteFailed: "מחיקת מדריך התזונה נכשלה.",

  // Admin form labels
  editAdmin: "עריכת מנהל",
  firstName: "שם פרטי",
  lastName: "שם משפחה",
  fullName: "שם מלא",
  email: "דואר אלקטרוני",
  role: "תפקיד",
  gender: "מגדר",
  selectGender: "בחר מגדר",
  male: "זכר",
  female: "נקבה",
  superAdmin: "מנהל על",
  addExercise: "הוסף תרגיל",
  name: "שם",
  area: "אזור",
  equipment: "ציוד",
  description: "תיאור",
  selectEquipment: "בחר ציוד",
  uploadFileHint: "לחץ כאן להעלאת הקובץ",
  userSearch: "חיפוש משתמש",
  removeExercise: "הסר תרגיל",
  youtubePlayer: "נגן וידאו YouTube",
  searchPlaceholder: "חיפוש...",
  pdfFile: "קובץ PDF",
};
