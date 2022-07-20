import React, { useState } from "react";
import "../css/TextBox.css";

export default function ({ value, onchangeFun, name, title, className }) {
    const [type, setType] = useState("password");

    return (
        <div
            className={`form-group d-flex align-items-center bg-white border-2 rounded-3 border border-dark iconBox form-control-lg mx-auto ${className}`}
        >
            <input
                type={type}
                className="form-control form-control-sm border-0 rounded-0"
                value={value}
                onChange={onchangeFun}
                name={name}
            />
            <label className={`lbl ${value ? "change" : ""}`}>{title}</label>
            <i
                onClick={() =>
                    type === "text" ? setType("password") : setType("text")
                }
                className={`TextBox-Icon fa-solid ${
                    type === "text" ? "fa-eye-slash" : "fa-eye"
                } fa-2x me-1`}
            />
        </div>
    );
}
