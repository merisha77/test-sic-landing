import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Badge, Skeleton } from "antd";
import SideFilter from "./SideFilter";
import CourseContent from "./CourseContent";

import useWidth from "src/utilities/widthUtil";

import { serverSideInject, valueChanged } from "src/actions/userActions";

import { Row, Col } from "reactstrap";
import Head from "next/head";

const CourseSearch = memo(({ data, query }) => {
  const dispatch = useDispatch();
  const { isTablet, isMobile } = useWidth();
  const [isFilterOpen, setIsFilterOpen] = useState(!isTablet && !isMobile);

  useEffect(() => {
    dispatch(serverSideInject(data));
    const topNav = document.getElementById("topnav");
    !!topNav && topNav.classList.add("nav-sticky");
    return () => {
      !!topNav && topNav.classList.remove("nav-sticky");
    };
  }, []);

  const {
    compareLists,
    activeDrawer,
    searchData: { total, searchList = [] }
  } = useSelector((state) => ({
    compareLists: state.user.get("comparedList"),
    activeDrawer: state.user.get("activeDrawer"),
    searchData: state.user.get("searchData") || {}
  }));
  const { isVisible } = !!activeDrawer && activeDrawer;
  const title = data?.hits?.hits?.length
    ? data?.hits?.hits[0]?._source?.name
    : "Course Search";
  return (
    <section className="bg-half bg-light sm-p-0 sm-mt-2">
      <Head>
        <title>
          {title || searchList[0]?._source?.name || "Course Search"} | Study
          Info Centre
        </title>
        <meta name="title" content="Course Search | Study Info Centre" />
      </Head>
      <div className="home-center">
        <div className="home-desc-center">
          <div className="container">
            <div className="course-application">
              {isFilterOpen ? (
                <SideFilter mainSidebar={setIsFilterOpen} urlParams={query} />
              ) : null}
              <CourseContent
                urlParams={query}
                mainSidebar={setIsFilterOpen}
                isFilterOpen={isFilterOpen}
              />
            </div>
          </div>
        </div>
      </div>
      {compareLists?.length && typeof total !== "undefined" ? (
        <div
          className={`compare-course-button ${isVisible ? "d-none" : ""}`}
          onClick={() =>
            dispatch(
              valueChanged("activeDrawer", {
                isVisible: true,
                drawerKey: "compareCourse",
                title: "Compare List"
              })
            )
          }
          style={{ zIndex: 1030 }}
        >
          <Badge count={compareLists?.length}>
            <Button type="primary" className="btn text-white">
              Compare List
            </Button>
          </Badge>
        </div>
      ) : null}
    </section>
  );
});

export default CourseSearch;

export const FilterSkeleton = ({ isActive, children }) =>
  isActive ? (
    <div className="sidebar-section col-md-12 col-lg-3 col-sm-12 shadow">
      {Array(4)
        .fill()
        .map((_, idx) => (
          <Skeleton active size="default" key={idx} />
        ))}
    </div>
  ) : (
    children
  );

export const CourseContentSkeleton = ({ isActive, children }) => {
  const { isTablet } = useWidth();
  return isActive ? (
    <div className="shop-content col-md-12 col-lg-9 col-sm-12 shadow">
      <Row style={{ margin: isTablet ? "0" : "unset" }}>
        <Col sm="12" style={{ padding: isTablet ? "0" : "" }}>
          <div id="ecommerce-products" className="list-view">
            {Array(4)
              .fill()
              .map((_, idx) => (
                <span key={idx} className="m-2 shadow p-4 row">
                  <div className="col-2 d-sm-none">
                    <Skeleton.Image size="large" />
                  </div>
                  <Skeleton active size="default" className="col-9" />
                </span>
              ))}
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    children
  );
};
