import React from "react";
import APIServices from "src/apiUtils/APIServices";

import InfoPage from "src/pages/info/InfoPage";

const InformationPage = (props) => <InfoPage {...props} />;

export const getStaticPaths = async (_) => {
  let paths = [
    {
      params: { type: "about" }
    },
    {
      params: { type: "privacy" }
    },
    {
      params: { type: "terms" }
    }
  ];

  return { paths, fallback: true };
};
export const getStaticProps = async ({ params: { type } }) => {
  const { data, success } = await new APIServices(
    `information-frontend-api/?information_type=${type}`
  ).get();
  return {
    props: {
      data: success ? data : {},
      type
    },
    revalidate: 300
  };
};

export default InformationPage;
