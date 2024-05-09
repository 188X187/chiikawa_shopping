import { useContext } from "react";
import { DataContext } from "../../MainData";

const OrderButton = ({item}) =>{

    const {setCart} = useContext(DataContext);

    const handleClick = () => {
        setCart({
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
            
            });
        alert("장바구니에 추가되었습니다");
    }

    return (
        <div onClick={handleClick} style={{ cursor: "pointer" }}>장바구니</div>
    )
}

export default OrderButton;