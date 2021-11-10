import React, { useState } from "react";
import { Row } from "reactstrap";
import { Divider } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";

const AcademicsForm = ({
  onBackClick,
  onSubmit,
  data,
  dropDownData,
  showDetail,
  error
}) => {
  const [formData, setFormData] = useState(data);
  return (
    <div className="col col-sm-12">
      <form onSubmit={onSubmit}>
        <h6>Academics</h6>
        <Row>
          <input
            type="hidden"
            id="degree_level"
            value={formData?.degree_level}
          />
          <InputField
            id="degree_level1"
            label="Degree Level"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                degree_level: dropDownData?.degreeLevels?.find(
                  ({ name }) => name === value
                )?.id
              })
            }
            list="degree_levels"
            defaultValue={formData?.degree_level}
            width={4}
            error={error?.degree_level}
          />
          <datalist id="degree_levels">
            {dropDownData?.degreeLevels?.map(({ id, name }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </datalist>

          <input id="id" value={formData?.id || undefined} type="hidden" />

          <InputField
            error={error?.degree_title}
            id="degree_title"
            label={showDetail ? "Degree Title" : "Course Name"}
            required
            defaultValue={formData?.degree_title || undefined}
            width={4}
          />

          <input type="hidden" id="category" value={formData?.category} />
          <InputField
            error={error?.category}
            id="category1"
            label="Category"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                category:
                  dropDownData?.categories?.find(({ name }) => name === value)
                    ?.id || value
              })
            }
            list="categorys"
            defaultValue={formData?.category}
            width={4}
          />
          <datalist id="categorys">
            {dropDownData?.categories?.map(({ id, name }) => (
              <option value={name} key={id}>
                {name}
              </option>
            ))}
          </datalist>

          <InputField
            error={error?.academic_score}
            id="academic_score"
            label="Score"
            required
            width={4}
            defaultValue={formData?.academic_score || undefined}
          />

          <input type="hidden" id="score_type" value={formData?.score_type} />
          <InputField
            error={error?.score_type}
            id="score_type1"
            label="Score Type"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                score_type: [
                  { key: 0, value: "Percentage" },
                  { key: 1, value: "GPA" }
                ].find((a) => a.value === value)?.key
              })
            }
            list="score_types"
            defaultValue={formData?.score_type}
            width={4}
          />
          <datalist id="score_types">
            {[
              { key: 0, value: "Percentage" },
              { key: 1, value: "GPA" }
            ].map(({ key, value }) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
          </datalist>

          <InputField
            error={error?.institute}
            id="institute"
            label="Institute"
            width={4}
            required
            defaultValue={formData?.institute || undefined}
          />

          <input
            type="hidden"
            id="institute_country"
            value={formData?.institute_country}
          />
          <InputField
            error={error?.institute_country}
            id="institute_country1"
            label="Institute Country"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                institute_country: dropDownData?.countries?.find(
                  ({ name }) => name === value
                )?.id
              })
            }
            list="institute_countrys"
            defaultValue={formData?.institute_country}
            width={4}
          />
          <datalist id="institute_countrys">
            {dropDownData?.countries?.map(({ key, name }) => (
              <option value={name} key={key}>
                {name}
              </option>
            ))}
          </datalist>

          <input type="hidden" id="start_year" value={formData?.start_year} />
          <InputField
            error={error?.start_year}
            id="start_year1"
            label="Start Year"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                start_year: value
              })
            }
            list="start_years"
            defaultValue={formData?.start_year}
            width={4}
          />
          <datalist id="start_years">
            {Array(25)
              .fill(0)
              .map((_, idx) => (
                <option
                  value={`${new Date().getFullYear() - idx}`}
                  key={`${new Date().getFullYear() - idx}`}
                >
                  {`${new Date().getFullYear() - idx}`}
                </option>
              ))}
          </datalist>

          <input type="hidden" id="end_year" value={formData?.end_year} />
          <InputField
            error={error?.end_year}
            id="end_year1"
            label="Start Year"
            required
            onChange={({ target: { value } }) =>
              setFormData({
                ...formData,
                end_year: value
              })
            }
            list="end_years"
            defaultValue={formData?.end_year}
            width={4}
          />
          <datalist id="end_years">
            {Array(25)
              .fill(0)
              .map((_, idx) => (
                <option
                  value={`${new Date().getFullYear() - idx}`}
                  key={`${new Date().getFullYear() - idx}`}
                >
                  {`${new Date().getFullYear() - idx}`}
                </option>
              ))}
          </datalist>
        </Row>
        <Divider />
        <div
          className={`pull-right ${
            showDetail ? "" : "d-flex justify-content-center"
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
          ) : null}
        </div>
      </form>
    </div>
  );
};

export default AcademicsForm;
