import React from "react";
import { Button } from "react-bootstrap";

const CustomMultiSelect = ({
  options,
  selected,
  onSelected,
  onRemoved,
  disabled,
}) => {
  return (
    <div
      className="border p-2"
      style={{
        backgroundColor: "#E9EED9",
      }}
    >
      {selected?.map((item) => (
        <Button
          disabled={disabled}
          key={item}
          variant="outline-secondary"
          className="me-2 mb-2 align-items-center"
          size="sm"
        >
          {options.find((opt) => opt._id === item)?.name}
          <i
            className=" mx-2 fa-solid fa-xmark"
            onClick={() => onRemoved(item)}
          ></i>
        </Button>
      ))}

      <select
        disabled={disabled}
        className="form-select "
        onChange={(e) => onSelected(e.target.value)}
      >
        <option disabled selected>
          Select Category
        </option>
        {options?.map((opt) => (
          <option value={opt._id} key={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomMultiSelect;
