import React from "react";
import PropTypes from "prop-types";

const ConfirmBox = ({ title, message, onCancel, onConfirm, open }) => {
  if (!open) return null; // If open is false, do not render the confirm box

  return (
    <div className="confirm-box-overlay">
      <div className="confirm-box">
        <p className="text-left">{title}</p>
        <p className="text-left p-3">{message}</p>
        <div className="confirm-box-actions d-flex justify-content-end mt-4">
          <button className="btn btn-secondary align-items-center mr-1" onClick={onCancel}>
          Cancel
          </button>
          <button className="btn btn-danger align-items-center" onClick={onConfirm}>
             Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop types for validation
ConfirmBox.propTypes = {
  title: PropTypes.string.isRequired, // Title of the confirm box
  message: PropTypes.string.isRequired, // Message to display
  onCancel: PropTypes.func.isRequired, // Function to call on cancel
  onConfirm: PropTypes.func.isRequired, // Function to call on confirm
  open: PropTypes.bool.isRequired, // Whether the confirm box is open or closed
};

export default ConfirmBox;
