
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
   
    <Route path="/blogs" element={<Blogs/>} />

    <Route path="/blogs/:slug" element={<BlogDetail/>} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default AppRoutes;
