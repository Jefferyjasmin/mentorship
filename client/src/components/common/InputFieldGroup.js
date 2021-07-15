import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputFieldGroup = ({
  name,
  placeholder,
  value,
  icon,
  error,

  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span style={{ height: "49px" }} className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames(" form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />

      {error && <div className="invalid-feedback"> {error}</div>}
    </div>
  );
};
InputFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputFieldGroup.defualtProps = {
  type: "text",
};
export default InputFieldGroup;
