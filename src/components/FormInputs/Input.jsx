import React from "react";

const Input = ({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
  type="text",
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <span className="input-label text-secondary">{label}</span>}
      <br />
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="input-field border-0 fz-25 px-2"
        style={{ fontSize: "28px", padding: "0px" }} // Adjust font size and padding
      />
    </div>
  );
};

export default Input;
