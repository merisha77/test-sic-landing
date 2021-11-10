//TODO: This needs verification

import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "reactstrap";
import { Divider, notification } from "antd";
import InputField, { SelectInput } from "src/pages/StudyInfoCentre/InputField";
import { DoubleRightOutlined } from "@ant-design/icons";
import APIServices from "src/apiUtils/APIServices";

const Budget = ({ showDetail = true, fetchBudget }) => {
  const [formData, setFormData] = useState();
  const [isLoading, setIsLoading] = useState();
  const [currencies, setCurrencies] = useState({});

  const api = new APIServices("profile/client-budget/");

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    let isValid = true;
    let data = {};
    Array.from(form.elements).forEach((a) => {
      if (a.checkValidity()) {
        if (!!a.id && !!a.value) data[a.id] = a.value;
      } else isValid = false;
    });
    if (!!isValid) !!data && onUpdate(data);
  };

  const onUpdate = async (data) => {
    setIsLoading(true);
    const { success } = await api.post(data);
    if (success) {
      notification.success({ message: "Budget updated successfully!" });
      setIsLoading(false);
      fetchBudget();
    } else {
      notification.error({ message: "Could not update budget." });
      setIsLoading(false);
    }
  };

  const fetchBudgett = async (_) => {
    const { data, success } = await api.get();
    if (success) {
      setFormData(data);
    }
    const rate = await new APIServices("rate-converter/").post();
    if (rate.success) {
      setCurrencies(rate.data?.data?.rate);
    }
  };

  useEffect(() => {
    if (!!formData) {
    } else fetchBudgett();
  }, []);

  return (
    <Row>
      <Col lg="12" className="mt-4">
        <span className="justify-content-space-between">
          <h5>Budget :</h5>
        </span>
      </Col>
      <Col lg="12" sm="12" md="12">
        <form onSubmit={submitHandler}>
          <Row>
            <SelectInput
              width={4}
              id="currency"
              label="Currency"
              value={formData?.currency}
              onChange={(_value) =>
                setFormData({ ...formData, currency: _value })
              }
              options={
                Object.keys(currencies)?.map((currency) => ({
                  key: currency,
                  value: currency,
                })) || []
              }
              initAtFirst
            />
            <InputField
              width={4}
              type="number"
              id="tuition_fee"
              label="Tuition Fee"
              onChange={({ target: { value } }) =>
                setFormData({ ...formData, tuition_fee: value })
              }
              value={Number(formData?.tuition_fee)}
            />
            <InputField
              width={4}
              type="number"
              id="living_cost"
              label="Living Cost"
              value={Number(formData?.living_cost)}
              onChange={({ target: { value } }) =>
                setFormData({ ...formData, living_cost: value })
              }
            />
          </Row>

          <Divider />

          <div className="pull-right" style={{ marginBottom: 16 }}>
            {showDetail ? (
              <button
                className="ant-btn btn-primary btn-primary pull-right"
                name="submit-button"
                type="submit"
                disabled={isLoading ? "disabled" : undefined}
              >
                Update&nbsp;
                {isLoading ? <Spinner size={25} /> : null}
              </button>
            ) : (
              <button
                className="btn btn-secondary btn-lg"
                name="submit-button"
                type="submit"
              >
                Save & Continue&nbsp;
                <DoubleRightOutlined size={15} />
              </button>
            )}
          </div>
        </form>
      </Col>
    </Row>
  );
};

export default Budget;
