import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SearchModal(props) {
    return (
        <div className="searchModal">
            <Button variant="outline-success"
                onClick={
                    () => {
                        props.setModal(false)
                    }
                }>×</Button>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
        </div>
    )
}