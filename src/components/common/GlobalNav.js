import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SearchModal from '../search/SearchModal';
import { DataContext } from '../../MainData';
import { Badge } from 'react-bootstrap';

function GlobalNav() {
    const {carts} = useContext(DataContext);
    const cartCount = carts.length;

    const expand = 'md'
    const [modal, setModal] = useState(false)
    return (
        <>
            <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                <Container fluid>
                    <Navbar.Brand href="/">귀여운 치이카와</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/list">List</Nav.Link>
                                <Nav.Link href="/cart">Cart <Badge pill bg='primary'>{cartCount}</Badge></Nav.Link>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="🔍Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onClick={() => {
                                        setModal(true)
                                    }}
                                    readOnly
                                />
                                {/* <Button variant="outline-success">Search</Button> */}
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            { modal == true ? <SearchModal setModal={setModal} modal={modal}/> : '' }
        </>
    );
}

export default GlobalNav;