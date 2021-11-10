import { Empty } from "antd";
import React, { useState, useEffect } from "react";

const CourseBrowser = ({ degree }) => {
  const [selected, setselected] = useState(null);
  const [dataArray, setdataArray] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
  useEffect(() => {
    if (degree?.length !== 0) {
    }
  }, []);
  console.log({ degree });
  if (degree?.length !== 0) {
    return (
      <div className='course-browser'>
        {degree?.map((data, idx) => (
          <button
            onClick={() => {
              setselected(data?.degree);
            }}
            className={
              selected === data?.degree
                ? "course-browse-buttons-selected"
                : "course-browse-buttons"
            }
            active={selected === data?.degree}
          >
            {data?.degree}
          </button>
        ))}
        {degree
          ?.filter((deg) => {
            if (deg.degree === selected) return true;
          })
          ?.map((each) => {
            each?.category?.length !== 0 &&
              each?.category?.map((eachCategory, idx) => (
                <div>
                  <h6>Categories</h6>
                  <button
                    key={`course-category-button-${idx}`}
                    className={
                      selectedCategory === eachCategory?.name
                        ? "course-category-buttons-selected"
                        : "course-category-buttons"
                    }
                    onClick={() => {
                      setSelectedCategory(eachCategory?.name);
                    }}
                    active={selectedCategory === eachCategory?.name}
                  >
                    {eachCategory?.name}
                  </button>
                </div>
              ));
          })}
      </div>
    );
  } else return <Empty />;
};

export default CourseBrowser;
