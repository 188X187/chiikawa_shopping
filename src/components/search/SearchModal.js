import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { DataContext } from '../../MainData';

export default function SearchModal(props) {
    const [input, setInput] = useState('') 
    const { setSearch } = useContext(DataContext)
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
                    onChange={(e)=>{
                        console.log(e.target.value)
                        setInput(e.target.value)
                    }}
                />
                <Button variant="outline-success" onClick={()=>{setSearch(input)}}>Search</Button>
            </Form>
        </div>
    )
}