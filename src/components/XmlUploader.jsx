import React, { useState } from "react";
import XMLParser from "react-xml-parser";

const XmlUploader = ({ onUpload, disabled }) => {
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file type
    if (file.type !== "text/xml" && file.type !== "application/xml") {
      setError("Please upload a valid XML file.");
      setFileName("");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsedData = new XMLParser().parseFromString(text);
        onUpload(parsedData.children);
        setError(null);
        setFileName(file.name); // Store the file name for feedback
      } catch (err) {
        setError("Failed to parse XML file. Please check the file format.");
      }
    };

    reader.onerror = () => {
      setError("Error reading file");
    };

    reader.readAsText(file);
  };

  const handleReset = () => {
    setFileName("");
    setError(null);
  };

  return (
    <div>
      <h2>Upload XML File</h2>
      <input
        type="file"
        accept=".xml"
        onChange={handleFileChange}
        disabled={disabled}
      />
      {fileName && <div>File uploaded: {fileName}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {fileName && <button onClick={handleReset}>Upload Another File</button>}
    </div>
  );
};

export default XmlUploader;
