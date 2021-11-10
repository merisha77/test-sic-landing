import React from "react";
import APIServices from "src/apiUtils/APIServices";

import CountryDetail from "src/pages/Country/Detail";

const CountryDetailPage = (props) => <CountryDetail {...props} />;

export const getStaticPaths = async (_) => {
  const { data, success } = await new APIServices("home-page-country").get();

  let paths = [
    {
      params: { slug: "" }
    }
  ];
  if (success)
    paths = data?.data?.countries?.map(({ slug }) => ({
      params: { slug }
    }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const { data, success } = await new APIServices(
    `country-details/${slug}`
  ).get();
  return {
    props: {
      data: success ? data?.data : {},
      slug
    },
    revalidate: 300
  };
};

export default CountryDetailPage;
