import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import GlobalNav from "../common/GlobalNav";
import { useContext } from "react";
import { DataContext } from "../../MainData";
import List from "../list/List";
import CartPage from "../cart/CartPage";

function Layout(){    
    return(
        <>
        <GlobalNav/>
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="list" element={<List />}></Route>
            <Route path="detail" element={<div>detail page 설정하시구연</div>}></Route>
            <Route path="cart" element={<CartPage/>}></Route>
        </Routes>
        </>
    )
}

export default Layout