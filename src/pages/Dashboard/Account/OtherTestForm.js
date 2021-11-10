import React, { useState, useEffect } from "react";
import { Row } from "reactstrap";
import { Divider } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";
import APIServices from "src/apiUtils/APIServices";

const OtherTestForm = ({ onBackClick, onSubmit, data, showDetail }) => {
  const [formData, setFormData] = useState(data);
  const [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async (_) => {
    const { data, success } = await new APIServices(
      "core/course/othertest/"
    ).get();
    success && setDropdownData(data?.data);
  };
  return (
    <div className="col col-sm-12">
      <form onSubmit={onSubmit}>
        <h6>Other Tests</h6>
        <Row>
          <input id="id" value={formData?.id || undefined} type="hidden" />
          <SelectInput
            id="name"
            label="Name"
            onChange={(value) => setFormData({ ...formData, name: value })}
            value={formData?.name || undefined}
            options={
              dropdownData?.map(({ id, name }) => ({
                key: id,
                value: name,
              })) || []
            }
            initAtFirst
          />
          <InputField
            id="score"
            label="Score"
            required
            type="number"
            defaultValue={formData?.score || undefined}
          />
        </Row>

        <Divider />

        <div className="pull-right" style={{ marginBottom: 16 }}>
          <button
            className={
              showDetail
                ? "ant-btn btn-primary pull-right"
                : "btn btn-secondary btn-lg"
            }
            name="submit-button"
            type="submit"
          >
            {showDetail ? (
              "Confirm"
            ) : (
              <>
                Save & Continue&nbsp;
                <DoubleRightOutlined size={15} />
              </>
            )}
            &nbsp;
          </button>
          &nbsp;
          {showDetail ? (
            <button
              className="ant-btn btn-secondary pull-right"
              onClick={onBackClick}
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default OtherTestForm;
