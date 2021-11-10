import React from "react";
class CheckBoxesVuexy extends React.Component {
  render() {
    return (
      <div
        className={`vx-checkbox-con ${
          this.props.className ? this.props.className : ""
        } vx-checkbox-${this.props.color}`}
      >
        <input type="checkbox" {...this.props} />
        <span
          className={`vx-checkbox vx-checkbox-${
            this.props.size ? this.props.size : "md"
          }`}
        >
          <span className="vx-checkbox--check">{this.props.icon}</span>
        </span>
        <label
          className={this.props.labelClass}
          htmlFor={this.props?.id}
          style={{
            marginBottom: 0,
            fontWeight: this.props.checked ? "bold" : "100",
          }}
        >
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default CheckBoxesVuexy;
