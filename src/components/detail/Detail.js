import { useContext, useEffect, useState } from "react";
import { Card, Button } from 'react-bootstrap';
import { DataContext } from "../../MainData";
import { Link } from "react-router-dom";
import DetailList from "../list/DetailList";
import OrderButton from "../cart/OrderButton";
import Calendar from "./DetailCalendar";

export default function Detail() {
    const { detail } = useContext(DataContext);

    // 상세 정보 및 모달, 배송 희망일 상태를 설정
    const [infoData, setInfoData] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState(null);

    // detail이 업데이트될 때마다 실행되는 useEffect
    useEffect(() => {
        // detail이 존재할 경우 로컬 스토리지에 detail 데이터를 저장하고 infoData 상태를 설정
        if (detail) {
            localStorage.setItem('DetailData', JSON.stringify(detail));
            setInfoData(detail);
        }

        // 로컬 스토리지에서 DetailData를 가져와서 infoData에 설정
        const localData = localStorage.getItem('DetailData');
        if (localData) {
            setInfoData(JSON.parse(localData));
        }
    }, [detail]);

    return (
        <>
            {/* 배송 날짜 선택 모달 */}
            <Calendar
                show={modalShow}
                onHide={() => setModalShow(false)}
                setDeliveryDate={setDeliveryDate}
            />

            <Card style={{ width: '45rem', height: '43rem', margin: 'auto' }}>
                <Card.Title className='p-3 border-bottom border-2 fw-bold' style={{ wordBreak: 'keep-all' }}>
                    {infoData && infoData.title.replace(/[<b></b>]/g, '')}
                </Card.Title>
                <Card.Body>
                    <Card.Img style={{ width: '25rem' }} className='Infocardimg' variant="top" src={infoData && infoData.image} />
                    <Card.Title className='fw-bold text-danger fs-2' style={{ padding: '2%' }}>
                        {infoData && Number(infoData.lprice).toLocaleString()}원
                    </Card.Title>
                    {/* 배송 희망일 선택 버튼 */}
                    <Button className="w-100 " onClick={() => setModalShow(true)}>
                        {deliveryDate ? `배송 희망일 (5월 ${deliveryDate}일) 선택` : '배송 희망일 선택 📆'}
                    </Button>
                    <div className='d-flex justify-content-between'>
                        <button className='w-50 border-0 p-3 mb-2 bg-success text-white'>구매</button>
                                {/* 장바구니 버튼 */}
                        <Link to={'/cart'} className='w-50 border-0 p-3 mb-2 bg-secondary text-white'>
                            <Button className="w-50 border-0 bg-secondary">
                                <OrderButton item={infoData} />
                            </Button>
                        </Link>
                    </div>
                </Card.Body>
            </Card>

            {/* 추천 상품 */}
            <DetailList />
        </>
    );
}
