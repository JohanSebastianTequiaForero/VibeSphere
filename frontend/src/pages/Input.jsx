import React, { useState } from "react";
import "./Input.css";

const Input = ({ label, type = "text", name, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={value || focused ? "has-value" : ""}
        required
      />
      <label className={value || focused ? "active" : ""}>{label}</label>
    </div>
  );
};

export default Input;
