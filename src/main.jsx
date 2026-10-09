import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Jobseekers from "./pages/Jobseekers";
import Employers from "./pages/Employers";
import Agencies from "./pages/Agencies";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobseekers" element={<Jobseekers />} />
          <Route path="/employers" element={<Employers />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
