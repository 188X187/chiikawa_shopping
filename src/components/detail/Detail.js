import { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { DataContext } from "../../MainData";
import { Link } from "react-router-dom";
import DetailList from "../list/DetailList";

export default function Detail() {
    const { detail } = useContext(DataContext);
    const [infoData, setInfoData] = useState(null);
    useEffect(() => {
        if (detail) {
            localStorage.setItem('DetailData', JSON.stringify(detail))
            setInfoData(detail)
        }

        const localData = localStorage.getItem('DetailData');
        
        // 로컬스토리지에 데이터가 변경되면 infoData에 그 데이터 저장
        if (localData) {
            setInfoData(JSON.parse(localData))
        }
    }, [detail])

    return (
        <>
        <Card style={{ width: '45rem', height: '40rem', margin: 'auto' }}>
            <Card.Title className='p-3 border-bottom border-2 fw-bold'style={{ wordBreak: 'keep-all' }}>{infoData && infoData.title.replace(/[<b></b>]/g, '')}</Card.Title>
            <Card.Body>
                <Card.Img style={{ width: '25rem' }} className='Infocardimg' variant="top" src={infoData && infoData.image} />
                <Card.Title className='fw-bold text-danger' style={{ padding: '2%' }}>{infoData && infoData.lprice}원</Card.Title>
                <div className='d-flex justify-content-between'>
                    <button className='w-50 border-0 p-3 mb-2 bg-success text-white'>구매</button>
                    <Link to={'/cart'} className='w-50 border-0 p-3 mb-2 bg-secondary text-white'>
                        <button className='border-0 bg-secondary text-white'>장바구니</button>
                    </Link>
                </div>
            </Card.Body>
            
        </Card>

        <DetailList />
        </>
    );
}
