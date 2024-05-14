import { Route, Routes } from "react-router-dom";
import Home from "../home/Home";
import GlobalNav from "../common/GlobalNav";
import { useContext } from "react";
import { DataContext } from "../../MainData";
import List from "../list/List";
import CartPage from "../cart/CartPage";
import Detail from "../detail/Detail";
import ListPage from "../list/ListPage";
import Footer from "../home/Footer";

function Layout() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: '1' }}>
                <GlobalNav />
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="list" element={<ListPage />}></Route>
                    <Route path="detail" element={<Detail />}></Route>
                    <Route path="cart" element={<CartPage />}></Route>
                </Routes>
            </div>
                <Footer />
        </div>
    )
}

export default Layout