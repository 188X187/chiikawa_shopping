import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../MainData";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import OrderButton from "../cart/OrderButton";
import { Link } from "react-router-dom";

export default function DeatilList() {
  
  const {data, setDetail} = useContext(DataContext);

  const [random, setRandom] = useState([]);

  const randomNum = Math.floor(Math.random() * data.length);

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

  useEffect(() => {
    fetch(`/v1/search/shop?query=치이카와$&filter=used:false&display=3&start=1${randomNum}`, 
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
    <div style={{margin: '0 auto', padding: '4%'}}>
    <h3 style={{paddingBottom: '2%'}}>추천 상품</h3>
    <Carousel>
      <Carousel.Item>
        <Row xs={1} md={3} className="g-4">
          {random.map((item, index) => (
            <Col key={index}>
              <Card style={{ width: '16rem', height: '25rem' }}>
                <Link to={'/detail'} onClick={() => { setDetail(item) }}>
                  <Card.Img variant="top" src={item.image} style={{ height: '12rem' }} />
                </Link>

                <Card.Body>
                  <Link to={'/detail'} onClick={() => { setDetail(item) }}>
                    <Card.Title style={{ wordBreak: 'keep-all', height: '5rem', fontSize: '1rem' }}>
                      {item.title.replace(/[<b></b>]/g, '').length > 40 ? `${item.title.replace(/[<b></b>]/g, '').substring(0, 40)}...` : item.title.replace(/[<b></b>]/g, '')}
                    </Card.Title>
                    <Card.Title style={{ padding: '1%' }}>{item.lprice}원</Card.Title>
                    <Button variant="secondary">상세보기</Button>{' '}
                  </Link>

                  <Button variant="success"><OrderButton item={item} /></Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <Row xs={1} md={3} className="g-4">
          {random.map((item, index) => (
            <Col key={index}>
              <Card style={{ width: '16rem', height: '25rem' }}>
                <Link to={'/detail'} onClick={() => { setDetail(item) }}>
                  <Card.Img variant="top" src={item.image} style={{ height: '12rem' }} />
                </Link>

                <Card.Body>
                  <Link to={'/detail'} onClick={() => { setDetail(item) }}>
                    <Card.Title style={{ wordBreak: 'keep-all', height: '5rem', fontSize: '1rem' }}>
                      {item.title.replace(/[<b></b>]/g, '').length > 40 ? `${item.title.replace(/[<b></b>]/g, '').substring(0, 40)}...` : item.title.replace(/[<b></b>]/g, '')}
                    </Card.Title>
                    <Card.Title style={{ padding: '1%' }}>{item.lprice}원</Card.Title>
                    <Button variant="secondary">상세보기</Button>{' '}
                  </Link>

                  <Button variant="success"><OrderButton item={item} /></Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Carousel.Item>
    </Carousel>
    </div>
  )

  }