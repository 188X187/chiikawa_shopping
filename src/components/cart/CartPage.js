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




    // CartList의 상품이 체크했을때 작동하는 함수
    const handleCheck = (checked, productId, lprice, count) => {
        
        const cartsCopy = [...carts];
        const checksCopy = [...checklists];

        // 이미 기존 리스트에 있으면 덮어씌어야 되기때문에 index를 찾는다
        if (checked) {
            const itemIndex = checklists.findIndex((list) => list.productId === productId);

            // 못찾으면 -1을 반환하는데 !==이므로 값을 찾은 경우이다
            if (itemIndex !== -1) {
                checksCopy[itemIndex].count = count;
                cartsCopy[itemIndex].count = count;
                setChecklists(checksCopy);
                setCarts(cartsCopy);
            } else {
                //못찾은 경우는 새상품을 담아준다
                setChecklists([...checklists, { productId: productId, lprice: lprice, count: count }]);
            }
        }
        // 체크가 안되있으면 리스트에서 지운다
        else {
            setChecklists(checklists.filter((list) => list.productId !== productId));
        }
    }





    // 전체선택 체크했을때의 함수
    const handleAllCheck = (checked) => {
        setAllcheck(checked);
        // 체크됬다면 carts에 모든것을 리스트에 저장한다
        if (checked) {
            const allItemsChecked = carts.map(item => ({
                productId: item.productId,
                lprice: Number(item.lprice),
                count: item.count
            }));
            setChecklists(allItemsChecked);
        // 전체선택 체크해제이므로 리스트를 전부비운다
        } else {
            setChecklists([]);
        }
    }
    





    // 체크리스트 상태가 바뀔때마다 카트 갯수와 비교한다
    useEffect(() => {
        if (checklists.length === carts.length) {
            setAllcheck(true);
        } else {
            setAllcheck(false);
        }
    }, [checklists]);






    // all체크에 변경이 일어나면 체크리스트를 카트로 갱신시킨다
    useEffect(() => {
        if (allcheck) {
            const allItemsChecked = carts.map(item => ({
                productId: item.productId,
                lprice: Number(item.lprice),
                count: item.count
            }));
            setChecklists(allItemsChecked);
        }
    }, [allcheck]);






    // 자식이 부모 체크리스트에 속해있는지 알려준다, true/false를 반환한다
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