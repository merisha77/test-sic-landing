import React from "react";
import { Col } from "reactstrap";
import { ordinal_suffix_of } from "src/utilities/NumberFormat";
import Link from "next/link";

const UniversityInformation = ({ institute, address = [] }) => (
  <Col lg={12} md={12} className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
    <div className="sidebar rounded shadow">
      <div className="widget border-bottom p-4">
        <h5 className="mb-0 text-primary">
          {institute?.institute_type || "University"} Information
        </h5>
      </div>

      <div className="p-4">
        <InfoWidget
          icon={
            <img
              loading="lazy"
              src={institute?.logo}
              height={25}
              width="auto"
              alt={!!institute?.logo ? institute?.name : ""}
              className="mr-3"
            />
          }
          heading={institute?.name}
          url={`/institute-detail/${institute?.slug}`}
        />

        {institute?.rank ? (
          <InfoWidget
            icon={
              <i className="mdi mdi-chart-bell-curve mdi-24px text-dark float-left mr-3" />
            }
            heading={`${ordinal_suffix_of(institute?.rank)}(${
              institute?.rank_by
            })`}
          />
        ) : (
          ""
        )}

        <div
          className="widget"
          style={{ margin: "auto", display: "block", width: "fit-content" }}
        >
          <Link href={`/institute-detail/${institute?.slug}`}  prefetch={false}>
            <a className="btn btn-primary">Visit Institute Page</a>
          </Link>
        </div>
      </div>
    </div>
  </Col>
);

export default UniversityInformation;

export const InfoWidget = ({
  icon,
  label,
  heading,
  value,
  url = undefined
}) => (
  <div className="widget d-flex">
    {icon}
    <div className="overflow-hidden d-flex">
      <h4 className="widget-title text-dark mb-0 pr-2">{label}</h4>
      <span>
        <Link href={url || "#!"}>
          <a>
            <h5 className="widget-title text-dark">{heading || value}</h5>
          </a>
        </Link>
      </span>
    </div>
  </div>
);
