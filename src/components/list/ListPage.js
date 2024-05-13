import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Filter from "../search/Filter";
import List from "./List";
import FilterV2 from '../search/Filter2';

export default function ListPage() {
    return (
        <Container>
            <Row className='d-flex justify-content-start'>
                {/* <Col md="auto"><Filter /></Col> */}
                <FilterV2 />
                <Col><List /></Col>
            </Row>
        </Container>
    )
}