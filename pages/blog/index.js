import React from "react";
import Blog from "src/pages/Blog";
import APIServices from "src/apiUtils/APIServices";

const BlogPage = (props) => <Blog data={props?.data?.data} />;

export default BlogPage;

export const getServerSideProps = async (_) => {
  const { data, success } = await new APIServices(`/home-page-country`).get();

  return { props: { data: success ? data : {} } };
};