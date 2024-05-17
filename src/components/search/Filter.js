import { useContext, useState } from "react";
import { DataContext } from "../../MainData";
import FilterPrice from "./FilterPrice";
import "../../css/Filter.css";

export default function Filter() {
    const { setFilter, data, setParams } = useContext(DataContext);

    const [categoryCheck, setCategoryCheck] = useState("");
    const [priceCheck, setPriceCheck] = useState("");

    const filterCategory = [];
    const dataCopy1 = [...data];
    dataCopy1.map((item) => filterCategory.push(item.category3));

    // 디버깅용
    // console.log(category);

    return (
        <>
            <div className="filterContainer">
                <div className="filter">
                    <h4>카테고리</h4>
                    <div>
                        <dl>
                            <li>
                                <label>
                                    <input
                                        type="radio"
                                        name="categoty"
                                        value="전체"
                                        onChange={(e) => {
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
                                        }}
                                    />
                                    전체
                                </label>
                            </li>

                            {filterCategory.map((item, i) => {
                                // 현재 요소가 이전 요소들 중에 있는지 확인
                                const isDuplicate = filterCategory.slice(0, i).includes(item);

                                // 중복된 경우는 출력하지 않음
                                if (isDuplicate == false) {
                                    return (
                                        <li>
                                            <label key={i}>
                                                <input
                                                    type="radio"
                                                    name="categoty"
                                                    onChange={(e) => {
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
                                                    }}
                                                />
                                                {item}
                                            </label>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </dl>
                    </div>
                </div>

                <div className="filter">
                    <h4>가격</h4>

                    <dl>
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="price"
                                    onChange={(e) => {
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
                                    }}
                                />
                                전체
                            </label>
                        </li>

                        <FilterPrice
                            title={"0~10000"}
                            startPrice={"0"}
                            endPrice={"10000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"10000~20000"}
                            startPrice={"10000"}
                            endPrice={"20000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"20000~30000"}
                            startPrice={"20000"}
                            endPrice={"30000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"30000~40000"}
                            startPrice={"30000"}
                            endPrice={"40000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"40000~50000"}
                            startPrice={"40000"}
                            endPrice={"50000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />
                        <FilterPrice
                            title={"50000~1000000000"}
                            startPrice={"50000"}
                            endPrice={"1000000000"}
                            categoryCheck={categoryCheck}
                            setPriceCheck={setPriceCheck}
                        />

                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="price"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setParams("&sort=asc");
                                        } else {
                                            setParams("");
                                        }
                                    }}
                                />
                                오름차순 정렬
                            </label>
                        </li>

                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name="price"
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setParams("&sort=dsc");
                                        } else {
                                            setParams("");
                                        }
                                    }}
                                />
                                내림차순 정렬
                            </label>
                        </li>
                    </dl>
                </div>
            </div>
            <div className="filterDummy"></div>
        </>
    );
}
