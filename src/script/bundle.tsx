import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { App } from "./app";

window.React = require("react");

const rootElement = document.getElementById("#root");

ReactDOM.render(<App />, rootElement);
