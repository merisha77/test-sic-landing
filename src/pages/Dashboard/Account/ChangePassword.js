import React, { useState } from "react";
import {
  Row,
  Col
} from "reactstrap";
import APIServices from "src/apiUtils/APIServices";
import { notification } from "antd";
import InputField from "src/components/drawer/InputField";
export const ChangePassword = ({ toggle }) => {
  const [ formData, setFormData ] = useState();
  const [ showConfirmMessage, setShowConfirmMessage ] = useState(false);

  const changeHandler = ({ target: { id, value } }) => {
    if (id === "confirm_password")
      setShowConfirmMessage(true);
    setFormData({ ...formData, [ id ]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (e.target?.checkValidity()) {
      const { data, success } = await new APIServices("update_password/").put(
        0,
        formData
      );
      if (success) {
        notification.success({ message: data?.message });
        toggle("1");
      }
      else {
        notification.error({ message: data?.message });
      }
    }
  };

  return (
    <Col lg={ 8 } md={ 8 } sm={ 12 }>
      <div className="login_page">
        <div className="text-center">
          <h4 className="mb-4">Change Password</h4>
        </div>
        <form className="login-form" onSubmit={ submitHandler }>
          <Row>
            <InputField
              width={ 12 }
              wrapperClassName={ "position-relative" }
              label={ <>
                Old Password <span className="text-danger">*</span>
              </> }
              icon={ <i className="mdi mdi-key ml-3 icons" /> }
              type="password"
              placeholder="Old Password"
              id="old_password"
              onChange={ changeHandler }
              value={ formData?.old_password }
              autoComplete="off"
              autoFocus="true"
              required />
            <InputField
              width={ 12 }
              wrapperClassName={ "position-relative" }
              label={ <>
                Password <span className="text-danger">*</span>
              </> }
              icon={ <i className="mdi mdi-key ml-3 icons" /> }
              type="password"
              placeholder="Password"
              id="password"
              onChange={ changeHandler }
              value={ formData?.password }
              autoComplete="off"
              required />
            <InputField
              width={ 12 }
              wrapperClassName={ "position-relative" }
              label={ <>
                Confirm Password <span className="text-danger">*</span>
              </> }
              icon={ <i className="mdi mdi-key ml-3 icons" /> }
              type="password"
              placeholder="Confirm Password"
              id="confirm_password"
              autoComplete="off"
              onChange={ changeHandler }
              value={ formData?.confirm_password }
              required
            >
              { showConfirmMessage &&
                formData?.password !== formData?.confirm_password ? (
                  <div class="ant-form-item-explain text-secondary">
                    <div>Password does not matches.</div>
                  </div>
                ) : null }
            </InputField>
            <input
              type="submit"
              value="Change Password"
              className="btn btn-primary" />
          </Row>
        </form>
      </div>
    </Col>
  );
};
