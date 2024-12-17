import Button from "./Button";
import "./ItemList.css";
import Item from "./Item";
import { useContext, useState, useMemo } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";


const ItemList = ({filterdDate}) => {
    const [sortType, setSortType] = useState("latest");
    const nav = useNavigate();
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }
    
    const sortedData = useMemo(() => {
        return filterdDate.toSorted((a, b)=>{
            if(sortType === "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        })
    }, [filterdDate, sortType]);

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
export default ItemList;