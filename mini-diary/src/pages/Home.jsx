import Button from "../components/Button";
import Header from "../components/Header";
import ItemList from "./ItemList";
import Todo from "../components/Todo";
import { useState, useContext, useMemo } from "react";
import { DiaryStateContext } from "../App";
import { DiaryStateContext2 } from "../App";
import { Outlet } from "react-router-dom";

// 선택힌 월에 해당하는 일기 데이터를 필터링한다
const getFilterdDate = (pivotDate, data) => {
    let beginDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    let endDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    let a = data.filter((item) => (beginDate <= item.createdDate && item.createdDate <= endDate));
    return a;
};

// 선택한 월에 해당하는 todo 데이터를 필터링한다
const getFilterdTodoData = (pivotDate, todoData) => {
    let beginDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    let endDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    let b = todoData.filter((item) => (beginDate <= item.createdDate && item.createdDate <= endDate));
    return b;
}

const Home = () => {
    // 선택한 월을 state로 관리한다
    const [pivotDate, setPivotDate] = useState(new Date());

    const data = useContext(DiaryStateContext);
    const todoData = useContext(DiaryStateContext2);

    // 일기 데이터와 날짜 데이터가 바뀔 때만 필터링을 수행한다
    const monthlyData = useMemo(
        ()=>{return getFilterdDate(pivotDate, data)},[data, pivotDate]);
        
    // todo 데이터와 날짜 데이터가 바뀔 때만 필터링을 수행한다
    const monthlyTodoData = useMemo(
        ()=>{return getFilterdTodoData(pivotDate, todoData)}, [todoData, pivotDate]);

    const increaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }
    const decreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return <div className="Home">
        <section className="section_header" style={{width: '30%', margin: '0 auto'}}>
            <Header title={pivotDate.getFullYear() + "년 " + (pivotDate.getMonth() + 1) + "월"}
                leftChild={<Button comment={"<"} clickMethod={decreaseMonth} />}
                rightChild={<Button comment={">"} clickMethod={increaseMonth} />} />
        </section>
        <section className="main_content" style={{ display: 'flex', justifyContent: 'space-around' , borderTop: '1px solid rgb(226, 226, 226)'}}>
            <section className="section_todolist" style={{ width: "40%"}}>
                <Todo date={pivotDate} data={monthlyTodoData} />
            </section>
            <section className="section_list" style={{ width: "40%" }}>
                {/* Diary 부분은 이벤트에 따라 다른 컴포넌트를 렌더링 한다 */}
                <Outlet context={monthlyData}/>    
            </section>
        </section>

    </div>
}
export default Home;