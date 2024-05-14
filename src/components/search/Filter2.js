import { useContext, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { DataContext } from '../../MainData';
import FilterPrice from "./FilterPrice";
import "./Filter.css";
import { ButtonGroup, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

export default function FilterV2() {

    const { setFilter, data, setParams } = useContext(DataContext);

    const [categoryCheck, setCategoryCheck] = useState("");
    const [priceCheck, setPriceCheck] = useState("");

    const [selectedCateBtn, setSelectedCateBtn] = useState(null); // 선택된 버튼의 값을 상태로 관리합니다.
    const [selectePriceBtn, setSelectedPriceBtn] = useState(null); // 선택된 버튼의 값을 상태로 관리합니다.

    const filterCategory = [];
    const dataCopy1 = [...data];
    dataCopy1.map((item) => filterCategory.push(item.category3));

    // 카테고리 온클릭 이벤트 함수
    const handleCateClick = (value) => {
        if (selectedCateBtn !== value) {
            setSelectedCateBtn(value)
        } else {
            setSelectedCateBtn(value)
        }
    }

    // 가격 정렬 시 필요한 배열
    const priceTitle = ["0~10000", "10000~20000", "20000~30000", "30000~40000", "40000~50000", "50000~1000000000"]
    const priceTitle2 = ["0원~10,000원", "10,000원~20,000원", "20,000원~30,000원", "30,000원~40,000원", "40,000원~50,000원", "50,000원~1,000,000,000원"]
    const startPrice = ["0", "10000", "20000", "30000", "40000", "50000"];
    const endPrice = ["10000", "20000", "30000", "40000", "50000", "1000000000"];

    // 가격 온클릭 이벤트 함수
    const handlePriceClick = (value) => {
        // 클릭된 버튼이 현재 선택된 값이 아니라면 선택한 값을 변경합니다.
        if (selectePriceBtn !== value) {
            setSelectedPriceBtn(value);

        } else {
            // 이미 선택된 버튼을 다시 클릭했을 때는 선택을 해제합니다.
            setSelectedPriceBtn(null);

        }
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
                                            handleCateClick("전체")
                                            if (priceCheck == "") {
                                                setCategoryCheck("");
                                                const dataCopy = [...data];
                                                setFilter(dataCopy);
                                            } else {
                                                setCategoryCheck("");
                                                const dataCopy = [...data];
                                                const parts = priceCheck.split("~");
                                                const update = dataCopy.filter((item) => {
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
                                {filterCategory.map((item, i) => {
                                    const isDuplicate = filterCategory.slice(0, i).includes(item);
                                    if (isDuplicate == false) {
                                        return (
                                            <ToggleButtonGroup type='radio' name='category' key={i}>
                                                <ToggleButton
                                                    variant={selectedCateBtn === item ? "success" : "outline-success"}
                                                    onClick={() => {
                                                        handleCateClick(item)
                                                        if (priceCheck === "") {
                                                            setCategoryCheck(item);
                                                            const dataCopy = [...data];
                                                            const update = dataCopy.filter(
                                                                (data) => data.category3 == item
                                                            );
                                                            setFilter(update);
                                                        } else {
                                                            setCategoryCheck(item);
                                                            const dataCopy = [...data];
                                                            const update = dataCopy.filter(
                                                                (data) => data.category3 == item
                                                            );

                                                            const parts = priceCheck.split("~");
                                                            const update2 = update.filter((item) => {
                                                                return (
                                                                    parseInt(parts[0]) <= parseInt(item.lprice) &&
                                                                    parseInt(item.lprice) < parseInt(parts[1])
                                                                );
                                                            });
                                                            setFilter(update2);
                                                        }
                                                    }}>
                                                    {item}
                                                </ToggleButton>

                                            </ToggleButtonGroup>
                                        )
                                    }

                                }

                                )}
                            </li>
                        </ButtonGroup>

                        {/* {filterCategory.map((item, i) => {
                            // 현재 요소가 이전 요소들 중에 있는지 확인
                            const isDuplicate = filterCategory.slice(0, i).includes(item);

                            // 중복된 경우는 출력하지 않음
                            if (isDuplicate == false) {
                                return (
                                    <li>
                                        <ButtonGroup key={i}>
                                            <ToggleButton
                                                type="radio"
                                                name="categoty"
                                                onClick={(e) => {
                                                    if (priceCheck === "") {
                                                        setCategoryCheck(item);
                                                        const dataCopy = [...data];
                                                        const update = dataCopy.filter(
                                                            (data) => data.category3 == item
                                                        );
                                                        setFilter(update);
                                                    } else {
                                                        setCategoryCheck(item);
                                                        const dataCopy = [...data];
                                                        const update = dataCopy.filter(
                                                            (data) => data.category3 == item
                                                        );

                                                        const parts = priceCheck.split("~");
                                                        const update2 = update.filter((item) => {
                                                            return (
                                                                parseInt(parts[0]) <= parseInt(item.lprice) &&
                                                                parseInt(item.lprice) < parseInt(parts[1])
                                                            );
                                                        });
                                                        setFilter(update2);
                                                    }
                                                }}>
                                                {item}
                                            </ToggleButton>

                                        </ButtonGroup>{'  '}
                                    </li>
                                );
                            }
                            return null;
                        })} */}
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
                                            handlePriceClick("전체")
                                            if (categoryCheck == "") {
                                                setPriceCheck("");
                                                const dataCopy = [...data];
                                                setFilter(dataCopy);
                                            } else {
                                                setPriceCheck("");
                                                const dataCopy = [...data];
                                                const update = dataCopy.filter((item) => {
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
                                            handlePriceClick(title);
                                            if (categoryCheck === "") {
                                                setPriceCheck(title);
                                                const dataCopy = [...data];
                                                const update = dataCopy.filter((item) => {
                                                    return (
                                                        parseInt(startPrice[index]) <= parseInt(item.lprice) &&
                                                        parseInt(item.lprice) < parseInt(endPrice[index])
                                                    );
                                                });
                                                setFilter(update);
                                            } else {
                                                setPriceCheck(title);
                                                const dataCopy = [...data];
                                                const update = dataCopy.filter((item) => {
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

                        {/* <FilterPrice
                            title={"0원~10,000"}
                            startPrice={"0"}
                            endPrice={"10000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"10,000원~20,000"}
                            startPrice={"10000"}
                            endPrice={"20000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"20,000원~30,000"}
                            startPrice={"20000"}
                            endPrice={"30000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"30,000원~40,000"}
                            startPrice={"30000"}
                            endPrice={"40000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"40,000원~50,000"}
                            startPrice={"40000"}
                            endPrice={"50000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"50,000원~1,000,000,000"}
                            startPrice={"50000"}
                            endPrice={"1000000000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        /> */}

                        <li>
                            <ButtonGroup>
                                <ToggleButtonGroup type="radio" name="price">
                                    <ToggleButton
                                        variant={selectePriceBtn === "내림차순" ? 'success' : 'outline-success'}
                                        onClick={(e) => {
                                            handlePriceClick("내림차순")
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
                                            handlePriceClick("오름차순")
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
