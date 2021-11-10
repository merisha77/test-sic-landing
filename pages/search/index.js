import React from "react";
import APIServices from "src/apiUtils/APIServices";
import CourseSearch from "src/pages/CourseSearch";

const Search = (props) => <CourseSearch {...props} />;

export const getServerSideProps = async ({ query }) => {
  const { data, success } = await new APIServices(
    `/faceted-search/?size=${20}&sort=feature`
  ).post(query);

  return { props: { data: success ? data : {}, query } };
};
export default Search;
