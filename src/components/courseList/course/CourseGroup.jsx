import React, { useEffect, useState } from "react";
import { courseOne, courseTwo, courseThree, courseFour } from "@/assets";
import CourseCart from "./CourseCart";
import axios from "axios";
import { base_url } from "@/api/baseUrl";

const courseData = [
  {
    _id: 1,
    image: courseThree,
    courseTitle: "חכם בסופר",
    courseParagraph:
      "קורס קצר וקליל שיתן לכם כלים סופר חשובים להתנהלות נכונה בסופר ימקד אתכם לקנייה חכמה וצריכת חלבון גבוהה יותר.",
    paid: false,
  },
  {
    _id: 2,
    image: courseTwo,
    courseTitle: "חכם במטבח",
    courseParagraph:
      "קורס קצר וקליל שיתן לכם כלים סופר חשובים להתנהלות נכונה בסופר ימקד אתכם לקנייה חכמה וצריכת חלבון גבוהה יותר.",
    paid: false,
  },

  {
    _id: 3,
    image: courseOne,
    courseTitle: "ספר המתכונים",
    courseParagraph:
      "קורס קצר וקליל שיתן לכם כלים סופר חשובים להתנהלות נכונה בסופר ימקד אתכם לקנייה חכמה וצריכת חלבון גבוהה יותר.",
    paid: false,
  },
  {
    _id: 4,
    image: courseFour,
    courseTitle: "תזונה ואימונים",
    courseParagraph:
      "קורס קצר וקליל שיתן לכם כלים סופר חשובים להתנהלות נכונה בסופר ימקד אתכם לקנייה חכמה וצריכת חלבון גבוהה יותר.",
    paid: true,
  },
];
const CourseGroup = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        axios.get(`${base_url}/course`).then((res) => {
          if (res.status === 200) {
            setCourses(res.data.data);
            console.log("courses:", res?.data.data);
          }
        });
      } catch (err) {
        console.log("courses:", err);
      }
    };
    fetchCourses();
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-10 pb-10 justify-items-center items-center"
        dir="rtl"
      >
        {courses?.map((course) => (
          <CourseCart key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGroup;
