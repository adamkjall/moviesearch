import React from "react";

import "./styles.scss";

interface IProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
  value: string,
  name: string,
  type: string,
  required: boolean
}

const FormInput : React.FC<IProps> = ({ handleChange, label, value, name, type }) => (
  <div className="group">
    <input
      className="form-input"
      name={name}
      value={value}
      type={type}
      onChange={handleChange}
      required
    />
    {label ? (
      <label
        className={`${
          value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
