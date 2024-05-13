import { useContext } from "react";
import { DataContext } from "../../MainData";

const OrderButton = ({item}) =>{

    const {carts, setCarts} = useContext(DataContext);

    const handleClick = () => {

        const isExist = carts.some(cart=>cart.productId === item.productId)

        if(isExist){
            alert("이미 장바구니에 존재하는 상품입니다.");
        }
        else{
            setCarts([...carts, {
                category1: item.category1,
                category2: item.category2,
                category3: item.category3,
                category4: item.category4,
                hprice: item.hprice,
                image: item.image,
                link: item.link,
                lprice: item.lprice,
                maker: item.maker,
                mallName: item.mallName,
                productId: item.productId,
                productType: item.productType,
                title: item.title,
                count: 1,
                }]);
            alert("장바구니에 추가되었습니다");
        }
    }

    return (
        <div onClick={handleClick} style={{ cursor: "pointer" }}>장바구니</div>
    )
}

export default OrderButton;