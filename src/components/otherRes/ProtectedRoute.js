import React from "react";
import {Route, Redirect} from "react-router-dom";

//render prop will take a function
export default function ({component: Component, isAuthenticated, ...rest}) {
	return (
		<Route
			{...rest}
			render={() =>
				isAuthenticated ? <Component /> : <Redirect to="login" />
			}
		/>
	);
}
