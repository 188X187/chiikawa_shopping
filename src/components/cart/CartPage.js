import { useContext, useEffect, useState } from "react";
import CartList from "./CartList";
import CartResult from "./CartResult";
import { DataContext } from "../../MainData";
import CartHeader from "./CartHeader";
import styles from "../../css/cart.module.css";


const CartPage = () => {

    const [allcheck, setAllcheck] = useState(true);
    const { carts, setCarts } = useContext(DataContext);
    const [checklists, setChecklists] = useState([]);

    useEffect(()=>{console.log(checklists)})


    const handleCheck = (checked, productId, lprice, count) => {
        
        const cartsCopy = [...carts];
        const checksCopy = [...checklists];

        if (checked) {
            const itemIndex = checklists.findIndex((list) => list.productId === productId);
            if (itemIndex !== -1) {
                checksCopy[itemIndex].count = count;
                cartsCopy[itemIndex].count = count;
                setChecklists(checksCopy);
                setCarts(cartsCopy);
            } else {
                // 새 상품에 대한 count 추가
                setChecklists([...checklists, { productId: productId, lprice: lprice, count: count }]);
            }
        } else {
            setChecklists(checklists.filter((list) => list.productId !== productId));
        }
    }

    const handleAllCheck = (checked) => {
        setAllcheck(checked);
        if (checked) {
            const allItemsChecked = carts.map(item => ({
                productId: item.productId,
                lprice: Number(item.lprice),
                count: item.count
            }));
            setChecklists(allItemsChecked);
        } else {
            setChecklists([]);
        }
    }
    
    useEffect(() => {
        if (checklists.length === carts.length) {
            setAllcheck(true);
        } else {
            setAllcheck(false);
        }
    }, [checklists, carts]);


    useEffect(() => {
        if (allcheck) {
            const allItemsChecked = carts.map(item => ({
                productId: item.productId,
                lprice: Number(item.lprice),
                count: item.count
            }));
            setChecklists(allItemsChecked);
        }
    }, [allcheck, carts]);


    const isChecked = (productId) => {
        return checklists.some((list) => list.productId === productId);
    }

    return (
        <>
        <CartHeader allcheck={allcheck} handleAllCheck={handleAllCheck}/>
        {
        carts.length > 0 ? 
            carts.map((item)=><CartList key={item.productId} item={item} handleCheck={handleCheck} isChecked={isChecked} allcheck={allcheck}/>)
        :
            <div className={styles.not}>
                <h2>장바구니에 담긴 상품이 없습니다.</h2>
                <p>원하는 상품을 장바구니에 담아보세요!</p>
            </div>
        }
        {
        carts.length > 0 ? 
            <CartResult checklists={checklists}/>
        :
            ""
        }
        </>
    )

}

export default CartPage;