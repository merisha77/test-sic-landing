import React, { useState, useEffect } from "react";
import useWidth from "src/utilities/widthUtil";

import { ListGroup, ListGroupItem } from "reactstrap";
import Link from "next/link";
import { CheckCircle } from "react-feather";

const CourseBrowser = ({ degree }) => {
  const [selected, setSelected] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mergedCategories, setmergedCategories] = useState([]);
  const { isMobile, isTablet } = useWidth();
const [degreeArray, setdegreeArray] = useState([]);
  const [showAll, setShowAll] = useState(isMobile ? false : true);
  useEffect(() => {
    isMobile && setShowAll(false);
  }, [isMobile]);

  useEffect(() => {
    setSelected('all');
    setSelectedCategory('all')
  }, []);
  useEffect(() => {
    if(degree?.length!==0)
   { displayAllCourses();
    setdegreeArray(degree)}
  }, [degree]);

  useEffect(() => {
    let temp = [];
      if (categories?.length !== 0) {
        categories?.map((each) => {
          each?.course?.length !== 0 &&
          each?.course.map((eachCourse, idx) => {
            temp.push(eachCourse);
          })
        })
        setCourses(temp);

   }
    }, [categories]);

  const mergeCategories = () => {
    let mergedArray = [];
    if (selected === 0) {
      categories?.map((eachCategory) => {
        let existing = mergedArray.filter((v, i) => {
          return v.name == eachCategory.name;
        });
        if (existing.length) {
          var existingIndex = mergedArray.indexOf(existing[0]);
          mergedArray[existingIndex].course = mergedArray[
            existingIndex
          ].course.concat(eachCategory.course);
        } else {
          mergedArray.push(eachCategory);
        }
      });
      setmergedCategories(mergedArray);
    }
  };
  const displayAllCourses = () => {
    let temp = [];
    let tempCategories = [];
    let mergedArray = [];
    setCategories([]);
    setCourses([]);
    degreeArray?.map((deg) => {
      deg.category?.length !== 0 &&
        deg.category.map((eachCategory) => {
          //merge same named categories into one
          let existing = mergedArray.filter((v, i) => {
            return v.name == eachCategory.name;
          });
          if (existing.length) {
            var existingIndex = mergedArray.indexOf(existing[0]);
            mergedArray[existingIndex].course = mergedArray[
              existingIndex
            ].course.concat(eachCategory.course);
          } else {
            mergedArray.push(eachCategory);
          }
          tempCategories.push(eachCategory);
          //   setCategories(mergedArray);
          eachCategory?.course?.length !== 0 &&
            eachCategory?.course.map((eachCourse, idx) => {
              temp.push(eachCourse);
            });
        });
    });
    // setCourses(temp);
    console.log({ mergedArray });
    // setmergedCategories(mergedArray);
    setCategories(mergedArray);
  };
  console.log({ categories, courses });

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
      if (existing.length) {
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
console.log('degree',degree, degreeArray);
  return (
    <div className='course-browser'>
      {degree?.length !== 0 && (
        <button
          key={`course-browse-button-0`}
          outline
          className={
            selected === 'all'
              ? "course-browse-buttons-selected"
              : "course-browse-buttons"
          }
          onClick={() => {
            setSelected('all');
            setSelectedCategory('all');
            displayAllCourses();
          }}
          active={selected === 'all'}
        >
          All courses
        </button>
      )}
      {degree?.length !== 0 &&
        degree?.map((data, idx) => (
          <button
            key={`course-browse-button-${idx}`}
            outline
            className={
              selected === idx 
                ? "course-browse-buttons-selected"
                : "course-browse-buttons"
            }
            onClick={() => {
              setSelected(idx);
              setCategories(data?.category);
              setSelectedCategory(0);
              // setCourses(
              //   data?.category && data?.category[0]
              //     ? data?.category[0]?.course
              //     : []
              // );
            }}
            active={selected === idx}
          >
            {data?.degree}
          </button>
        ))}

      <hr />
      {selectedCategory !== null && <h6>Categories</h6>}
      {selected === 'all' && (
        <button
          key={`course-category-button-0`}
          outline
          className={
            selectedCategory === 'all'
              ? "course-category-buttons-selected"
              : "course-category-buttons"
          }
          onClick={() => {
            setSelectedCategory('all');
            //   setSelected(0);
            //   mergeCategories();
            //   listAllCourses();
            displayAllCourses();
            // setCourses(category?.course);
          }}
          active={selectedCategory === 'all'}
        >
          {!isMobile && <CheckCircle height='20' width='20' />}All categories
        </button>
      )}
       { selectedCategory !== null &&
        categories?.length !== 0 &&
        categories
          ?.slice(0, showAll ? categories?.length : 4)
          ?.map((category, idx) => (
            <button
              key={`course-category-button-${idx}`}
              outline
              className={
                selectedCategory === idx
                  ? "course-category-buttons-selected"
                  : "course-category-buttons"
              }
              onClick={() => {
                setSelectedCategory(idx);
                setCourses(category?.course);
                // setmergedCategories([]);
              }}
              active={selectedCategory === idx}
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
          ))
          }

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
      {courses?.length !== 0 &&
        courses?.map((course, idx) => (
          <Link
            href={`/course-detail/${course?.institute_slug}/${course?.slug}`}
          >
            <a className='text-dark'>
              <div className='card border rounded shadow mb-2 card-header bg-light p-3'>
                {course?.name}
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
};;

export default CourseBrowser;
