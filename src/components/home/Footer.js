import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-body-tertiary p-3 footer">
      <Row>
        <Col>
          <img src="http://fiximage.10x10.co.kr/web2021/cscenter/icon_sns_instagram.png" alt="insta" />
          <img src="http://fiximage.10x10.co.kr/web2021/cscenter/icon_sns_facebook.png" alt="facebook" />
          <img src="http://fiximage.10x10.co.kr/web2021/cscenter/icon_sns_you.png" alt="yotube" />
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <p>호스팅서비스:㈜농담곰</p>
          <p>사이트 내 판매 상품 중 일부는 ㈜농담곰에 입점한 개별판매자가 판매하는 상품이 포함되어 있습니다. 해당 상품의 경우
            ㈜농담곰은 통신판매중개자로서 판매 당사자가 아니며, 상품정보 및 거래 등에 대한 책임을 지지 않습니다.</p>
          <p>COPYRIGHT © DAMGOM ALL RIGHTS RESERVED.</p>
        </Col>
      </Row>



    </footer>
  )
}