import React from "react";
import { Col } from "reactstrap";

const CountryInformation = ({
  no_international_student,
  institute_countries__count,
  living_cost,
}) => (
  <Col lg={12} md={12} className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
    <div className="sidebar rounded shadow">
      <div className="widget border-bottom p-4">
        <h5 className="mb-0 text-primary">Country Information</h5>
      </div>

      <div className="p-2">No. of University :{institute_countries__count}</div>
      <div className="p-2">
        No. of International Student :{no_international_student}
      </div>
      {!!living_cost ? (
        <div className="p-2">Living Cost :{living_cost}</div>
      ) : null}
    </div>
  </Col>
);

export default CountryInformation;
