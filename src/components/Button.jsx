import React from 'react';
import '../styles/Button.css';

const Button = ({ type = "button", onClick, children, className = "", ...props }) => (
  <button
    type={type}
    onClick={onClick}
    className={`custom-btn ${className}`}
    onKeyDown={(e) => {
      if (type === "submit" && e.key === "Enter") {
        e.preventDefault();
        e.target.click();
      }
    }}
    {...props}
  >
    {children}
  </button>
);

export default Button;
