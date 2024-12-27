import TodoListInput from "./TodoListInput";
import TodoList from "./TodoList";
import "./Todo.css"

const Todo = ({ date, data }) => {

    return <div className="Todo">
        <h2 className="todo_title">🌱 Write Your ToDoLIst For {new Intl.DateTimeFormat('en-US',{month:'long'}).format(date)}!</h2>
        <TodoListInput date={date} />
        <div className="todoList_wrapper">
            {/* 월별 todo리스트를 개별 todo로 렌더링한다 */}
            {data.map((item) => <TodoList key={item.id} item={item} />)}
        </div>

    </div>
}

export default Todo;