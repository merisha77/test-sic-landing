import React from "react";

import CountryBlog from "src/pages/Blog/Country";
import APIServices from "src/apiUtils/APIServices";

const CountryBlogPage = (props) => {
  return <CountryBlog data={props?.data} />;
};

export const getServerSideProps = async ({
  params: { countrySlug, category },
}) => {
  const { data, success } = await new APIServices(
    `/blog/${countrySlug}/${category}`
  ).get();
  return {
    props: {
      data: success ? data : {},
    },
    // revalidate: 300,
  };
};

export default CountryBlogPage;
