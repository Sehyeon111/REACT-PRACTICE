import Button from "../components/Button";
import "../components/ItemList.css";
import Item from "../components/Item";
import { useState, useMemo, memo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";


const ItemList = () => {
    // 월별 일기 데이터를 가져온다
    const filterdData = useOutletContext();

    // 정렬 타입을 state로 관리한다
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }
    const nav = useNavigate();

    // 월별 일기 데이터와 정렬 타입이 바뀔 때만 재정렬 한다.
    const sortedData = useMemo(() => {
        return filterdData.toSorted((a, b)=>{
            if(sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        })
    }, [filterdData, sortType]);

    return <div className="ItemList">
        <section className="section_filter">
            <select onChange={(e)=>{onChangeSortType(e)}}>
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
            </select>
            <Button type={"POSITIVE"} comment={"새 일기 쓰기"} clickMethod={()=>{nav("/new")}}/>
        </section>
        <section className="section_list">
            {sortedData.map((item)=><Item key={item.id} item={item}/>)}
        </section>
    </div>
}
export default memo(ItemList);