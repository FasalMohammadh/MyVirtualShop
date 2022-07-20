import React, { useState, useContext } from "react";
import ShopsTable from "./otherRes/adminRelated/shopsTable";
import ProductTable from "./otherRes/adminRelated/productTable";
import Dashboard from "./otherRes/adminRelated/adminDashboard";
import SmartPhoneTable from "./otherRes/adminRelated/smartPhoneTable";
import FeaturePhoneTable from "./otherRes/adminRelated/featurePhoneTable";
import EarphoneTable from "./otherRes/adminRelated/earphoneTable";
import ChargerTable from "./otherRes/adminRelated/chargerTable";
import "./css/adminMain.css";
import { AuthContext } from "./PathNav";

const AdminMain = () => {
    const auth = useContext(AuthContext);
    const [componentToLoad, setComponentToLoad] = useState("dashboard");

    const handleClick = (event) =>
        setComponentToLoad(event.target.dataset.component);

    const allSideBtnsDetails = [
        {
            title: "Dashboard",
            dataComponent: "dashboard",
            icon: "fa-gauge",
        },
        {
            title: "Products",
            dataComponent: "products",
            icon: "fa-cart-shopping",
        },
        {
            title: "Shops",
            dataComponent: "shops",
            icon: "fa-store",
        },
        {
            title: "SmartPhone",
            dataComponent: "smartPhone",
            icon: "fa-mobile-button",
        },
        {
            title: "FeaturePhone",
            dataComponent: "featurePhone",
            icon: "fa-blender-phone",
        },
        {
            title: "Earphone",
            dataComponent: "earphone",
            icon: "fa-headphones-simple",
        },
        {
            title: "Charger",
            dataComponent: "charger",
            icon: "fa-charging-station",
        },
    ];

    return (
        <div className="d-flex" style={{ maxWidth: "100%" }}>
            <div className="sidebar-btn-container">
                {allSideBtnsDetails.map((sidebarBtnDetails) => (
                    <SidebarBtn
                        key={sidebarBtnDetails.dataComponent}
                        {...sidebarBtnDetails}
                        onclickFun={handleClick}
                        active={
                            componentToLoad === sidebarBtnDetails.dataComponent
                        }
                    />
                ))}
                <div
                    onClick={() => {
                        document.cookie = "id=;max-age=0";
                        localStorage.setItem("role", "");
                        auth.setAuthRole("");
                    }}
                    className="rounded-3 admin-side-btn fw-normal p-2 d-flex align-items-center gap-2 text-nowrap h3"
                >
                    <i className="fa-solid pe-none rounded-3 icon-1 fa-right-from-bracket" />
                    <p className="m-0 pe-none">Logout</p>
                </div>
            </div>
            <div className="flex-fill p-2 am-content-box">
                {(() => {
                    switch (componentToLoad) {
                        case "dashboard":
                            return <Dashboard />;
                        case "products":
                            return <ProductTable />;
                        case "shops":
                            return <ShopsTable />;
                        case "smartPhone":
                            return <SmartPhoneTable />;
                        case "featurePhone":
                            return <FeaturePhoneTable />;
                        case "earphone":
                            return <EarphoneTable />;
                        case "charger":
                            return <ChargerTable />;
                    }
                })()}
            </div>
        </div>
    );
};

export const SidebarBtn = (props) => (
    <div
        tabIndex="0"
        role="button"
        aria-pressed="true"
        data-component={props.dataComponent}
        onClick={props.onclickFun}
        className={`rounded-3 admin-side-btn fw-normal p-2 d-flex align-items-center gap-2 text-nowrap h3 ${
            props.active && "sidebarBtnActive"
        }`}
    >
        <i className={`fa-solid pe-none rounded-3 icon-1 ${props.icon} `} />
        <p className="m-0 pe-none"> {props.title}</p>
        <i
            className={`icon-2 fa-solid fa-${
                props.active ? "circle-" : ""
            }chevron-right pe-none`}
        />
    </div>
);

export default AdminMain;
