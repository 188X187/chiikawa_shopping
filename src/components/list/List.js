import { useContext, useState } from "react"
import { DataContext } from "../../MainData";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import OrderButton from "../cart/OrderButton";
import Filter from "../search/Filter";

export default function List() {

    const { data } = useContext(DataContext);

    // console.log(data[0]) 

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
                    <Card style={{ width: '18rem', height: '30rem'}}>
                        <Card.Img variant="top" src={item.image} style={{ height: '15rem' }} />
                        <Card.Body>
                            <Card.Title>{item.title.replace(/[<b></b>]/g, '')}</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{item.lprice}원</ListGroup.Item>
                            <ListGroup.Item variant="success"><OrderButton item={item}/></ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            ))}
        </Row>
            </>
    )
}