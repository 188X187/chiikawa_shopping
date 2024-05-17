// FilterV2.js

import { useContext, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { DataContext } from '../../MainData';
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function FilterV2() {
    const { setFilter, data, setParams, search, setSearch } = useContext(DataContext);
    const [categoryCheck, setCategoryCheck] = useState("");
    const [priceCheck, setPriceCheck] = useState("");

    const [selectedCateBtn, setSelectedCateBtn] = useState(null);
    const [selectePriceBtn, setSelectedPriceBtn] = useState(null);

    const filterCategory = [];
    const dataCopy1 = [...data];
    dataCopy1.map((item) => filterCategory.push(item.category3));

    const priceTitle = ["0~10000", "10000~20000", "20000~30000", "30000~40000", "40000~50000", "50000~1000000000"];
    const priceTitle2 = ["0원~10,000원", "10,000원~20,000원", "20,000원~30,000원", "30,000원~40,000원", "40,000원~50,000원", "50,000원~1,000,000,000원"];
    const startPrice = ["0", "10000", "20000", "30000", "40000", "50000"];
    const endPrice = ["10000", "20000", "30000", "40000", "50000", "1000000000"];

    const applyFilters = (category, price) => {
        let filteredData = [...data];
        if (category) {
            filteredData = filteredData.filter(item => item.category3 === category);
        }
        if (price) {
            const [start, end] = price.split('~').map(p => parseInt(p));
            filteredData = filteredData.filter(item => parseInt(item.lprice) >= start && parseInt(item.lprice) < end);
        }
        setFilter(filteredData);
    };

    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0" alwaysOpen>
                <Accordion.Header>카테고리</Accordion.Header>
                <Accordion.Body>
                    <div className='filter'>
                        <li>
                            <ButtonGroup className='mb-2'>
                                <ToggleButtonGroup type='radio' name='category'>
                                    <ToggleButton
                                        variant={selectedCateBtn === "전체" ? "success" : "outline-success"}
                                        onClick={() => {
                                            setSelectedCateBtn("전체");
                                            setCategoryCheck("");
                                            applyFilters("", priceCheck);
                                        }}>
                                        전체
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>
                        </li>
                        <ButtonGroup>
                            <li>
                                {filterCategory.map((item, i) => {
                                    const isDuplicate = filterCategory.slice(0, i).includes(item);
                                    if (!isDuplicate) {
                                        return (
                                            <ToggleButtonGroup type='radio' name='category' key={i}>
                                                <ToggleButton
                                                    variant={selectedCateBtn === item ? "success" : "outline-success"}
                                                    onClick={() => {
                                                        setSelectedCateBtn(item);
                                                        setCategoryCheck(item);
                                                        applyFilters(item, priceCheck);
                                                    }}>
                                                    {item}
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        );
                                    }
                                })}
                            </li>
                        </ButtonGroup>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="0" alwaysOpen>
                <Accordion.Header>가격별</Accordion.Header>
                <Accordion.Body>
                    <div className='filter'>
                        <li>
                            <ButtonGroup>
                                <ToggleButtonGroup type='radio' name='price'>
                                    <ToggleButton
                                        variant={selectePriceBtn === "전체" ? "success" : "outline-success"}
                                        onClick={() => {
                                            setSelectedPriceBtn("전체");
                                            setPriceCheck("");
                                            applyFilters(categoryCheck, "");
                                        }}>
                                        전체
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>
                        </li>
                        <ButtonGroup>
                            {priceTitle.map((title, index) => (
                                <ToggleButtonGroup type='radio' name='price'>
                                    <ToggleButton
                                        variant={selectePriceBtn === title ? "success" : "outline-success"}
                                        onClick={() => {
                                            setSelectedPriceBtn(title);
                                            setPriceCheck(title);
                                            applyFilters(categoryCheck, title);
                                        }}>
                                        {priceTitle2[index]}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            ))}
                        </ButtonGroup>
                        {/* <li>
                            <ButtonGroup>
                                <ToggleButtonGroup type="radio" name="price">
                                    <ToggleButton
                                        variant={selectePriceBtn === "내림차순" ? 'success' : 'outline-success'}
                                        onClick={(e) => {
                                            setSelectedPriceBtn("내림차순");
                                            setParams("&sort=dsc");
                                        }}>
                                        내림차순 정렬
                                    </ToggleButton>
                                    <ToggleButton
                                        variant={selectePriceBtn === "오름차순" ? 'success' : 'outline-success'}
                                        onClick={(e) => {
                                            setSelectedPriceBtn("오름차순");
                                            setParams("&sort=asc");
                                        }}>
                                        오름차순 정렬
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>
                        </li> */}
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
