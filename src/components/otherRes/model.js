import React from "react";

export default function ({
    hide,
    title,
    message,
    children,
    onclickConfirm,
    onclickCancel,
}) {
    const styleModel = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        border: "1px solid rgba(209, 213, 219, 0.3)",
    };

    const styleBg = {
        backdropFilter: "blur(.1em) saturate(100%)",
        // WebkitBackdropFilter: "blur(16px) saturate(180%)",
        top: 0,
        left: 0,
        zIndex: 2,
        position: "fixed",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0,0,0,0.2)",
    };

    return (
        <div className={`${hide && "d-none"}`} style={styleBg}>
            <div
                className="bg-white box rounded-3 text-center"
                style={styleModel}
            >
                <h3 className="fw-normal">{title}</h3>
                <p className="text-muted">{message}</p>
                {children}
                <div className="d-flex justify-content-around flex-wrap gap-2">
                    <button
                        className="btn btn-warning btn-lg"
                        onClick={onclickCancel}
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-info btn-lg"
                        onClick={onclickConfirm}
                        type="button"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
