import { useContext, useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { DataContext } from "../../MainData";

export default function Detail(props) {
    const { detail } = useContext(DataContext);
    const [infoData, setInfoData] = useState(null);

    useEffect(() => {
        
        // `detail` 데이터가 변경되면 로컬스토리지에 저장하고 상태 업데이트
        if (detail) {
            localStorage.setItem('DetailData', JSON.stringify(detail));
            setInfoData(detail);
        }

        // 컴포넌트가 처음 마운트될 때 실행
        const storedData = localStorage.getItem('DetailData');
        
        // 로컬스토리지에 데이터가 있으면 상태를 업데이트
        if (storedData) {
            setInfoData(JSON.parse(storedData));
        }


    }, [detail]);

    // infoData가 null인 경우 처리 (e.g. "No data" 메시지 표시)
    if (!infoData) {
        return <p>No data</p>;
    }

    return (
        <Card style={{ width: '45rem', height: '40rem', margin: 'auto' }}>
            <Card.Title className='p-3'>{infoData.title.replace(/[<b></b>]/g, '')}</Card.Title>
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
