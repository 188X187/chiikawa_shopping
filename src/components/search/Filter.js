import { useContext, useState } from 'react';
import { DataContext } from '../../MainData';
import FilterPrice from './FilterPrice';

export default function Filter() {
    // const [params, setParams] = useState('')
    const { filter, data, setData, setParams } = useContext(DataContext);

    const filterCategory = filter.map((item) => (
        item.category3
    ))

    return (
        <>
            <div>
                <h4>카테고리</h4>
                <div>
                    {filterCategory.map((item, i) => {
                        // 현재 요소가 이전 요소들 중에 있는지 확인
                        const isDuplicate = filterCategory.slice(0, i).includes(item);

                        // 중복된 경우는 출력하지 않음
                        if (isDuplicate == false) {
                            return (
                                <label key={i}>
                                    <input type='checkbox'
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                // data.filter((a) => a.filterCategorygory3 == a)
                                                setData(data.filter((data) => data.category3 == item))
                                            } else {
                                                setData(filter)
                                            }
                                        }} />
                                    {item}
                                </label>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            <div>
                <h4>가격</h4>
                <label><input type='radio' name="price" onChange={(e) => { if (e.target.checked) { setParams(''); setData(filter)}}}/>전체</label>
                <FilterPrice title={"~1만원"} startPrice={"0"} endPrice={"10000"} />
                <FilterPrice title={"1~2만원"} startPrice={"10000"} endPrice={"20000"} />
                <FilterPrice title={"2~3만원"} startPrice={"20000"} endPrice={"30000"} />
                <FilterPrice title={"3~4만원"} startPrice={"30000"} endPrice={"40000"} />
                <FilterPrice title={"4~5만원"} startPrice={"40000"} endPrice={"50000"} />
                <FilterPrice title={"5만원~"} startPrice={"50000"} endPrice={"1000000000"} />
                <label><input type="radio" name="price"
                    onChange={(e) => {
                        if (e.target.checked) {
                            setParams("&sort=asc")
                        } else {
                            setParams('')
                        }
                    }} />오름차순 정렬</label>
                <label><input type="radio" name="price"
                    onChange={(e) => {
                        if (e.target.checked) {
                            setParams("&sort=dsc")
                        } else {
                            setParams('')
                        }
                    }} />내림차순 정렬</label>
            </div>
        </>
    )
}