import React from "react";
import PlaneImg from "../assets/gif/loading-plane.gif";

const PageLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "550px",
      }}
    >
      <img src={PlaneImg} alt="loading" height={100}/>
    </div>
  );
}; 

export default PageLoader;
