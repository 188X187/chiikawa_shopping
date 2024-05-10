import { useContext, useState } from 'react';
import { DataContext } from '../../MainData';

export default function Filter(){
    // const [params, setParams] = useState('')
    const { setParams } = useContext(DataContext);
    return(
        <>
        <div>
            <h4>카테고리</h4>
            <span>인형</span>
            <span>피규어</span>
            <span>가챠</span>
            <span>카드</span>
            <span>시계</span>
            <span>마스코트</span>
        </div>
        <div>
            <h4>가격</h4>
            <label><input type="radio" name="price"
            onChange={(e)=>{
                if(e.target.checked){
                    setParams("&sort=asc")
                } else {
                    setParams('')
                }
            }}/>오름차순 정렬</label>
            <label><input type="radio" name="price"
            onChange={(e)=>{
                if(e.target.checked){
                    setParams("&sort=dsc")
                } else {
                    setParams('')
                }
            }}/>내림차순 정렬</label>
        </div>
        </>
    )
}