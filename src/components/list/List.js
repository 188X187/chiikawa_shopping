import { useContext, useState } from "react"
import { DataContext } from "../../MainData";
import { Button, Card, Col, Pagination, Row } from "react-bootstrap";
import OrderButton from "../cart/OrderButton";
import { Link } from "react-router-dom";
import FilterV2 from "../search/Filter2";

export default function List() {

    const { data, setDetail } = useContext(DataContext);

    const itemsPerPage = 12;    // 한 페이지당 보여줄 아이템 개수
    const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지

    // 디버깅용
    // console.log(data)

    // 데이터가 비어 있는지 확인
    if (!data || data.length === 0) {
        return <div>No data available</div>;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;    // 시작 인덱스
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);      // 마지막 인덱스
    const currentItems = data.slice(startIndex, endIndex);      // 한 페이지당 보여줄 아이템 데이터에서 값 가져오기
    const totalPages = Math.ceil(data.length / itemsPerPage);      // 전체 페이지 수 계산

    // 페이지 버튼 클릭 시 이벤트 함수
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {/* <FilterV2 /> */}
            <Row xs={1} md={3} className="g-4">
                {currentItems.map((item, index) => (
                    <Col key={index} className="d-flex justify-content-center align-items-center">
                        <Card style={{ width: '18rem', height: '32rem' }}>
                            <Link to={'/detail'} onClick={() => { setDetail(item) }}>
                                <Card.Img variant="top" src={item.image} className="img-fluid" />
                            </Link>

                            <Card.Body>
                                <Link to={'/detail'} onClick={() => { setDetail(item) }}>
                                    <Card.Title style={{ wordBreak: 'keep-all', height: '6rem' }}>
                                        {item.title.replace(/[<b></b>]/g, '').length > 45 ? `${item.title.replace(/[<b></b>]/g, '').substring(0, 45)}...` : item.title.replace(/[<b></b>]/g, '')}
                                    </Card.Title>
                                    <Card.Title style={{ padding: '3%' }}>{item.lprice}원</Card.Title>
                                </Link>
                                <Button variant="secondary">구매하기</Button>{' '}
                                <Button variant="success"><OrderButton item={item} /></Button>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination style={{ justifyContent: 'center', padding: '2%' }}>
                {Array.from({ length: totalPages }, (_, index) => ( // Array.from 메서드는 첫번째 인자는 무시하고 두번째 인자만 사용함. 따라서 첫번째에 아무 이름 사용해도 상관x
                    <Pagination.Item key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</Pagination.Item>
                ))}
            </Pagination>
        </>
    )
}