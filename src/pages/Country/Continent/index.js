// React Basic and Bootstrap
import React, { useState, useEffect } from "react";
import { Empty } from "antd";
import { Row, Col } from "reactstrap";
import Link from "next/link";
import { useDispatch } from "react-redux";

import useWidth from "src/utilities/widthUtil";

import Country from "./Country";
import { fetchCountries } from "src/actions/userActions";

const Continent = ({
  countries,
  continents,
  title,
  isBlog,
  bg = "bg-light"
}) => {
  const dispatch = useDispatch();
  const { isMobile } = useWidth();
  const [showAll, setShowAll] = useState(isMobile ? false : true);

  const [activeClass, setActiveClass] = useState("All");

  useEffect(() => {
    isMobile && setShowAll(false);
  }, [isMobile]);

  useEffect(() => {
    !countries && dispatch(fetchCountries());
  }, []);

  return (
    <React.Fragment>
      <section className={`section ${bg}`}>
        <div className="container">
          {!!title ? (
            <Row className="justify-content-center">
              <Col className="text-center">
                <div className="section-title mb-4 pb-2">
                  <h4 className="main-title mb-4 text-primary">{title}</h4>
                </div>
              </Col>
            </Row>
          ) : null}
          {continents?.length ? (
            <Row>
              <ul
                className="col container-filter list-unstyled categories-filter text-center"
                id="filter"
              >
                <NavPill
                  label="All"
                  isActive={activeClass === "All"}
                  onClick={() => setActiveClass("All")}
                />
                {continents?.map((c, idx) => (
                  <NavPill
                    key={`continent-button-${idx}`}
                    label={c}
                    isActive={activeClass === c}
                    onClick={() => setActiveClass(c)}
                  />
                ))}
              </ul>
            </Row>
          ) : null}
        </div>

        {countries?.length ? (
          <div className="container">
            <Row className="container-grid projects-wrapper">
              {countries
                ?.slice(0, showAll ? countries?.length : 4)
                ?.filter(({ continent_name }) =>
                  activeClass === "All" ? true : continent_name === activeClass
                )
                ?.map(({ continent_name, name, image, slug, id }, idx) => (
                  <Country
                    key={`country-card-${idx}`}
                    src={image}
                    continent={continent_name}
                    country={name}
                    slug={slug}
                    id={id}
                    isBlog={isBlog}
                  />
                )) || <Empty />}
              {countries?.length > 4 ? (
                <div
                  style={{ width: "95%", margin: "auto" }}
                  className="d-lg-none d-md-none btn text-primary"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Hide" : "Show More..."}
                </div>
              ) : null}
            </Row>
          </div>
        ) : (
          <Empty />
        )}
      </section>
    </React.Fragment>
  );
};

export default Continent;

const NavPill = ({ label, onClick, isActive }) => (
  <li className="list-inline-item">
    <span onClick={onClick}>
      <a
        className={`categories border d-block text-dark rounded ${
          isActive ? "active" : ""
        }`}
      >
        {label}
      </a>
    </span>
  </li>
);
