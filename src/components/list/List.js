import { useContext, useState } from "react"
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import OrderButton from "../cart/OrderButton";
import { Link } from "react-router-dom";
import { DataContext } from "../../MainData";

export default function List() {

    // MainData에서 데이터 가져오기
    const { filter, setDetail } = useContext(DataContext);


    // 페이지네이션
    const [page, setPage] = useState(1);  // 현재 페이지
    const itemsPerPage = 12;    // 한 페이지당 보여줄 아이템 개수
    const startIndex = (page - 1) * itemsPerPage;    // 시작 인덱스
    const endIndex = Math.min(startIndex + itemsPerPage, filter.length);      // 마지막 인덱스
    const totalPages = Math.ceil(filter.length / itemsPerPage);      // 전체 페이지 수 계산



    // 데이터가 비어 있는지 확인
    if (!filter || filter.length === 0) {
        return <div>No filter available</div>;
    }



    return (
        <>
        {/* 상품 리스트 */}
            <Row xs={1} md={3} className="g-4">
                {filter.slice(startIndex, endIndex).map((item, index) => (
                    <Col key={index} className="d-flex justify-content-center align-items-center">
                        <Card style={{ width: '18rem', height: '32rem' }}>
                            <Link to={'/detail'} onClick={() => { setDetail(item); window.scrollTo(0, 0); }}>
                                <Card.Img variant="top" src={item.image} className="img-fluid" style={{ height: '18rem' }} />
                            </Link>

                            <Card.Body>
                                <Link to={'/detail'} onClick={() => { setDetail(item); window.scrollTo(0, 0); }}>
                                    <Card.Title style={{ wordBreak: 'keep-all', height: '6rem' }}>
                                        {item.title.replace(/[<b></b>]/g, '').length > 45 ? `${item.title.replace(/[<b></b>]/g, '').substring(0, 45)}...` : item.title.replace(/[<b></b>]/g, '')}
                                    </Card.Title>
                                    <Card.Title style={{ padding: '3%' }}>{Number(item.lprice).toLocaleString()}원</Card.Title>
                                </Link>
                                <Button variant="secondary">구매하기</Button>{' '}
                                <Button variant="success"><OrderButton item={item} /></Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 페이지네이션 */}
            <Pagination style={{ justifyContent: 'center', padding: '3%' }}>
                {[...Array(totalPages)].map((a, index) => (
                    <Pagination.Item key={index + 1} active={page === index + 1} onClick={() => { setPage(index + 1); window.scrollTo(0, 0); }}>{index + 1}</Pagination.Item>
                ))}
            </Pagination>

        </>
    )
}