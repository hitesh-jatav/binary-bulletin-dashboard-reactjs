import React from "react";

const TextArea = ({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <span className="input-label text-secondary">{label}</span>}
      <br />
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="textarea-field border fz-25 w-100 bg-none px-2"
        style={{
          fontSize: "28px",
          padding: "0px",
          resize: "none", // Disable resizing
        }}
        rows="3"
      />
    </div>
  );
};

export default TextArea;
