import React from "react";
import { Row } from "reactstrap";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";

const EducationPage = ({ formData, onChange, countries, categories }) => (
  <div className="p-4">
    <h6 className="text-center">Which university/school did you go to?</h6>
    <Row>
      <SelectInput
        width={12}
        className="rounded"
        id="country"
        label="Country"
        size="middle"
        value={formData?.country}
        onChange={(value) => onChange("country", value)}
        options={
          countries?.map(({ name }) => ({
            key: name,
            value: name,
          })) || []
        }
        initAtFirst
      />

      <InputField
        width={12}
        required
        id="institute"
        label="Institute"
        size="middle"
        value={formData?.institute || undefined}
        onChange={({ target: { id, value } }) => onChange(id, value)}
      />

      <SelectInput
        width={12}
        className="rounded"
        id="category"
        label="Course Category"
        value={formData?.category}
        size="middle"
        onChange={(value) => onChange("category", value)}
        options={
          categories?.map(({ id, name }) => ({
            key: id,
            value: name,
          })) || []
        }
        initAtFirst
      />

      <SelectInput
        width={12}
        className="rounded"
        id="score_type"
        label="Score Type"
        value={formData?.score_type}
        size="middle"
        onChange={(value) => onChange("score_type", value)}
        options={[
          { key: 0, value: "Percentage" },
          { key: 1, value: "GPA" },
        ]}
        initAtFirst
      />
      <InputField
        width={12}
        required
        min="0"
        id="academic_score"
        size="middle"
        label="Score"
        value={formData?.academic_score || undefined}
        onChange={({ target: { id, value } }) => onChange(id, value)}
      />
    </Row>
  </div>
);

export default EducationPage;
