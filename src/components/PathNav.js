import React, {useState, useEffect, createContext} from "react";
import {Route, Switch} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import AddProduct from "./AddProduct";
import ShopSettings from "./ShopSettings";
import ProtectedRoute from "./otherRes/ProtectedRoute";
import AdminMain from "./adminMain";
import ByStores from "./byStores";

export const AuthContext = createContext();

export default function PathNav() {
    const [authRole, setAuthRole] = useState(localStorage.getItem("role"));
    return (
        <Switch>
            <AuthContext.Provider value={{authRole,setAuthRole}}>
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login} />
                <Route path="/byproducts" component={Home} />
                <Route path="/bystores" component={ByStores}/>
                
                <ProtectedRoute
                    exact
                    path="/addProduct"
                    component={AddProduct}
                    isAuthenticated={authRole === "user"}
                />
                <ProtectedRoute
                    exact
                    path="/settings"
                    component={ShopSettings}
                    isAuthenticated={authRole === "user"}
                />
                <ProtectedRoute
                    exact
                    path="/admin"
                    component={AdminMain}
                    isAuthenticated={authRole === "admin"}
                />
                {/* <Route path="*" component={}/> */}
            </AuthContext.Provider>
        </Switch>
    );
}
