import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../MainData";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import OrderButton from "../cart/OrderButton";
import { Link } from "react-router-dom";

export default function DeatilList() {

  // MainData에서 데이터 가져오기
  const { setDetail } = useContext(DataContext);

  // 랜덤값 초기화
  const [random, setRandom] = useState([]);

  // 랜덤 번호
  const randomNum = Math.floor((Math.random() * 99) + 1);

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  useEffect(() => {
    fetch(`/v1/search/shop?query=치이카와$&filter=used:false&display=9&start=${randomNum}`,
      {
        method: "GET",
        headers: {
          "X-Naver-Client-Id": clientId,
          "X-Naver-Client-Secret": clientSecret,
        },
      }
    )
      .then((response) => response.json())
      .then((json) => setRandom(json.items))
  }, [])

  return (
    // 추천 상품 슬라이드
    <div style={{ margin: '0 auto', padding: '4%' }}>
      <h3 style={{ paddingBottom: '2%' }}>추천 상품</h3>
      <Carousel>
        {/* 슬라이드 개수 */}
        {[...Array(Math.ceil(random.length / 3))].map((a, slideIndex) => (
          <Carousel.Item>
            <Row xs={1} md={3} className="g-4">
              {/* 슬라이드 안 아이템 */}
              {random.slice(slideIndex * 3, (slideIndex + 1) * 3).map((item, index) => (
                <Col key={index} className="d-flex justify-content-center align-items-center">
                  <Card style={{ width: '16rem', height: '28rem' }}>
                    <Link to={'/detail'} onClick={() => { setDetail(item); window.scrollTo(0, 0); }}>
                      <Card.Img variant="top" src={item.image} className="img-fluid" style={{height: '15rem'}}/>
                    </Link>

                    <Card.Body>
                      <Link to={'/detail'} onClick={() => { setDetail(item); window.scrollTo(0, 0);}}>
                        <Card.Title style={{ wordBreak: 'keep-all', height: '5rem', fontSize: '1rem' }}>
                          {item.title.replace(/[<b></b>]/g, '').length > 40 ? `${item.title.replace(/[<b></b>]/g, '').substring(0, 40)}...` : item.title.replace(/[<b></b>]/g, '')}
                        </Card.Title>
                        <Card.Title style={{ padding: '1%' }}>{Number(item.lprice).toLocaleString()}원</Card.Title>
                        <Button variant="secondary">상세보기</Button>{' '}
                      </Link>

                      <Button variant="success"><OrderButton item={item} /></Button>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}

      </Carousel>
    </div>
  )

}