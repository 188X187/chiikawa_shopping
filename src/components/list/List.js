import { useContext, useState } from "react"
import { DataContext } from "../../MainData";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import OrderButton from "../cart/OrderButton";
import Filter from "../search/Filter";
import { Link } from "react-router-dom";
import Detail from "../detail/Detail";

export default function List() {

    const { data, setDetail } = useContext(DataContext);

    // 데이터가 비어 있는지 확인
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <>
            <Filter />
            <Row xs={1} md={3} className="g-4">
                {data.map((item, index) => (
                    <Col key={index}>
                        <Card style={{ width: '18rem', height: '30rem' }}>
                            <Card.Img variant="top" src={item.image} style={{ height: '15rem' }} />
                            <Card.Body>
                                <Card.Title style={{ wordBreak: 'keep-all', height: '7rem' }}>{item.title.replace(/[<b></b>]/g, '')}</Card.Title>
                                <Card.Title style={{ padding: '3%' }}>{item.lprice}원</Card.Title>
                                <Link to={'/detail'}>
                                    <Button variant="secondary" onClick={() => {
                                        setDetail(item)}}>상세보기</Button>{' '}
                                </Link>
                                <Button variant="success"><OrderButton item={item} /></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}