import React from "react";
import "../css/TextBox.css";

export default function TextBox({
    value,
    type,
    onchangeFun,
    name,
    title,
    icon,
    className,
    ...otherTxtAttrs
}) {
    let classList = value !== "" && "change";

    return (
        <div
            className={`form-group d-flex align-items-center bg-white border-2 rounded-3 border border-dark iconBox form-control-lg mx-auto ${className}`}
        >
            <input
                {...otherTxtAttrs}
                type={type}
                className="form-control form-control-sm border-0 rounded-0"
                value={value}
                onChange={onchangeFun}
                name={name}
            />
            <label className={`lbl ${classList}`}>{title}</label>
            <i className={`TextBox-Icon ${icon} fa-2x me-1`} />
        </div>
    );
}
