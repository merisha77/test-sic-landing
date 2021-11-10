import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";

import { Button, Tooltip } from "antd";
import { Col, Row } from "reactstrap";

import { localStore } from "./../../../store";
import { deleteValue, valueChanged } from "src/actions/userActions";
import CourseCard from "src/pages/CourseSearch/CourseCard";

import { useRouter } from "next/dist/client/router";

const DrawerCompareList = () => {
  const history = useRouter();
  const dispatch = useDispatch();

  const { courseList = [], activeDrawer } = useSelector((state) => ({
    courseList: state.user.get("comparedList"),
    activeDrawer: state.user.get("activeDrawer")
  }));

  const [compareList, updateCompareList] = useReducer(
    localStore,
    courseList?.slice(0, 5)?.map((a) => a.id)
  );

  const compareCourse = (_) => {
    dispatch(deleteValue("activeDrawer"));
    history.push(`/course-compare?courses=${compareList}`);
  };

  const updateWishList = (value) => {
    let type = courseList?.some((a) => a.id === value.id) ? "remove" : "add";
    type = !!value ? type : "";
    switch (type) {
      case "add":
        dispatch(valueChanged("comparedList", [...courseList, value]));
        break;
      case "remove":
        compareList?.includes(value.id) && updateCompareList(value.id);
        dispatch(
          valueChanged(
            "comparedList",
            courseList.filter((v) => v.id !== value.id) || []
          )
        );
        break;
      default:
        break;
    }
  };

  const isDisabled =
    courseList.length === 1 ||
    courseList.length === 0 ||
    compareList.length === 1 ||
    compareList.length === 0
      ? true
      : courseList.length > 1
      ? compareList?.length > 5
        ? true
        : !compareList?.length
        ? true
        : false
      : false;

  return (
    <section className="cover-user bg-white">
      <div className="container-fluid">
        <Row className="position-relative">
          <p>Note:* Upto five course are allowed to compare.</p>
          <Col lg={12} className="cover-my-30 order-2">
            {courseList.map((course, idx) => (
              <CourseCard
                small
                key={`compare-course-key-${idx}`}
                course={course}
                wishlist={[]}
                updateWishList={updateWishList}
                compareList={compareList}
                updateCompareList={updateCompareList}
              />
            ))}
          </Col>

          <Tooltip
            title={
              isDisabled
                ? "You must select at least two course to compare."
                : null
            }
            color="#1C599F"
          >
            {" "}
            <Button
              type="primary"
              className={`confirmation-button btn-primary ${
                activeDrawer?.isVisible ? "" : "d-none"
              }`}
              disabled={isDisabled}
              onClick={isDisabled ? (_) => {} : compareCourse}
            >
              Compare Course
            </Button>
          </Tooltip>
        </Row>
      </div>
    </section>
  );
};

export default DrawerCompareList;
