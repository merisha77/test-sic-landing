import React from "react";
// import "./course-category-card.scss";
import Link from "next/link";

const CourseCategoryCard = ({ label, icon, slug }) => {
  return (
    <div className="category-card pointer">
      <Link href={`/course-category-detail/${slug}`} prefetch={false}>
        <a>
          <div className="key-feature d-flex p-3 bg-light shadow category-card-wrapper">
            <div className="icon rounded mr-3">{icon}</div>
            <div className="content mt-2">
              <h4 className="title mb-0">{label}</h4>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default CourseCategoryCard;
