import React, { useState } from "react";
import Input from "../FormInputs/Input";

const Account = () => {
  const [info, setInfo] = useState({
    password: "qwertyuiop",
  });
  return (
    <div>
      <div className="row my-5">
        <div className="col-md-4 col-sm-12 col-lg-4">
          <Input
            label={"Old Password"}
            value={info.password}
            onChange={() => {}}
            disabled={false}
            className={""}
            type={"password"}
          />
        </div>
        <div className="col-md-4 col-sm-12 col-lg-4">
          <Input
            label={"New Password"}
            value={info.password}
            onChange={() => {}}
            disabled={false}
            className={""}
            type={"password"}
          />
        </div>
        <div className="col-md-4 col-sm-12 col-lg-4">
          <button className="btn btn-primary mt-3">Update Password</button>
        </div>

        <div className="col-md-6 col-sm-12 col-lg-6 d-flex my-3 align-items-center mt-5">
          <span className="fz-25">Not happy with the services ? </span>
          <button className="btn mx-5 rounded-pill p-3  border-danger">
            Permanently Delete
          </button>
        </div>

        <div className="col-md-6 col-sm-12 col-lg-6 d-flex my-3 align-items-center mt-5">
          <span className="fz-25">Want a break from the site ? </span>
          <button className="btn mx-5 rounded-pill p-3 border-danger">
            Temporarily Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
