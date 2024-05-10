import { useState } from "react";
import styles from "../../css/cart.module.css";

const CartList = () => {

    const [count, setCount] = useState(1);

    const handlePlusClick = () => {
        setCount(count + 1)
    }

    const handleMinusClick = () => {
        if (count == 1){
            return
        }
        setCount(count - 1)
    }

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
        {storageValues.map((item, index)=>(<section className={styles.cart_product_list}>
        <input type="checkbox" />
        <div className={styles.cart_product_wrap}>
            <div className={styles.cart_product_image}>
            <img src={item.image} alt="product-img" />
            </div>

            <div className={styles.cart_product_info}>
            <p className={styles.seller_store}>{item.title.replace(/[<b></b>]/g, '')}</p>
            <p className={styles.price}>{item.lprice}원</p>
            <p className={styles.delivery}>택배배송 / 무료배송</p>
            </div>
        </div>

        <div className={styles.cart_product_count}>
            <img className={styles.minus} onClick={handleMinusClick} src="/images/icon-minus-line.svg" alt="minus" />

            <div className={styles.count}>
            <span>{count}</span>
            </div>
            <img className={styles.plus} onClick={handlePlusClick} src="/images/icon-plus-line.svg" alt="plus"/>
        </div>
        </section>))}
        </>

        
    );
};

export default CartList;
