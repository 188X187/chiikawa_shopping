import styles from "../../css/cart.module.css";

const CartHeader = ({allcheck, handleAllCheck}) => {

    return (
        <div className={styles.cart_title_wrap}>
            <div className={styles.tab_title}>
                <label>
                    <input type="checkbox" onChange={(e)=>{handleAllCheck(e.currentTarget.checked)}} checked={allcheck}></input>
                    <span>전체선택</span>
                </label>
                <span>상품정보</span>
                <span>수량</span>
                <span>상품금액</span>
                <p>전체선택</p>
            </div>
        </div>
    );
}

export default CartHeader;