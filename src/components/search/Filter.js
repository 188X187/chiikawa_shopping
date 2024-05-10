import { useContext, useState } from 'react';
import { DataContext } from '../../MainData';

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
                <label><input type="checkbox" name="price"
                    onChange={(e) => {
                        if (e.target.checked) {
                            setParams("&sort=asc")
                        } else {
                            setParams('')
                        }
                    }} />오름차순 정렬</label>
                <label><input type="checkbox" name="price"
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