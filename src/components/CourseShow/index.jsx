import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Course from "../../pages/Course";

const CourseShow = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState();

  useEffect(() => {
    fetch(
      `https://form-you-back.herokuapp.com/api/v1/courses/${courseId}.json`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setCourse(data));
  }, []);

  return (
    <div className="course-show-container">
      <h1>Course page</h1>
      <div className="course-details">
        {course ? (
          <>
            <h3>{course.title}</h3>
            <h4>
              <b>Instructor:</b> {course.instructor.first_name}{" "}
              {course.instructor.last_name}
            </h4>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CourseShow;
