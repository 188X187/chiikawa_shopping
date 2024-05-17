import { useContext, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { DataContext } from '../../MainData';
import FilterPrice from "./FilterPrice";
import "../../css/Filter.css";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function FilterV2() {

    const { filter, setFilter, data, setParams, setCategory } = useContext(DataContext);

    const [categoryCheck, setCategoryCheck] = useState("");
    const [priceCheck, setPriceCheck] = useState("");

    const [selectedCateBtn, setSelectedCateBtn] = useState(null); // 선택된 버튼의 값을 상태로 관리합니다.
    const [selectePriceBtn, setSelectedPriceBtn] = useState(null); // 선택된 버튼의 값을 상태로 관리합니다.


    const category = filter.map((item)=>item.category3)
    const uniqueCategory = [...new Set(category)] //category3 중복값 제거
    // 디버깅용
    // console.log(uniqueCategory)


    // const filterCategory = [];
    // const filterCopy1 = [...filter];
    // filterCopy1.map((item) => filterCategory.push(item.category3)); // 필터카테고리에 배열을 추가하기 위해서 filterCopy1이 있어야 함

    // 가격 정렬 시 필요한 배열
    const priceTitle = ["0~10000", "10000~20000", "20000~30000", "30000~40000", "40000~50000", "50000~1000000000"]
    const priceTitle2 = ["0원~10,000원", "10,000원~20,000원", "20,000원~30,000원", "30,000원~40,000원", "40,000원~50,000원", "50,000원~1,000,000,000원"]
    const startPrice = ["0", "10000", "20000", "30000", "40000", "50000"];
    const endPrice = ["10000", "20000", "30000", "40000", "50000", "1000000000"];

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
                                            setSelectedCateBtn("전체")
                                            if (priceCheck == "") {
                                                setCategoryCheck("");
                                                const filterCopy = [...filter];
                                                setFilter(filterCopy);
                                            } else {
                                                setCategoryCheck("");
                                                const filterCopy = [...filter];
                                                const parts = priceCheck.split("~");
                                                const update = filterCopy.filter((item) => {
                                                    return (
                                                        parseInt(parts[0]) <= parseInt(item.lprice) &&
                                                        parseInt(item.lprice) < parseInt(parts[1])
                                                    );
                                                });
                                                setFilter(update);
                                            }
                                        }}>
                                        전체
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>
                        </li>

                        <ButtonGroup>
                            <li>
                                {uniqueCategory.map((item, i) => {
                                        return (
                                            <ToggleButtonGroup type='radio' name='category' key={i}>
                                                <ToggleButton
                                                    variant={selectedCateBtn === item ? "success" : "outline-success"}
                                                    onClick={() => {
                                                        setSelectedCateBtn(item)
                                                            setCategory(item)
                                                        }}>
                                                    {item}
                                                </ToggleButton>
                                            </ToggleButtonGroup>
                                        )
                                    }
                                )}
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
                                            setSelectedPriceBtn("전체")
                                            if (categoryCheck == "") {
                                                setPriceCheck("");
                                                const filterCopy = [...filter];
                                                setFilter(filterCopy);
                                            } else {
                                                setPriceCheck("");
                                                const filterCopy = [...filter];
                                                const update = filterCopy.filter((item) => {
                                                    return item.category3 == categoryCheck
                                                });

                                                setFilter(update);
                                            }
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
                                            if (categoryCheck === "") {
                                                setPriceCheck(title);
                                                const filterCopy = [...filter];
                                                const update = filterCopy.filter((item) => {
                                                    return (
                                                        parseInt(startPrice[index]) <= parseInt(item.lprice) &&
                                                        parseInt(item.lprice) < parseInt(endPrice[index])
                                                    );
                                                });
                                                setFilter(update);
                                            } else {
                                                setPriceCheck(title);
                                                const filterCopy = [...filter];
                                                const update = filterCopy.filter((item) => {
                                                    return (
                                                        parseInt(startPrice[index]) <= parseInt(item.lprice) &&
                                                        parseInt(item.lprice) < parseInt(endPrice[index])
                                                    );
                                                });
                                                const update2 = update.filter((item) => {
                                                    return item.category3 == categoryCheck;
                                                });
                                                setFilter(update2);
                                            }
                                        }
                                        }
                                    >
                                        {priceTitle2[index]}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            ))}
                        </ButtonGroup>

                        <li>
                            <ButtonGroup>
                                <ToggleButtonGroup type="radio" name="price">
                                    <ToggleButton
                                        variant={selectePriceBtn === "내림차순" ? 'success' : 'outline-success'}
                                        onClick={(e) => {
                                            setSelectedPriceBtn("내림차순")
                                            if (e) {
                                                setParams("&sort=dsc");
                                            } else {
                                                setParams("");
                                            }
                                        }}
                                    >
                                        내림차순 정렬
                                    </ToggleButton>
                                    <ToggleButton
                                        variant={selectePriceBtn === "오름차순" ? 'success' : 'outline-success'}
                                        onClick={(e) => {
                                            setSelectedPriceBtn("오름차순")
                                            if (e) {
                                                setParams("&sort=asc");
                                            } else {
                                                setParams("");
                                            }
                                        }}
                                    >
                                        오름차순 정렬
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonGroup>
                        </li>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion >
    );
}
