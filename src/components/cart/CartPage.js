import { useState } from "react";
import CartList from "./CartList";
import CartResult from "./CartResult";

const CartPage = () => {

    const [onOff, setOnOff] = useState(false);

    const storageKeys = Object.keys(localStorage);
    const storageValues = storageKeys.map((key) => {
        try {
        return JSON.parse(localStorage.getItem(key));
        } catch (error) {
        return localStorage.getItem(key);
        }
    });

    return (
        <>
        {storageValues.map((item, index)=><CartList key={index} item={item} onOff={onOff} setOnOff={setOnOff}/>)}
        <CartResult />
        </>
    )

}

export default CartPage;