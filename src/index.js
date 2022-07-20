import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import PathNav from './components/PathNav';

ReactDOM.render(
<BrowserRouter>
    <PathNav/>
</BrowserRouter>,document.getElementById("root"));