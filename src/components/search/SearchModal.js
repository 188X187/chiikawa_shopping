import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DataContext } from '../../MainData';
import { Link } from 'react-router-dom';
import './SearchModal.css';

export default function SearchModal(props) {
    const [input, setInput] = useState('')
    const { setSearch } = useContext(DataContext)

    return (
        <div className="searchModal" style={{zIndex : "1050"}} >
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
                    onChange={(e) => {
                        // console.log(e.target.value)
                        setInput(e.target.value)
                    }}
                />

                {/* 검색어가 있으면 링크로 이동 : 아닐 시 이동 x */}
                {
                    input ?
                        (
                        <Link to='list'>
                            <Button variant="outline-success" onClick={() => {
                                    if (input == '') {
                                        alert("검색어를 입력해주세요.")
                                    }
                                    else {
                                        setSearch(input)
                                        props.setModal(!props.modal)
                                    }
                                }}>Search</Button>
                        </Link>
                        ) : (
                        <Button variant="outline-success" onClick={() => {
                                if (input == '') {
                                    alert("검색어를 입력해주세요.")
                                }
                                else {
                                    setSearch(input)
                                }
                            }}>
                            Search</Button>
                        )
                }
            </Form>
        </div>
    )
}