import React, { useState } from "react";
import { Row } from "reactstrap";
import { Divider } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import InputField from "src/pages/StudyInfoCentre/InputField";
import useEnglishTest from "src/utilities/useEnglishTest";
//TODO: yet to finalize
const EnglishTestForm = ({
  onBackClick,
  onSubmit,
  data,
  showDetail,
  onSkip,
  error
}) => {
  const [formData, setFormData] = useState(data);
  const englishTests = useEnglishTest();
  return (
    <div className="col col-sm-12">
      <form onSubmit={onSubmit}>
        <h6>English Tests</h6>
        <Row>
          <input id="id" value={formData?.id || undefined} type="hidden" />

          <input type="hidden" id="name" value={formData?.name} />

          <InputField
            error={error?.name}
            id="name1"
            label="Test Name"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                name:
                  englishTests?.find((a) => a?.value === value)?.key || value
              })
            }
            list="names"
            defaultValue={formData?.name}
          />
          <datalist id="names">
            {englishTests?.map(({ value, key }) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
          </datalist>

          <InputField
            error={error?.overall_score}
            id="overall_score"
            label="Overall Score"
            required
            defaultValue={formData?.overall_score || undefined}
          />
        </Row>
        <Row>
          <InputField
            error={error?.reading}
            id="reading"
            label="Reading"
            required
            width={3}
            defaultValue={formData?.reading || undefined}
          />
          <InputField
            error={error?.writing}
            id="writing"
            label="Writing"
            required
            width={3}
            defaultValue={formData?.writing || undefined}
          />
          <InputField
            error={error?.listening}
            id="listening"
            label="Listening"
            required
            defaultValue={formData?.listening || undefined}
            width={3}
          />
          <InputField
            error={error?.speaking}
            id="speaking"
            label="Speaking"
            required
            defaultValue={formData?.speaking || undefined}
            width={3}
          />
        </Row>
        <Divider />

        <div
          className={`pull-right ${
            showDetail ? "" : "d-flex justify-content-center align-items-center"
          }`}
          style={{ marginBottom: 16 }}
        >
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
          ) : (
            <u
              className="text-info ml-5 f-400 h6"
              onClick={onSkip}
              type="button"
            >
              <strong>Skip</strong>
            </u>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnglishTestForm;
