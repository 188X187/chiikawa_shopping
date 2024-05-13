import { useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { DataContext } from '../../MainData';
import FilterPrice from './FilterPrice';
import { Button } from 'react-bootstrap';

function FilterV2() {

    const { filter, data, setData, setParams } = useContext(DataContext);

    const filterCategory = filter.map((item) => (
        item.category3
    ))

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>카테고리</Accordion.Header>
                    <Accordion.Body>
                        {filterCategory.map((item, i) => {
                            // 현재 요소가 이전 요소들 중에 있는지 확인
                            const isDuplicate = filterCategory.slice(0, i).includes(item);

                            // 중복된 경우는 출력하지 않음
                            if (isDuplicate == false) {
                                return (
                                    <Button key={i} onClick={(e) => {
                                        if (e) {
                                            // data.filter((a) => a.filterCategorygory3 == a)
                                            setData(data.filter((data) => data.category3 == item))
                                        } else {
                                            setData(filter)
                                        }
                                    }}>
                                        {item}
                                    </Button>
                                );
                            }
                            return null;
                        })}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>가격</Accordion.Header>
                    <Accordion.Body>
                        <Button onClick={(e) => { if (e) { setParams(''); setData(filter) } }}>전체</Button>
                        <FilterPrice title={"~1만원"} startPrice={"0"} endPrice={"10000"} />
                        <FilterPrice title={"1~2만원"} startPrice={"10000"} endPrice={"20000"} />
                        <FilterPrice title={"2~3만원"} startPrice={"20000"} endPrice={"30000"} />
                        <FilterPrice title={"3~4만원"} startPrice={"30000"} endPrice={"40000"} />
                        <FilterPrice title={"4~5만원"} startPrice={"40000"} endPrice={"50000"} />
                        <FilterPrice title={"5만원~"} startPrice={"50000"} endPrice={"1000000000"} />
                        <Button onClick={(e) => {
                            if (e) {
                                setParams("&sort=asc")
                            } else {
                                setParams('')
                            }
                        }}>오름차순</Button>
                        <Button onClick={(e) => {
                            if (e) {
                                setParams("&sort=dsc")
                            } else {
                                setParams('')
                            }
                        }}>내림차순</Button>

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion >
        </>
    );
}

export default FilterV2;