import { useContext } from "react";
import { DataContext } from "../../MainData";

const CartPage = () => {

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
            {
            localStorage.length == 0 ?
                <div>장바구니가 비었습니다</div>
            :
                <div></div>
            }
        </>
    )
    
}

export default CartPage;