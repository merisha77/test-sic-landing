import React, { useState, useEffect } from "react";
import useWidth from "src/utilities/widthUtil";

import { ListGroup, ListGroupItem } from "reactstrap";
import Link from "next/link";
import { CheckCircle } from "react-feather";

const CourseBrowser = ({ degree }) => {
  const [selected, setSelected] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mergedCategories, setmergedCategories] = useState([]);
  const { isMobile, isTablet } = useWidth();

  const [showAll, setShowAll] = useState(isMobile ? false : true);
  useEffect(() => {
    isMobile && setShowAll(false);
  }, [isMobile]);

  useEffect(() => {
    if (degree?.length !== 0) {
      //setting first degree and category as default
      // setCategories(degree[0].category);
      // if (degree[0]?.category?.length !== 0) {
      //   setSelectedCategory(0);
      //   setCourses(degree[0].category[0]?.course);
      // }
      displayAllCourses();
      // console.log({ degree });
    }
  }, [degree]);

  // useEffect(() => {
  //   console.log({ degree });
  //   let mergedArray = [];
  //   // if all course option selected, merge categories with same name from all categories list
  //   if (categories?.length !== 0 && selected === 0) {
  //     console.log("categories", categories);
  //     categories.forEach((item) => {
  //       let existing = mergedArray.filter((v, i) => {
  //         return v.name == item.name;
  //       });
  //       console.log("existing", existing);
  //       if (existing.length) {
  //         var existingIndex = mergedArray.indexOf(existing[0]);
  //         mergedArray[existingIndex].course = mergedArray[
  //           existingIndex
  //         ].course.concat(item.course);
  //       } else {
  //         mergedArray.push(item);
  //       }
  //     });
  //   }
  //   setmergedCategories(mergedArray);
  //   console.log("merged", mergedArray);
  // }, [categories]);

  const displayAllCourses = () => {
    let temp = [];
    let tempCategories = [];
    let mergedArray = [];
    setCategories([]);
    setCourses([]);
    degree?.map((deg) => {
      deg.category?.length !== 0 &&
        deg.category.map((eachCategory) => {
          //merge same named categories into one
          let existing = mergedArray.filter((v, i) => {
            return v.name == eachCategory.name;
          });
          if (existing.length !== 0) {
            var existingIndex = mergedArray.indexOf(existing[0]);
            mergedArray[existingIndex].course = mergedArray[
              existingIndex
            ].course.concat(eachCategory.course);
          } else {
            mergedArray.push(eachCategory);
          }
          // tempCategories.push(eachCategory);
          // setCategories(mergedArray);
          eachCategory?.course?.length !== 0 &&
            eachCategory?.course.map((eachCourse, idx) => {
              temp.push(eachCourse);
            });
        });
    });
    setCourses(temp);
    console.log({ mergedArray });
    // setmergedCategories(mergedArray);
    setCategories(mergedArray);
  };

  const listAllCourses = () => {
    let temp = [];
    setCourses([]);
    degree?.map((deg) => {
      deg.category?.length !== 0 &&
        deg.category.map((eachCategory) => {
          eachCategory?.course?.length !== 0 &&
            eachCategory?.course.map((eachCourse, idx) => {
              temp.push(eachCourse);
            });
        });
    });
    setCourses(temp);
  };

  const handleMergeCategory = () => {
    let mergedArray = [];
    categories.forEach((item) => {
      let existing = mergedArray.filter((v, i) => {
        return v.name == item.name;
      });
      console.log("existing", existing);
      if (existing.length !== 0) {
        var existingIndex = mergedArray.indexOf(existing[0]);
        mergedArray[existingIndex].course = mergedArray[
          existingIndex
        ].course.concat(item.course);
      } else {
        mergedArray.push(item);
      }
    });
    console.log("merged", mergedArray);
    setmergedCategories(mergedArray);
  };
  return (
    <div className='course-browser'>
      {degree?.length !== 0 && (
        <button
          key={`course-browse-button-0`}
          outline
          className={
            selected === 0
              ? "course-browse-buttons-selected"
              : "course-browse-buttons"
          }
          onClick={() => {
            setSelected(0);
            setSelectedCategory(0);
            displayAllCourses();
          }}
          active={selected === 0}
        >
          All courses
        </button>
      )}
      {degree?.length !== 0 &&
        degree?.map((data, idx) => (
          <button
            key={`course-browse-button-${idx + 1}`}
            outline
            className={
              selected === idx + 1
                ? "course-browse-buttons-selected"
                : "course-browse-buttons"
            }
            onClick={() => {
              setSelected(idx + 1);
              setCategories(data?.category);
              setSelectedCategory(1);
              setCourses(
                data?.category && data?.category[0] && data?.category[0]
                  ? data?.category[0]?.course
                  : []
              );
            }}
            active={selected === idx + 1}
          >
            {data?.degree}
          </button>
        ))}

      <hr />
      {selectedCategory !== null && <h6>Categories</h6>}
      {selected === 0 && (
        <>
          <button
            key={`course-category-button-0`}
            outline
            className={
              selectedCategory === 0
                ? "course-category-buttons-selected"
                : "course-category-buttons"
            }
            onClick={() => {
              setSelectedCategory(0);
              listAllCourses();
              // displayAllCourses();
              // setCourses(category?.course);
            }}
            active={selectedCategory === 0}
          >
            {!isMobile && <CheckCircle height='20' width='20' />}All categories
          </button>
          {/* {mergedCategories?.map((category, idx) => (
            <button
              key={`course-category-button-${idx + 1}`}
              outline
              className={
                selectedCategory === idx + 1
                  ? "course-category-buttons-selected"
                  : "course-category-buttons"
              }
              onClick={() => {
                setSelectedCategory(idx + 1);
                console.log("c", category.course);
                setCourses(category?.course);
              }}
              active={selectedCategory === idx + 1}
            >
              <img
                loading='lazy'
                src={process.env.NEXT_PUBLIC_MEDIA + category?.icon}
                alt={name}
                style={{ maxHeight: 30, maxWidth: 30, background: "#ffffff" }}
              />{" "}
              {category?.name}
            </button>
          ))} */}
        </>
      )}
      {selectedCategory !== null &&
        categories?.length !== 0 &&
        categories
          ?.slice(0, showAll ? categories?.length : 4)
          ?.map((category, idx) => (
            <button
              key={`course-category-button-${idx + 1}`}
              outline
              className={
                selectedCategory === idx + 1
                  ? "course-category-buttons-selected"
                  : "course-category-buttons"
              }
              onClick={() => {
                setSelectedCategory(idx + 1);
                setCourses(category?.course);
                // setmergedCategories([]);
              }}
              active={selectedCategory === idx + 1}
            >
              {!isMobile && (
                <img
                  loading='lazy'
                  src={process.env.NEXT_PUBLIC_MEDIA + category?.icon}
                  alt={name}
                  style={{ maxHeight: 20, maxWidth: 20, background: "#ffffff" }}
                />
              )}{" "}
              {category?.name}
            </button>
          ))}
      {categories?.length > 4 ? (
        <div
          style={{ width: "95%", margin: "auto" }}
          className='d-lg-none d-md-none btn text-primary'
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Hide" : "Show More..."}
        </div>
      ) : null}
      <hr />
      {/* <ListGroup> */}
      {courses?.length !== 0 &&
        courses?.map((course, idx) => (
          <Link
            href={`/course-detail/${course?.institute_slug}/${course?.slug}`}
          >
            <a className='text-dark'>
              <div className='card border rounded shadow mb-2 card-header bg-light p-3'>
                {course?.name}
              </div>
              {/* <ListGroupItem key={`course-card-${idx}`}>
                {course?.name}
              </ListGroupItem> */}
            </a>
          </Link>
        ))}
      {/* </ListGroup> */}
      {/* <div className='course-cards'>
        {courses?.length !== 0 ? (
          <>
            {courses?.map((course, idx) => (
              <div className='course-card' key={`course-card-${idx}`}>
                {isMobile || isTablet ? (
                  <div className='course-card-header' title={course?.name}>
                    <a className='header-title'> {course?.name}</a>
                  </div>
                ) : (
                  <div className='course-card-header'>
                    <a className='header-title' title={course?.name}>
                      {course?.name}
                    </a>
                  </div>
                )}
                <div className='content-wrapper'>
                  <div className='content'>
                    {course?.duration ? (
                      <div className='course-detail'>
                        <label>Duration : </label>
                        <p>
                          {course?.duration} {course?.per_duration}
                        </p>
                      </div>
                    ) : null} */}
      {/*  <div className='course-detail'>
                      <label>1st Year Tuition Fees</label>
                      <p>34 Lakh</p>
                    </div>
                    <div className='course-detail'>
                      <label>Exams Accepted</label>
                      <p>IELTS: 6.5</p>
                </div> */}
      {/* </div>
                </div>
                <a className='view-course-button float-right btn btn-primary'>
                  View course
                </a>
              </div>
            ))}
          </>
        ) : (
          ""
        )}
      </div> */}
    </div>
  );
};

export default CourseBrowser;
