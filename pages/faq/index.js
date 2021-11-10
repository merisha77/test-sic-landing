import React from "react";
import APIServices from "src/apiUtils/APIServices";
import FAQ from "src/pages/info/FAQ";

const FAQPage = (props) => <FAQ {...props} />;

export const getStaticProps = async (_) => {
  const { data, success } = await new APIServices(`faq`).get();
  return {
    props: {
      data: success ? data?.data : {}
    },
    revalidate: 300
  };
};
export default FAQPage;
