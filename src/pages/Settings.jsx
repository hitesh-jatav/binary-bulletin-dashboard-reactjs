import React, { useState } from "react";
import Profile from "./Profile";
import Account from "../components/Settings/Account";
import Appearance from "../components/Settings/Appearance";
import Notifications from "../components/Settings/Notifications";

const settingTabs = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
];

const Settings = () => {
  const [currentSettingTab, setCurrentSettingTab] = useState("profile");

  return (
    <div>
      <ul className="nav nav-tabs">
        {settingTabs.map((tab, id) => (
          <button
            key={`setting-tab-index` + tab.id + id}
            className={`nav-link text-black ${
              currentSettingTab === tab.id ? "active" : ""
            }`}
            aria-current="page"
            onClick={() => setCurrentSettingTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </ul>

      {currentSettingTab === "profile" && <Profile edit={true} />}
      {currentSettingTab === "account" && <Account />}
      {currentSettingTab === "appearance" && <Appearance />}
      {currentSettingTab === "notifications" && <Notifications />}
    </div>
  );
};

export default Settings;
