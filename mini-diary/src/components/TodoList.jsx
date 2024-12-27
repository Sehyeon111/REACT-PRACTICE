import "./TodoList.css";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const TodoList = ({item}) => {
    const {onDelete2, onUpdate2} = useContext(DiaryDispatchContext);

    const onClickDelete2 = () => {
        onDelete2(item.id);
    }

    const onClickUpdate2 = () => {
        onUpdate2(item.id);
    }

    return <div className="TodoList">
        <div className="isDoneButton" onClick={onClickUpdate2}>
        {item.isDone?"✅" : "⬜"} 
        </div>
        <div className="content" style={item.isDone?{textDecoration:'line-through', textDecorationColor:'gray'}:{}}>
            {item.content}
        </div>
        <div className="deleteButton" onClick={onClickDelete2}>
            ➖
        </div>
        </div>
}
export default TodoList;