import "./Button.css";

/*
comment: 버튼 글씨
type: 버튼 색 지정
clickMethod: 클릭 이벤트 처리 함수
*/
const Button = ({comment, type, clickMethod})=>{
    return <button className={`Button Button_${type}`} onClick={clickMethod}>{comment}</button>
}
export default Button;