import Header from "../components/Header";
import Button from "../components/Button";
import { getEmotionImage } from "../utils/get_emotion_image";
import useDiary from "../hooks/useDiary";
import { useNavigate, useParams } from "react-router-dom";
import Viewer from "../components/Viewer";
import { getStringedDate } from "../utils/get-stringed-date";


const Details = ()=>{
    const params = useParams();
    const item = useDiary(params.id);
    const nav = useNavigate();
    
    if (!item) {
        return <div>로딩 중...</div>; // 로딩 중 상태 표시
    }

    return <div>
        <Header title={getStringedDate(new Date(item.createdDate))+" 기록"}
                leftChild={<Button comment={"< 뒤로 가기"} clickMethod={()=>{nav(-1)}}/>}
                rightChild={<Button comment={"수정하기"} clickMethod={()=>{nav(`/edit/${item.id}`)}}/>}/>
    <Viewer content={item.content} emotionId={item.emotionId}/>
    </div>
}
export default Details;