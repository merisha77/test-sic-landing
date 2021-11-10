import React from "react";
import { Row } from "reactstrap";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";
import useEnglishTest from "src/utilities/useEnglishTest";

const EnglishTestPage = ({ formData, onChange }) => {
  const englishTests = useEnglishTest();
  return (
    <div className="p-4">
      <h5 className="text-center">What is your English level?</h5>
      <Row>
        <SelectInput
          width={12}
          className="rounded"
          id="english_name"
          label="English Test"
          value={formData?.english_name}
          size="middle"
          onChange={(value) => onChange("english_name", value)}
          options={
            englishTests?.map(({ id, name }) => ({ key: id, value: name })) ||
            []
          }
          initAtFirst
        />
        <InputField
          width={12}
          required
          min="0"
          type="number"
          id="overall_score"
          label="Overall Score"
          size="middle"
          value={formData?.overall_score || undefined}
          onChange={({ target: { id, value } }) => onChange(id, value)}
        />
      </Row>
    </div>
  );
};

export default EnglishTestPage;
