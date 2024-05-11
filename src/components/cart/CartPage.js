import { useContext, useEffect, useState } from "react";
import CartList from "./CartList";
import CartResult from "./CartResult";
import { DataContext } from "../../MainData";
import CartHeader from "./CartHeader";
import styles from "../../css/cart.module.css";


const CartPage = () => {

    const [allcheck, setAllcheck] = useState(true);
    const { localcarts } = useContext(DataContext);
    const [checklists, setChecklists] = useState([]);

    useEffect(()=>{console.log(checklists)})

    const handleCheck = (checked, productId, lprice) => {
        if (checked) {
            const itemIndex = checklists.findIndex((list) => list.productId === productId);
            if (itemIndex !== -1) {
                const updatedChecklists = [...checklists];
                updatedChecklists[itemIndex].lprice = Number(lprice);
                setChecklists(updatedChecklists);
            } else {
                setChecklists([...checklists, { productId, lprice }]);
            }
        }
        else{
            setChecklists(checklists.filter((list)=>list.productId!==productId));
        }
    }

    const handleAllCheck = (checked) => {
        setAllcheck(checked);
        if (checked) {
            const allItemsChecked = localcarts.map(item => ({
                productId: item.productId,
                lprice: Number(item.lprice)
            }));
            setChecklists(allItemsChecked);
        } else {
            setChecklists([]);
        }
    }
    
    useEffect(() => {
        if (checklists.length === localcarts.length) {
            setAllcheck(true);
        } else {
            setAllcheck(false);
        }
    }, [checklists, localcarts]);


    useEffect(() => {
        if (allcheck) {
            const allItemsChecked = localcarts.map(item => ({
                productId: item.productId,
                lprice: Number(item.lprice)
            }));
            setChecklists(allItemsChecked);
        }
    }, [allcheck, localcarts]);


    const isChecked = (productId) => {
        return checklists.some((list) => list.productId === productId);
    }

    return (
        <>
        <CartHeader allcheck={allcheck} handleAllCheck={handleAllCheck}/>
        {
        localcarts.length > 0 ? 
            localcarts.map((item)=><CartList key={item.productId} item={item} handleCheck={handleCheck} isChecked={isChecked} allcheck={allcheck}/>)
        :
            <div className={styles.not}>
                <h2>장바구니에 담긴 상품이 없습니다.</h2>
                <p>원하는 상품을 장바구니에 담아보세요!</p>
            </div>
        }
        {
        localcarts.length > 0 ? 
            <CartResult checklists={checklists}/>
        :
            ""
        }
        </>
    )

}

export default CartPage;