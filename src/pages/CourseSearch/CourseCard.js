import React from "react";
import { Checkbox, notification } from "antd";

import {
  ShoppingCart,
  Trash2,
  MessageSquare,
  Calendar,
  Umbrella,
  MapPin
} from "react-feather";
import { UncontrolledTooltip } from "reactstrap";

import useWidth from "src/utilities/widthUtil";

import Link from "next/link";
import { formatCurrency } from "src/utilities/CurrencyUtil";

const CourseCard = ({
  course,
  wishList,
  updateWishList,
  compareList,
  updateCompareList,
  small,
  urlParams
}) => {
  const isActive = wishList?.some((d) => d.id === course.id);
  const isChecked = compareList?.includes(course?.id);
  const { isMobile, isTablet } = useWidth();
  const { address = [] } = course || {};

  return (
    <div
      className={`col-lg-12 box-shadow d-md-flex d-sm-flex listing vertical row ${
        small ? "small-course-card" : "course-card"
      }`}
    >
      {course?.language ? (
        <UncontrolledTooltip placement="top" target="language">
          Language
        </UncontrolledTooltip>
      ) : null}
      {course?.duration ? (
        <UncontrolledTooltip placement="top" target="duration">
          Duration
        </UncontrolledTooltip>
      ) : null}
      {course?.study_mode ? (
        <UncontrolledTooltip placement="top" target="study_mode">
          Study Mode
        </UncontrolledTooltip>
      ) : null}
      {/* {course?.study_load ? (
        <UncontrolledTooltip placement="top" target="study_load">
          Study Load
        </UncontrolledTooltip>
      ) : null} */}
      {small ? (
        <label
          role="button"
          htmlFor={course.id}
          style={{
            position: "absolute",
            width: small ? "85%" : "100%",
            top: 0,
            left: 0,
            bottom: 0,
            margin: 0,
            zIndex: 1000
          }}
        />
      ) : (
        <Link href={`/course-detail/${course?.institute_slug}/${course?.slug}`} prefetch={false}>
          <a>
            <label
              role="button"
              htmlFor={course.id}
              style={{
                position: "absolute",
                width: small ? "85%" : "100%",
                top: 0,
                left: 0,
                bottom: 0,
                margin: 0,
                zIndex: 1000
              }}
            />
          </a>
        </Link>
      )}
      {course?.is_featured ? (
        <div
          className={`featured p-1 d-none  text-dark ${
            small ? "d-none" : "d-lg-block d-md-block"
          }`}
          size="small"
        >
          Featured
        </div>
      ) : (
        ""
      )}
      {small ? (
        <div className="col-lg-1 col-md-1 col-sm-1 col-1">
          <Checkbox
            id={course?.id}
            onChange={() => {
              if (compareList?.length < 5 || isChecked) {
                updateCompareList({ value: course?.id });
              } else {
                notification.warning({
                  message: "Can not compare more than 5 courses."
                });
              }
            }}
            checked={isChecked}
            style={{ height: "20px" }}
          />
        </div>
      ) : (
        ""
      )}
      <div
        className="logo-wrapper col-lg-2 col-md-2 col-sm-2 col-2 p-1 pr-3"
        style={{ zIndex: 20 }}
      >
        <Link href={`/institute-detail/${course?.institute_slug}`} prefetch={false}>
          <a className="img avatar">
            <img
              loading="lazy"
              src={
                course?.institute_logo ||
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.auburn.edu%2Fimages%2Fgraphics%2Fbuilding.png&f=1&nofb=1"
              }
              alt="institute logo"
            />
          </a>
        </Link>
      </div>
      {isMobile || isTablet || small ? (
        <div
          className={`col-lg-8 d-none d-sm-block d-md-block col-md-${
            isMobile || isTablet ? 8 : 10
          } col-sm-${
            isMobile || isTablet
              ? course?.is_featured
                ? small
                  ? 7
                  : 9
                : 10
              : 10
          } col-${
            isMobile || isTablet
              ? course?.is_featured
                ? small
                  ? 7
                  : 10
                : 10
              : 10
          } p-0`}
          style={{ paddingLeft: 15 }}
        >
          <div className="course-url d-flex justify-content-between align-items-top">
            <Link
              href={`/course-detail/${course?.institute_slug}/${course?.slug}`} prefetch={false}
            >
              <a>{course?.name}</a>
            </Link>
            <div
              className={`featured-1 px-1  text-dark ${
                small ? "d-none" : ''
              }`}
              size="small"
            >
              {course?.is_featured ? 'Featured' : null}
            </div>
          </div>
          <Link href={`/institute-detail/${course?.institute_slug}`} prefetch={false}>
            <a>
              <h3 className="uni-name">{course?.institute}</h3>
            </a>
          </Link>
          <address className="text-muted">
            {address?.length ? (
              <>
                <MapPin size={15} stroke={"#DC1F26"} /> &nbsp;
                {address?.find((a) =>
                  a?.address?.continent?.country?.state?.city?.name?.includes(
                    urlParams?.location
                  )
                )?.address?.continent?.country?.state?.city?.name ||
                  address[0]?.address?.continent?.country?.state?.city?.name ||
                  ""}
                , {address[0]?.address?.continent?.country?.name || ""}
              </>
            ) : null}
            {address?.length > 1 ? ` (+${address?.length - 1} more)` : ""}
          </address>
        </div>
      ) : (
        ""
      )}
      {small ? (
        <div
          style={{ margin: "auto", padding: 0 }}
          className="pointer col-lg-1 col-md-1 col-sm-1 col-1 p-0"
        >
          <Trash2
            size={isMobile ? 30 : 40}
            onClick={() => updateWishList(course)}
          />
        </div>
      ) : (
        <div className={`lh-content col-sm-12 col-lg-10 col-md-12  p-0`}>
          {isMobile || isTablet ? (
            ""
          ) : (
            <div className="d-block">
              <span className="course-url">
                <Link
                  href={`/course-detail/${course?.institute_slug}/${course?.slug}`} prefetch={false}
                >
                  <a> {course?.name}</a>
                </Link>
              </span>
              <Link href={`/institute-detail/${course?.institute_slug}`} prefetch={false}>
                <a>
                  <h3 className="uni-name">{course?.institute}</h3>
                </a>
              </Link>
              <address className="text-muted">
                {address?.length ? (
                  <>
                    <MapPin size={15} stroke={"#DC1F26"} /> &nbsp;
                    {address?.find((a) =>
                      a?.address?.continent?.country?.state?.city?.name?.includes(
                        urlParams?.location
                      )
                    )?.address?.continent?.country?.state?.city?.name ||
                      address[0]?.address?.continent?.country?.state?.city
                        ?.name ||
                      ""}
                    , {address[0]?.address?.continent?.country?.name || ""}
                  </>
                ) : null}
                {address?.length > 1 ? ` (+${address?.length - 1} more)` : ""}
              </address>
            </div>
          )}
          <div
            style={{ textAlign: "justify" }}
            className="line-clamp-4 mb-1 mx-1 text-dark"
            dangerouslySetInnerHTML={{
              __html: course?.description?.slice(
                0,
                isMobile ? 200 : course?.description?.length
              )
            }}
          />

          <div className="price-dtl d-md-flex">
            {!!course?.fees[0]?.international ? (
              <span className="fee text-primary pr-2 ml-2">
                {formatCurrency(
                  course?.fees[0]?.international,
                  course?.fees[0]?.currency
                )}
                &nbsp;
                {course?.fees[0]?.fee_term == "Full Course"
                  ? course?.fees[0]?.fee_term
                  : `per ${course?.fees[0]?.fee_term}`}
              </span>
            ) : null}

            {course?.duration ? (
              <span className="duration ml-3">
                <Calendar size={20} stroke={"#DC1F26"} id="duration" />
                &nbsp;
                {course?.duration} {course?.per_duration}
                {course?.duration > 1 ? "s" : ""}
              </span>
            ) : null}
            {course?.language ? (
              <span className="duration ml-3">
                <MessageSquare
                  size={20}
                  title={"duration"}
                  stroke={"#DC1F26"}
                  id="language"
                />
                &nbsp;
                {course?.language}
              </span>
            ) : null}

            {course?.study_mode ? (
              <span className="duration ml-3">
                <Umbrella size={20} stroke={"#DC1F26"} id="study_mode" />
                &nbsp;
                {course?.study_mode == "Both"
                  ? "On Campus, Online"
                  : course?.study_mode}
              </span>
            ) : null}
            {/* {course?.study_load ? (
              <span className="duration ml-3">
                <Clock size={20} stroke={"#DC1F26"} id="study_load" /> &nbsp;
                {course?.study_load == "Both"
                  ? "Full Time, Part Time"
                  : course?.study_load}
              </span>
            ) : null} */}

            {!!course?.fees[0]?.international ||
            course?.duration ||
            course?.language ||
            course?.study_mode ? (
              ""
            ) : (
              <span />
            )}
            <div
              className={`wishlist rounded btn-outline-secondary p-1 pointer col-sm-8 col-md-3 col-lg-3 mt-1 ${
                isActive ? "bg-secondary text-white" : ""
              }`}
              onClick={() => updateWishList(course)}
              style={{ zIndex: 1010 }}
            >
              <ShoppingCart
                size={25}
                fill={isActive ? "#fff" : "transparent"}
                stroke={isActive ? "#fff" : "#626262"}
              />
              <span className="compare content"> Add to Compare</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
