import TodoListInput from "./TodoListInput";
import TodoList from "./TodoList";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const Todo = ({ date, data }) => {

    return <div>
        <h2>Write Your ToDoLIst For December!</h2>
        <TodoListInput date={date} />
        <div className="todoList_wrapper">
            {data.map((item) => <TodoList key={item.id} item={item} />)}
        </div>

    </div>
}

export default Todo;