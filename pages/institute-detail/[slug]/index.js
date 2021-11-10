import React from "react";
import APIServices from "src/apiUtils/APIServices";

import University from "src/pages/University";

const InstituteDetailPage = (props) => <University {...props} />;

export const getStaticPaths = async (_) => {
  const { data, success } = await new APIServices(
    "/faceted-search/?size=20/"
  ).post({});

  let paths = [
    {
      params: { slug: "" }
    }
  ];
  if (success)
    paths = data?.hits?.hits?.map(({ _source: { institute_slug } }) => ({
      params: { slug: institute_slug }
    }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data, success } = await new APIServices(
    `institute-details/${slug}/`
  ).get();
  return {
    props: {
      data: success ? data?.data : {},
      slug
    },
    revalidate: 300
  };
};

export default InstituteDetailPage;
