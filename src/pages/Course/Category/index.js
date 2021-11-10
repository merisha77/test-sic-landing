import React, { useEffect } from "react";
import CourseCategory from "src/pages/StudyInfoCentre/CourseCategory";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountries } from "src/actions/userActions";

const CourseCategories = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.user.get("courses")) || [];
  useEffect(() => {
    !courses?.length && dispatch(fetchCountries());
  }, []);
  return <CourseCategory categories={courses} />;
};

export default CourseCategories;
