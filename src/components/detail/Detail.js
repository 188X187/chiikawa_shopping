import { useContext, useState } from "react";
import Card from 'react-bootstrap/Card'
import { DataContext } from "../../MainData";


export default function Detail() {
    const { detail } = useContext(DataContext);



    return (
        <Card style={{ width: '49rem', height: '45rem' }}>
            <Card.Title className='p-3'>{detail.title}</Card.Title>
            <Card.Body>
                <Card.Img className='DetailImg' variant="top" src={detail.image} />
                <Card.Text>{detail.lprice}원</Card.Text>
                <div className='d-flex'>
                    <button className='w-50 border-0 p-3 mb-2 bg-success text-white'>구매</button>
                    <button className='w-50 border-0 p-3 mb-2 bg-secondary text-white'>장바구니</button>
                </div>
            </Card.Body>
        </Card>
    )
}