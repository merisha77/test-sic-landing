import React from "react";
import APIServices from "src/apiUtils/APIServices";
import dynamic from "next/dynamic";
const Detail = dynamic(()=> import("src/pages/Blog/Detail"));

const BlogPage = (props) => <Detail {...props} />;



export const getStaticPaths = async (_) => {
  const { data, success } = await new APIServices("home-page-country").get();

  let paths = [
    {
      params: { slug: "", countrySlug: "", category: "" }
    }
  ];
  if (success)
    paths = data?.data?.latest_blog?.map(
      ({ country__slug, slug, category }) => ({
        params: { slug, category, countrySlug: country__slug }
      })
    );

  return { paths, fallback: true };
};

export const getStaticProps = async ({
  params: { slug, countrySlug, category }
}) => {
  const { data, success } = await new APIServices(
    `/blog/${countrySlug}/${category}/${slug}`
  ).get();
  return {
    props: {
      data: success ? data?.data : {},
      slug
    },
    revalidate: 300
  };
};
export default BlogPage;
