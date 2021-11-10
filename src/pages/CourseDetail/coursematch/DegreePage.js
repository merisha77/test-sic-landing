import React from "react";
import { Row } from "reactstrap";
import { Button } from "antd";

const DegreePage = ({ onChange, degreeLevels, formData, degree_level }) => (
  <div className="p-4">
    <h6 className="text-center">
      {`Which degree will you have by the time you start your ${degree_level}?`}
    </h6>
    <Row>
      {degreeLevels?.map(({ id, name }) => (
        <Button
          key={`deegree-level-${id}`}
          style={{
            marginBottom: 5,
            fontSize: 16,
            width: "100%",
          }}
          size="middle"
          type={formData?.degree_level === id ? "primary" : "default"}
          onClick={() => onChange("degree_level", id)}
        >
          {name}
        </Button>
      ))}
    </Row>
  </div>
);

export default DegreePage;
