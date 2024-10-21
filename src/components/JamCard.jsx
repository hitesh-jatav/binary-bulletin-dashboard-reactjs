import React from "react";

const JamCard = () => {
  return (
    <div className="m-2">
      <div className="container mt-3 mb-0 p-0">
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Card Title</h5>
            <p className="card-text">
              This is a brief description of the card content. You can put any
              content here.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JamCard;
