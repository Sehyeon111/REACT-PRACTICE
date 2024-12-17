import "./Item.css";
import Button from "./Button";
import { getEmotionImage } from "../utils/get_emotion_image";
import { useNavigate } from "react-router-dom";

const Item = ({item}) => {
    const nav = useNavigate();

    return <div className="Item" >
        <div className={`section_img img_section_${item.emotionId}`} onClick={()=>{nav(`/details/${item.id}`)}}>
            <img src={getEmotionImage(item.emotionId)}/>
        </div>
        <div className="section_content" onClick={()=>{nav(`/details/${item.id}`)}}>
            <div className="div_createdDate">{new Date(item.createdDate).toLocaleDateString()}</div>
            <div className="div_content">{item.content}</div>
        </div>
        <div className="section_button">
            <Button comment={"수정하기"} clickMethod={()=>{nav(`/edit/${item.id}`)}}/>
        </div>
    </div>
}
export default Item;