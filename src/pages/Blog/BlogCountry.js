import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Continent from "src/pages/Country/Continent";
import Blog from "../Blog/LatestBlog";

const PageBlogList = (_) => {
  const { countries, continents } = useSelector((state) => ({
    countries: state.user.get("countries"),
    continents: state.user.get("continents"),
  }));
  return (
    <Fragment>
      <section className="section">
        <Continent
          countries={countries}
          continents={continents}
          title={"Blogs by Destination"}
        />
        <Blog />
      </section>
    </Fragment>
  );
};

export default PageBlogList;
