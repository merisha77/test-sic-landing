import React from "react";

const types = {
  "1": { width: 336, height: 280 },
  "2": { width: 300, height: 600 },
  "3": { width: 970, height: 90 },
};

const pages = {
  landing: "is_landing_page",
  course: "is_course_page",
  search: "is_search_page",
  category: "is_course_category_page",
  country: "is_country_page",
  university: "is_university_page",
  blog: "is_blog_page",
};
const Advertisement = ({ type, image, url, wrapperClass }) => {
  return !!image ? (
    <div
      className={`bg-light ${wrapperClass}`}
      style={{ margin: "auto", ...types[type] }}
    >
      <a href={url} target="_blank">
        <img  loading="lazy"
          style={{ height: "100%", width: "100%" }}
          src={process.env.NEXT_PUBLIC_MEDIA + image}
          alt="gfd"
          className="img"
        />
      </a>
    </div>
  ) : null;
};

export default Advertisement;
