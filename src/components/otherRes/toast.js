import React from "react";
import "../css/toast.css";

const Toast = ({ type, title, message, onclickFun }) => {
    let icon =
        type === "error"
            ? "fa-circle-xmark"
            : type === "success"
            ? "fa-circle-check"
            : type === "info"
            ? "fa-circle-info"
            : type === "warning" && "fa-circle-exclamation";

    return (
        <div
            className={`bg-white ${type} toast-cus d-flex py-2 px-3 align-items-center gap-2 justify-content-center`}
        >
            <i className={`fa-solid ${icon}`} />
            <div className="inner-container">
                <strong>{title}</strong>
                <p className="m-0">{message}</p>
            </div>
            <button
                className="btn-close align-self-baseline"
                onClick={onclickFun}
                type="button"
            />
        </div>
    );
};

export default Toast;
