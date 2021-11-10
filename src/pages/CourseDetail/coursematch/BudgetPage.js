import React from "react";
import { Row } from "reactstrap";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";

const BudgetPage = ({ onChange, countries, formData }) => {
  return (
    <div className="p-4">
      <h6 className="text-center">
        How much can you spend on <strong>tuition fees and living</strong>?
      </h6>
      <Row>
        <SelectInput
          width={12}
          className="rounded"
          id="currency"
          label="Currency"
          size="middle"
          value={formData?.currency}
          onChange={(value) => onChange("currency", value)}
          options={
            countries?.map(({ name, currency: { code } }) => ({
              key: code,
              value: `${code} - ${name}`,
            })) || []
          }
          initAtFirst
          required
        />
        <InputField
          width={12}
          required
          min="0"
          size="middle"
          type="number"
          id="tuition_fee"
          label="Tuition Fee (per year)"
          value={formData?.tuition_fee || undefined}
          onChange={({ target: { id, value } }) => onChange(id, value)}
        />
        <InputField
          width={12}
          // required
          min="0"
          size="middle"
          type="number"
          id="living_cost"
          label="Living Cost (per year)"
          value={formData?.living_cost || undefined}
          onChange={({ target: { id, value } }) => onChange(id, value)}
        />
      </Row>
    </div>
  );
};

export default BudgetPage;
