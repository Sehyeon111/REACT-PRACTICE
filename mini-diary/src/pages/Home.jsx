import Button from "../components/Button";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import Todo from "../components/Todo";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App";

const getFilterdDate = (pivotDate, data) => {
    let beginDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    let endDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    let a = data.filter((item) => (beginDate <= item.createdDate && item.createdDate <= endDate));
    return a;
};

const getFilterdTodoData = (pivotDate, todoData) => {
    let beginDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    let endDate = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    let b = todoData.filter((item) => (beginDate <= item.createdDate && item.createdDate <= endDate));
    return b;
}

const Home = () => {
    const [pivotDate, setPivotDate] = useState(new Date());
    const { data, todoData } = useContext(DiaryStateContext);
    const monthlyData = getFilterdDate(pivotDate, data);
    const monthlyTodoData = getFilterdTodoData(pivotDate, todoData);

    const increaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }
    const decreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    return <div className="Home">
        <section className="section_header">
            <Header title={pivotDate.getFullYear() + "년 " + (pivotDate.getMonth() + 1) + "월"}
                leftChild={<Button comment={"<"} clickMethod={decreaseMonth} />}
                rightChild={<Button comment={">"} clickMethod={increaseMonth} />} />
        </section>
        <section className="main_content" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <section className="section_todolist" style={{ width: "40%" }}>
                <Todo date={pivotDate} data={monthlyTodoData} />
            </section>
            <section className="section_list" style={{ width: "40%" }}>
                <ItemList filterdDate={monthlyData} />
            </section>
        </section>

    </div>
}
export default Home;