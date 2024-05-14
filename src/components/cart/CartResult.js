import { useEffect, useState } from "react";
import styles from "../../css/cart.module.css";

const CartResult = ({ checklists }) => {

    // cash는 상품의 총합계금이다
    const [cash, setCash] = useState(0);

    useEffect(() => {
        const total = checklists.reduce((acc, list) => acc + (list.lprice * list.count), 0);
        setCash(total);
    }, [checklists])

    return (
        <div className={styles.total}>
            <div className={styles.total_price}>
                <p className={styles.cart_product_total_price}>총 상품 금액</p>
                <p className={styles.cart_product_price}>{Number(cash).toLocaleString()}원</p>
            </div>

            <div className={styles.pay_minus}>
                <img src="/images/icon-minus-line.svg" alt="minus" />
            </div>
            <div className={styles.sale}>
                <p className={styles.cart_product_sale}>상품 할인</p>
                <p className={styles.cart_product_sale_price}>0</p>
            </div>
            <div className={styles.pay_plus}>
                <img src="/images/icon-plus-line.svg" alt="plus" />
            </div>

            <div className={styles.delivery}>
                <p className={styles.cart_product_delivery}>배송비</p>
                <p className={styles.cart_product_delivery_price}>
                    {checklists.length > 0 ? "3,000원" : "0"}
                </p>
            </div>

        <div className={styles.cart_product_price}>
            <p className={styles.total_price}></p>
            <button className={styles.btn_submit}>주문</button>
        </div>
        </div>
    );
};

export default CartResult;