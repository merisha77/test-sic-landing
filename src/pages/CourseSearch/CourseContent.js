import React, { useState, useEffect, memo } from "react";
import { Pagination, Empty } from "antd";
import { MinusCircle, Filter } from "react-feather";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Card, CardBody } from "reactstrap";

import useWidth from "src/utilities/widthUtil";
import {
  deleteValue,
  valueChanged,
  courseSearch
} from "src/actions/userActions";

import CourseCard from "./CourseCard";

import { CourseContentSkeleton } from ".";
import { SelectInput } from "src/pages/StudyInfoCentre/InputField";
import { getProcessedFilters } from "src/utilities/filterProcess";
import Advertisement from "src/components/ads/Advertisement";

const sortOptions = [
  {
    key: "feature",
    value: "Featured"
  },
  {
    key: "views",
    value: "Popular"
  }
];

const CourseContent = memo(({ mainSidebar, isFilterOpen, urlParams = {} }) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("featured");
  const {
    searchData,
    filters = {},
    comparedList,
    filtersss,
    ads = [],
    current_page
  } = useSelector((state) => ({
    searchData: state.user.get("searchData") || {},
    filters: state.user.get("filterWithLabel")?.toJS(),
    comparedList: state.user.get("comparedList"),
    filtersss: state.user.get("filters"),
    ads: state.user.get("banners"),
    current_page: state.user.get("current_page")
  }));

  const { total, searchList } = searchData;

  useEffect(() => {
    const initialWishList =
      JSON.parse(window.localStorage.getItem("wishList")) || [];
    dispatch(valueChanged("comparedList", initialWishList));
    return () => {
      dispatch(deleteValue("searchData"));
    };
  }, []);

  useEffect(() => {
    return () => {
      window.localStorage.setItem(
        "wishList",
        JSON.stringify(comparedList || [])
      );
    };
  }, [comparedList]);

  const removeFilter = (filter = undefined) => {
    if (!!filter) {
      dispatch(deleteValue(`filterWithLabel.${filter.key}-${filter.id}`));
      dispatch(deleteValue(`filters.${filter.key}.${filter.id}`));
    } else {
      if (Object.values(urlParams || {}).length) {
        window.location.search = "";
      }
      dispatch(deleteValue("filterWithLabel"));
      dispatch(deleteValue("filters"));
    }
  };

  const updateWishList = (value) => {
    let type = comparedList?.some((a) => a.id === value.id) ? "remove" : "add";
    type = !!value ? type : "";
    switch (type) {
      case "add":
        dispatch(valueChanged("comparedList", [...comparedList, value]));
        break;
      case "remove":
        dispatch(
          valueChanged(
            "comparedList",
            comparedList.filter((v) => v.id !== value.id) || []
          )
        );
        break;
      default:
        break;
    }
  };

  const renderProducts = searchList?.map(({ _source, _id }, idx) => (
    <>
      {idx === 3 ? (
        <Advertisement
          key={`course-card-ads-${idx}`}
          type={ads[0]?.dimension_type}
          image={ads[0]?.image}
          url={ads[0]?.url}
          wrapperClass="m-4"
        />
      ) : null}
      {idx === 11 ? (
        <Advertisement
          key={`course-card-ads-${idx}`}
          type={ads[1]?.dimension_type}
          image={ads[1]?.image}
          url={ads[1]?.url}
          wrapperClass="m-4"
        />
      ) : null}
      <CourseCard
        key={`course-card-${idx}`}
        course={{ ..._source, id: _id }}
        wishList={comparedList}
        updateWishList={updateWishList}
        urlParams={urlParams}
      />
    </>
  ));

  const { isTablet, isMobile } = useWidth();

  const removeUrlFilter = (filter) => {
    const params = new URLSearchParams(window?.location?.search);
    params.delete(filter);
    window.location.search = params?.toString();
  };

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setShowFilter(true);
  }, []);

  useEffect(() => {
    dispatch(deleteValue("searchData.total"));

    const data = {};
    filtersss?.size &&
      Object.keys(filtersss.toJS()).forEach(
        (k) => (data[k] = Object.values(filtersss?.get(k)?.toJS() || {}))
      );
    const processedFilters = filtersss?.size
      ? getProcessedFilters(data)
      : undefined;
    dispatch(
      courseSearch(
        { ...urlParams, filters: processedFilters },
        `/faceted-search/?size=${20}&sort=${sortBy}`
      )
    );
  }, [sortBy]);
  return (
    <CourseContentSkeleton isActive={typeof total === "undefined"}>
      <div className="shop-content col-md-12 col-lg-9 col-sm-12">
        <Row className="course-content-wrapper-header col-12 p-0">
          <Col
            sm="6"
            md="12"
            lg="6"
            className={isTablet || isMobile ? "p-2" : ""}
          >
            <div className="ecommerce-header-items">
              <div className="result-toggler d-block d-lg-none w-25 d-flex">
                <div className="shop-sidebar-toggler">
                  <Filter size={26} onClick={() => mainSidebar(true)} />
                  {isFilterOpen ? (
                    <span onClick={() => mainSidebar(false)}>Close</span>
                  ) : null}
                </div>
              </div>
              <div className="view-options d-flex justify-content-end w-75">
                <SelectInput
                  width={4}
                  customStyles={{ paddingRight: 0 }}
                  defaultValue={sortOptions[0]?.value}
                  onChange={(value) => setSortBy(value)}
                  options={sortOptions}
                  initAtFirst
                  showSearch={false}
                  allowClear={false}
                  value={sortBy}
                />
              </div>
            </div>
          </Col>
          <Col sm="6" className={isTablet || isMobile ? "p-0" : ""}>
            <h3 className="search-results text-secondary">
              {total || 0}
              <span className="text-primary"> Courses Found</span>
            </h3>
          </Col>

          {showFilter ? (
            Object.values(urlParams).length ||
            Object.values(filters || {}).length ? (
              <Col sm={12} className="d-flex">
                <Card className="filter-card">
                  <CardBody className="text-primary">
                    <Col sm={12} className="d-flex">
                      Filters:
                      <span style={{ display: "flex", flexWrap: "wrap" }}>
                        {urlParams?.location ? (
                          <Tag
                            key={`filter-atg=${urlParams?.location}`}
                            onClick={() => removeUrlFilter("location")}
                            value={urlParams?.location}
                          />
                        ) : null}
                        {urlParams?.course ? (
                          <Tag
                            key={`filter-atg=${urlParams?.course}`}
                            onClick={() => removeUrlFilter("course")}
                            value={urlParams?.course}
                          />
                        ) : null}
                        {urlParams?.degree_level ? (
                          <Tag
                            key={`filter-atg=${urlParams?.degree_level}`}
                            onClick={() => removeUrlFilter("degree_level")}
                            value={urlParams?.degree_level}
                          />
                        ) : null}
                        {Object.values(filters || {})
                          ?.filter(
                            (f) =>
                              f?.name?.toLowerCase() !==
                                urlParams?.location?.toLowerCase() &&
                              f?.name?.toLowerCase() !==
                                urlParams?.course?.toLowerCase() &&
                              f?.name?.toLowerCase() !==
                                urlParams?.degree_level?.toLowerCase()
                          )
                          ?.map((filter, idx) => (
                            <Tag
                              key={`filter-atg=${idx}`}
                              onClick={() => removeFilter(filter)}
                              value={filter?.name}
                            />
                          ))}
                        <strong
                          className="text-primary filter-tag pointer"
                          onClick={() => removeFilter()}
                        >
                          Clear All
                        </strong>
                      </span>
                    </Col>
                  </CardBody>
                </Card>
              </Col>
            ) : null
          ) : null}
        </Row>
        <Row style={{ margin: isTablet || isMobile ? "0" : "unset" }}>
          <Col sm="12" style={{ padding: isTablet || isMobile ? "0" : "" }}>
            <div id="ecommerce-products" className="list-view">
              {searchList?.length ? (
                renderProducts
              ) : (
                <Empty description="Oops! Seems like there is no course available for your search. Please update filters and search again." />
              )}
            </div>
          </Col>
          <Col sm="12" className="mb-4">
            <div className="ecommerce-pagination">
              <Pagination
                hideOnSinglePage
                defaultCurrent={current_page || 1}
                // current={current_page}
                total={total}
                pageSize={20}
                onChange={(page, pageSize) => {
                  dispatch(deleteValue("searchData.total"));
                  dispatch(valueChanged("current_page", page));
                  const data = {};
                  filtersss?.size &&
                    Object.keys(filtersss.toJS()).forEach(
                      (k) =>
                        (data[k] = Object.values(
                          filtersss?.get(k)?.toJS() || {}
                        ))
                    );
                  const processedFilters = filtersss?.size
                    ? getProcessedFilters(data)
                    : undefined;
                  dispatch(
                    courseSearch(
                      { ...urlParams, filters: processedFilters },
                      `/faceted-search/?size=${pageSize}&page=${page}&sort=${sortBy}`
                    )
                  );
                  window.scrollTo(0, 0);
                }}
                showSizeChanger={false}
                showTitle
              />
            </div>
          </Col>
        </Row>
      </div>
    </CourseContentSkeleton>
  );
});

export default CourseContent;

const Tag = ({ value, onClick }) => (
  <div className="filter-tag pointer" onClick={onClick}>
    {value} &nbsp;
    <MinusCircle />
  </div>
);
