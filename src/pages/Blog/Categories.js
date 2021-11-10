import React from "react";
import Link from "next/link";

const categories = {
  country: "Country",
  course: "Course",
  institute: "Institute",
  finance: "Finance",
  visa: "Visa",
  accomodation: "Accomodation",
  preDeparture: "Pre Departure",
  postDeparture: "Post Departure",
  career: "Career",
  news: "News"
};
const Categories = ({ category = {}, countrySlug }) =>
  typeof category?.visa !== "undefined" ? (
    <div className="widget mb-4 pb-2">
      <h4 className="widget-title">Catagories</h4>
      <ul className="list-unstyled mt-4 mb-0">
        {Object.keys(category).map((k, idx) => (
          <CatCard
            title={categories[k]}
            key={`categories-${idx}`}
            counts={category[k]}
            countrySlug={countrySlug}
            category={k}
          />
        ))}
      </ul>
    </div>
  ) : null;

export default Categories;

const CatCard = ({ title, counts = 0, countrySlug, category }) =>
  !!title ? (
    <li>
      <Link href={`/blog/${countrySlug}/${category}`} prefetch={false}>
        <a>{title}</a>
      </Link>
      <span className="float-right">{counts}</span>
    </li>
  ) : null;
