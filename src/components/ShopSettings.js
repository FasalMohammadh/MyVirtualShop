import React, { useEffect, useState, useContext } from "react";

import EditInfo from "./otherRes/shopSettingRelated/EditInfo";
import ManageProducts from "./otherRes/shopSettingRelated/ManageProducts";
import ChangePassword from "./otherRes/shopSettingRelated/ChangePassword";
import { axiosCus } from "./otherRes/commonFun";

import NavBar from "./Navbar";
import { AuthContext } from "./PathNav";
import { SidebarBtn } from "./adminMain";

import "./css/shopSettings.css";

export default function () {
  const auth = useContext(AuthContext);
  const [nowLoadedComponent, setNowLoadedComponent] = useState("1");
  const [shopName, setShopName] = useState("");

  const loadComponent = () => {
    switch (nowLoadedComponent) {
      case "1":
        return <EditInfo />;
      case "2":
        return <ManageProducts />;
      case "3":
        return <ChangePassword />;
      default:
        break;
    }
  };

  const handleClick = (event) =>
    setNowLoadedComponent(event.target.dataset.component);

  useEffect(
    () =>
      axiosCus
        .post("/shop")
        .then((response) => setShopName(response.data.shop_name))
        .catch((error) => console.log(error)),
    []
  );

  return (
    <React.Fragment>
      <NavBar />
      <div className="mt-5 setting d-md-flex col-md-10 mx-md-auto box mb-5">
        <section>
          <div>
            <div className="setting-main-icon bg-light mx-auto rounded-circle">
              <i className="fas fa-store fa-5x" />
            </div>
            <h2 className="text-center mt-2">{shopName}</h2>
          </div>
          <div className="d-md-none p-2 text-center d-flex align-items-center justify-content-between">
            <h2 className="flex-fill">Settings</h2>
            <i role="button" className="fas fa-bars fa-2x" />
          </div>
          <div className="p-0 d-none d-md-block">
            <SidebarBtn
              onclickFun={handleClick}
              dataComponent="1"
              icon="fas fa-circle-info"
              title="Shop Information"
              active={nowLoadedComponent === "1"}
            />
            <SidebarBtn
              onclickFun={handleClick}
              dataComponent="2"
              icon="fas fa-bars-progress"
              title="Manage Products"
              active={nowLoadedComponent === "2"}
            />
            <SidebarBtn
              onclickFun={handleClick}
              dataComponent="3"
              icon="fas fa-lock"
              title="Change Password"
              active={nowLoadedComponent === "3"}
            />
            <SidebarBtn
              onclickFun={() => {
                localStorage.setItem("role", "");
                auth.setAuthRole("");
              }}
              dataComponent="4"
              icon="fas fa-right-from-bracket"
              title="Logout"
              active={nowLoadedComponent === "4"}
            />
          </div>
        </section>
        <div className="flex-fill p-2 my-auto">{loadComponent()}</div>
      </div>
    </React.Fragment>
  );
}

function SettingsBtns(props) {
  return (
    <div
      data-show={props.data}
      onClick={props.onclickFun}
      role="button"
      className="p-2 d-flex align-items-center border text-nowrap"
    >
      <i className={`me-2 ${props.icon} fa-2x`} />
      {props.title}
    </div>
  );
}
