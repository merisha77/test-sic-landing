import React from "react";
import APIServices from "src/apiUtils/APIServices";

import CatgeoryDetail from "src/pages/Course/Category/Detail";

const CourseCategoryDetailPage = (props) => <CatgeoryDetail {...props} />;

export const getStaticPaths = async (_) => {
  const { data, success } = await new APIServices("home-page-country").get();

  let paths = [
    {
      params: { slug: "" }
    }
  ];
  if (success)
    paths = data?.data?.course_category?.map(({ slug }) => ({
      params: { slug }
    }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data, success } = await new APIServices(
    `category-lists/${slug}`
  ).get();
  return {
    props: {
      data: success ? data?.data : {},
      slug
    },
    revalidate: 300
  };
};

export default CourseCategoryDetailPage;
