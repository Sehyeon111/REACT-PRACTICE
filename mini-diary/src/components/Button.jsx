import "./Button.css";

const Button = ({comment, type, clickMethod})=>{
    return <button className={`Button Button_${type}`} onClick={clickMethod}>{comment}</button>
}
export default Button;