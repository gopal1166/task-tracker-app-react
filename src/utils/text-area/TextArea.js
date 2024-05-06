import React from "react";
import "./TextArea.scss";

const TextArea = (props) => {
  const { placeholder, label, value } = props;
  return (
    <div className="text-area-container">
      <label htmlFor="text-input">{label}</label>
      <textarea
        id="text-input"
        className="text-input"
        placeholder={placeholder}
        value={value}
        onChange={(event) => props.handleTextArea(event)}
      />
    </div>
  );
};

export default TextArea;
