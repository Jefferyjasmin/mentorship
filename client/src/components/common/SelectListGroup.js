import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((option) => (
    <option key={option.lable} value={option.value}>
      {option.lable}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames(" form-control form-control-lg", {
          "is-invalid": error,
        })}
        value={value}
        onChange={onChange}
        name={name}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback"> {error}</div>}
    </div>
  );
};
SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,

  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,

  onChange: PropTypes.func.isRequired,
};

export default SelectListGroup;
