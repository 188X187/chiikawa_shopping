import { useContext, useEffect, useState } from "react";
import styles from "../../css/cart.module.css";
import { DataContext } from "../../MainData";

const CartList = ({item, handleCheck, isChecked}) => {

    const [count, setCount] = useState(item.count);
    const { carts, setCarts } = useContext(DataContext);



    

    // 수량이 바뀌면 체크리스트에 있는지 확인시켜서 갱신시킨다
    useEffect(() => {
        if (isChecked(item.productId)) {
            handleCheck(true, item.productId, item.lprice, count);
        }
    }, [count]);



    
    
    // 카운트를 변동하거나 아이템 삭제시 카트에도 갱신해준다
    const handlePlusClick = () => {
        const cartsCopy = [...carts];
        const itemIndex = carts.findIndex((list) => list.productId === item.productId);
        setCount(count + 1);
        cartsCopy[itemIndex].count = count + 1;
        setCarts(cartsCopy);
    };
    
    const handleMinusClick = () => {
        const cartsCopy = [...carts];
        const itemIndex = carts.findIndex((list) => list.productId === item.productId);
        if (count === 1) {
            return;
        }
        setCount(count - 1);
        cartsCopy[itemIndex].count = count - 1;
        setCarts(cartsCopy);
    };

    const handleRemoveClick = () => {
        const cartsCopy = [...carts];
        const update = cartsCopy.filter(cart => cart.productId !== item.productId);
        setCarts(update);
        handleCheck(false, item.productId);
    };





    return (
        <section className={styles.cart_product_list}>
            <input type="checkbox" onChange={(e) => handleCheck(e.currentTarget.checked, item.productId, item.lprice, count)} checked={isChecked(item.productId)} />
            <div className={styles.cart_product_wrap}>
                <div className={styles.cart_product_image}>
                    <img src={item.image} alt="product-img" />
                </div>
                <div className={styles.cart_product_info}>
                    <p className={styles.seller_store}>{item.title.replace(/[<b></b>]/g, '')}</p>
                    <p className={styles.price}>{Number(item.lprice).toLocaleString()}원</p>
                    <p className={styles.delivery}>택배배송 / 국내배송</p>
                </div>
            </div>
            <div className={styles.cart_product_count}>
                <img className={styles.minus} onClick={handleMinusClick} src="/images/icon-minus-line.svg" alt="minus" />
                <div className={styles.count}>
                    <span>{count}</span>
                </div>
                <img className={styles.plus} onClick={handlePlusClick} src="/images/icon-plus-line.svg" alt="plus" />
            </div>
            <div className={styles.cart_product_price}>
                <p className={styles.total_price}>{Number(item.lprice * count).toLocaleString()}원</p>
                <button className={styles.btn_submit}>주문</button>
            </div>
            <div className={styles.product_remove}>
                <img onClick={handleRemoveClick} src="/images/icon-delete.svg" alt="delete" />
            </div>
        </section>
    );
};

export default CartList;
