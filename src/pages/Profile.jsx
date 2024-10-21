import React, { useState } from "react";
import imgSrc from "../assets/images/fill 4.png";
import Input from "../components/FormInputs/Input";
import TextArea from "../components/FormInputs/TextArea";

const Profile = ({ edit = false }) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    dateOfBirth: "1990-01-01",
    dateOfJoining: "2022-01-01",
    role: "Master Admin",
    duration: "4 months",
    username: "@amazing_john",
    bio: "Chasing sunsets and dreams, Chasing sunsets and dreams",
  });

  return (
    <div className=" mt-4 h-100">
      {/* Flex container for profile image and info */}
      <div className="row">
        {/* Profile Image */}
        <div className="profile-image-container col-md-4 col-sm-12 col-lg-4 p-3">
          <img
            src={imgSrc} // Replace with user's image URL
            alt="Profile"
            className="img-fluid "
            style={{
              objectFit: "cover",
              borderRadius: "50px",
              maxHeight: "500px",
            }}
          />
        </div>

        {/* Profile Details */}
        <div className="px-5 py-3 col-md-4 col-sm-12 col-lg-8">
          {/* Edit Button */}

          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-6 mb-3 ">
              <Input
                label={"Usename"}
                value={profile.username}
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
                disabled={!edit}
                className="p-2"
              />
              <Input
                label={"Name"}
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                disabled={!edit}
                className="p-2"
              />
            </div>

            <div className="col-md-6 col-sm-12 col-lg-6 mb-3 ">
              <TextArea
                label={"Bio"}
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                disabled={!edit}
                className="p-2"
              />
            </div>

            <div className="col-md-6 col-sm-12 col-lg-6 mb-3">
              <Input
                label={"Email"}
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                disabled={!edit}
                className=""
              />
            </div>

            <div className="col-md-6 col-sm-12 col-lg-6 mb-3">
              <Input
                label={"Phone"}
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
                disabled={!edit}
                className=""
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6 mb-3">
              <Input
                label={"Duration"}
                value={profile.duration}
                onChange={(e) =>
                  setProfile({ ...profile, duration: e.target.value })
                }
                disabled={!edit}
                className=""
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6 mb-3">
              <Input
                label={"Role"}
                value={profile.role}
                onChange={(e) =>
                  setProfile({ ...profile, role: e.target.value })
                }
                disabled={!edit}
                className=""
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6 mb-3"></div>
          </div>
        </div>
      </div>

      {edit && (
        <div className="d-flex justify-content-end px-4">
          <button className="btn btn-primary">Update Information</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
