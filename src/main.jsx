import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = "";
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <App />
    </>
  </React.StrictMode>
);
