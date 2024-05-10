import { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { DataContext } from "../../MainData";

export default function Detail() {
    const { detail } = useContext(DataContext);
    const [infoData, setInfoData] = useState(null);

    useEffect(() => {
        
        // `detail` 데이터가 변경되면 로컬스토리지에 저장, infoData에도 저장
        if (detail) {
            localStorage.setItem('DetailData', JSON.stringify(detail));
            setInfoData(detail);
        }

        const localData = localStorage.getItem('DetailData');
        
        // 로컬스토리지에 데이터가 변경되면 infoData에 그 데이터 저장
        if (localData) {
            setInfoData(JSON.parse(localData));
        }
    }, [detail]);

    // infoData가 null인 경우 처리 ("No data" 메시지 표시)
    if (!infoData) {
        return <p>No data</p>;
    }

    return (
        <Card style={{ width: '45rem', height: '40rem', margin: 'auto' }}>
            <Card.Title className='p-3'style={{ wordBreak: 'keep-all' }}>{infoData.title.replace(/[<b></b>]/g, '')}</Card.Title>
            <Card.Body>
                <Card.Img style={{ width: '25rem' }} className='Infocardimg' variant="top" src={infoData.image} />
                <Card.Title style={{padding: '3%'}}>{infoData.lprice}원</Card.Title>
                <div className='d-flex'>
                    <button className='w-50 border-0 p-3 mb-2 bg-success text-white'>구매</button>
                    <button className='w-50 border-0 p-3 mb-2 bg-secondary text-white'>장바구니</button>
                </div>
            </Card.Body>
        </Card>
    );
}
