import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DataContext } from '../../MainData';
import { Link } from 'react-router-dom';
import './SearchModal.css';

export default function SearchModal(props) {



    const [input, setInput] = useState('')
    const { setSearch } = useContext(DataContext)
    const [searchHistory, setSearchHistory] = useState('')

    const searchHistoryLC = localStorage.getItem("search")
    const search = JSON.parse(searchHistoryLC);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 로컬 스토리지에서 검색 기록 불러오기
        const storedSearch = localStorage.getItem("search");
        if (storedSearch) {
            setSearchHistory(JSON.parse(storedSearch));
        }
    }, []); // 한 번만 실행

    return (
        <div className="searchModal" style={{ zIndex: "1050" }} >
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

                                        // 새로운 검색어를 searchHissetSearchHistory에 추가한 후 로컬 스토리지에 저장
                                        const updatedSearchHistory = [...searchHistory, input];
                                        setSearchHistory(updatedSearchHistory);
                                        localStorage.setItem("search", JSON.stringify(updatedSearchHistory));
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
            <div>

                {
                    search.map((item, index) => {
                        return (
                            <h4 key={index}>{item}</h4>
                        )
                    })
                }
            </div>
        </div>
    )
}