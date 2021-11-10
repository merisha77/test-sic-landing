import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Continent from "src/pages/Country/Continent";

const CountryList = (_) => {
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
          title="Countries"
        />
      </section>
    </Fragment>
  );
};

export default CountryList;
