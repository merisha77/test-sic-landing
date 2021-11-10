import React, { useState, useEffect } from "react";
import { Input, Radio, Select } from "antd";
const { Option } = Select;

const InputField = ({
  id,
  label,
  width = 6,
  size = "large",
  wrapperStyle = {},
  children,
  required,
  ...rest
}) => (
  <div className={`form-group col-md-${width}`} style={wrapperStyle}>
    <label htmlFor={id}>
      {label} {!!required ? <span className="text-danger">*</span> : null}
    </label>
    <Input
      id={id}
      size={size}
      placeholder={rest.placeHolder || label}
      required={required}
      {...rest}
    />
    {!!rest?.error ? (
      <small className="text-danger">{rest?.error}</small>
    ) : null}
    {children}
  </div>
);

export default InputField;

export const RadioButtons = ({
  id,
  label,
  value,
  options,
  setValue,
  width = 6,
  defaultValue
}) => (
  <div className={`form-group col-md-${width}`}>
    <label htmlFor={id} style={{ display: "block" }}>
      {label}
    </label>
    <input type="hidden" id={id} value={value} />
    <Radio.Group
      defaultValue={defaultValue}
      size="large"
      onChange={({ target: { value } }) => setValue(value)}
    >
      {!!options &&
        options.map(
          (o) =>
            o.value !== null && (
              <Radio.Button key={o.value} value={o.value}>
                {o.label}
              </Radio.Button>
            )
        )}
    </Radio.Group>
  </div>
);

export const SelectInput = ({
  id,
  label,
  options = [],
  width = 6,
  value = undefined,
  required,
  onChange,
  notFoundContent = null,
  initAtFirst,
  allowClear = true,
  showSearch = true,
  ...rest
}) => {
  //  const [option, setOption] = useState(initAtFirst ? options : undefined);

  const [option, setOption] = useState(options);

  const onSearch = (text) => {
    setOption(
      options?.filter((o) =>
        o?.value?.toLowerCase()?.includes(text?.toLowerCase())
      )
    );
  };

  //  const changeHandler = (value) => {
  //    if (initAtFirst) {
  //      setOption(options);
  //    } else setOption([]);

  //    onChange(value);
  //  };

  const changeHandler = (value) => {
    setOption(options);
    onChange(value);
  };

  //  useEffect(() => {
  //    if (initAtFirst) {
  //      setOption(options);
  //    }
  //  }, [options]);

  return (
    <div
      className={`form-group col-lg-${width} col-md-${width}`}
      style={{ display: "grid", ...rest?.customStyles }}
    >
      <label htmlFor={id}>{label}</label>
      <input id={id} value={value} type="hidden" required={required} />
      <Select
        size="large"
        id={`${id}-unused`}
        allowClear={allowClear}
        showSearch={showSearch}
        placeholder={label}
        onSearch={showSearch ? onSearch : undefined}
        notFoundContent={notFoundContent}
        onChange={changeHandler}
        optionFilterProp="children"
        defaultActiveFirstOption={false}
        value={options?.find((a) => a.key === value)?.value}
        defaultValue={options?.find((a) => a.key === value)?.key}
        {...rest}
      >
        {option?.map(({ key, value }, idx) => (
          <Option value={key} key={`${key}-${idx}`}>
            {value}
          </Option>
        ))}
      </Select>
    </div>
  );
};
