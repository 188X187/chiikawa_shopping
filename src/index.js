import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MainData from "./MainData"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(


// 자식요소로 App을 지정하고 모든 곳에서 useContext가 사용
    <MainData>
      <App />
    </MainData>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
