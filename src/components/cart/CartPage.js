import CartList from "./CartList";
import CartResult from "./CartResult";

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
        {storageValues.map((item, index)=><CartList key={index} item={item}/>)}
        <CartResult />
        </>
    )

}

export default CartPage;