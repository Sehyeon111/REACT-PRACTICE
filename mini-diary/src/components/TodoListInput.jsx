import Button from "./Button";
import "./TodoListInput.css";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { useState } from "react";
const TodoListInput = ({ date }) => {
    const { onCreate2 } = useContext(DiaryDispatchContext);
    const [input, setInput] = useState("");

    const onChangeInput = (e) => {
        setInput(e.target.value);
    }

    const onClickCreate2 = () => {
        onCreate2(input, date);
    }
    return <div className="TodoListInput">
        <input type="text" onChange={onChangeInput} />
        <Button comment={"저장"} type={"POSITIVE"} clickMethod={onClickCreate2} />
    </div>
}
export default TodoListInput;