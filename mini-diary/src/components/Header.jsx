import "./Header.css";

/*
title: 헤더 글씨
leftChild: 왼쪽 요소
rightChild: 오른쪽 요소
*/
const Header = ({title, leftChild, rightChild}) => {
    return <div className="Header">
    <div className="section_leftChild">{leftChild}</div>
    <div className="section_title">{title}</div>
    <div className="section_rightChild">{rightChild}</div>
    </div>
}
export default Header;