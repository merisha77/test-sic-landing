import React from "react";
import APIServices from "src/apiUtils/APIServices";
import CourseDetail from "src/pages/CourseDetail";

const CourseDetailPage = (props) => <CourseDetail {...props} />;

export const getStaticPaths = async (_) => {
  const { data, success } = await new APIServices(
    "/faceted-search/?size=20/"
  ).post({});

  let paths = [
    {
      params: { slug: "", instituteSlug: "" }
    }
  ];
  if (success)
    paths = data?.hits?.hits?.map(({ _source: { slug, institute_slug } }) => ({
      params: { slug, instituteSlug: institute_slug }
    }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params: { slug, instituteSlug } }) => {
  const { data, success } = await new APIServices(
    `course-details/${instituteSlug}/${slug}`
  ).get();
  return {
    props: {
      data: success ? data : {},
      slug
    },
    revalidate: 300
  };
};

export default CourseDetailPage;
