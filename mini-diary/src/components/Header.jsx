import "./Header.css";

const Header = ({title, leftChild, rightChild}) => {
    return <div className="Header">
    <div className="section_leftChild">{leftChild}</div>
    <div className="section_title">{title}</div>
    <div className="section_rightChild">{rightChild}</div>
    </div>
}
export default Header;