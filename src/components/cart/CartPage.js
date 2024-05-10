import { useContext, useState } from "react";
import CartList from "./CartList";
import CartResult from "./CartResult";
import { DataContext } from "../../MainData";


const CartPage = () => {

    const { localcarts } = useContext(DataContext);

    console.log(localcarts)

    return (
        <>
        {
        localcarts.length > 0 ? 
            localcarts.map((item)=><CartList key={item.productId} item={item} />)
        :
            <div>장바구니가 비었습니다</div>
        }
        <CartResult />
        </>
    )

}

export default CartPage;