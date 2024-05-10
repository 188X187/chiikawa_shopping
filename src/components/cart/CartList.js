import { useContext, useState } from "react";
import styles from "../../css/cart.module.css";
import { DataContext } from "../../MainData";

const CartList = ({item, handleCheck, isChecked}) => {

    const getCarts = localStorage.getItem("carts")
    const carts = JSON.parse(getCarts);
    const [count, setCount] = useState(1);
    const {setCarts} = useContext(DataContext);

    const handlePlusClick = () => {
        setCount(count + 1);
        if(isChecked(item.productId)){
            handleCheck(true, item.productId, count+1);
        }
    }

    const handleMinusClick = () => {
        if (count == 1){
            return
        }
        setCount(count - 1);
        if(isChecked(item.productId)){
            handleCheck(true, item.productId, count-1);
        }
    }

    const handleRemoveClick = () => {
        
        const update = carts.filter(cart => cart.productId !== item.productId);
        setCarts(update);
        handleCheck(false, item.productId);
    }

    return (
        <section className={styles.cart_product_list}>
        <input type="checkbox" onChange={(e)=>{handleCheck(e.currentTarget.checked, item.productId, count)}}/>
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

        <div className={styles.cart_product_price}>
            <p className={styles.total_price}>{item.lprice * count}원</p>
            <button className={styles.btn_submit}>주문</button>
        </div>

        <div className={styles.product_remove}>
            <img onClick={handleRemoveClick} src="/images/icon-delete.svg" alt="delete"/>
        </div>
        </section>
    );
};

export default CartList;
