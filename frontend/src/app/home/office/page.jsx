// src/app/home/office/page.jsx
"use client"; 
import React from "react";
import CaptureComponent from "../../../components/trackingComponents/captureComponent";

const Page = () => {
  return (
    <div className="p-4">
      <h2>Office list</h2>
      <ul>
        <li>Office 1</li>
        <li>Office 2</li>
        <li>Office 3</li>
        <li>Office 4</li>
      </ul>
      <h3>Hello Photo</h3>
      <CaptureComponent />
    </div>
  );
};

export default Page;
