import React from "react";
import { Col } from "reactstrap";

const InputField = ({
  width = 12,
  wrapperClassName,
  label,
  icon = undefined,
  children,
  ...rest
}) => (
  <Col lg={width}>
    <div className={`form-group ${wrapperClassName}`}>
      <label>{label}</label>
      {icon}
      <input className="form-control pl-5" {...rest} />
      {children}
    </div>
  </Col>
);

export default InputField;
