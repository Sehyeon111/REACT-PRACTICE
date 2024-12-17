import Header from "../components/Header"
import Button from "../components/Button"
import { getEmotionImage } from "../utils/get_emotion_image";
import useDiary from "../hooks/useDiary";
import { useNavigate, useParams } from "react-router-dom";
import Viewer from "../components/Viewer";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "../components/Editor";

const Edit = ()=>{
    const params = useParams();
    const item = useDiary(params.id);
    const nav = useNavigate();
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);

    const onClickDelete = () =>{
        if(window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")){
            onDelete(params.id);
            nav('/', {replace:true});
        } 
    }

    const onClickUpdate = (form) => {
        if(window.confirm("일기를 정말 수정할까요?")){
            console.log(form);
            onUpdate(form.id, form.content, form.emotionId, form.createdDate.getTime());
            nav('/', {replace:true});
            }
    }
    
    if(!item){
        return <div>로딩 중...</div>
    }

    return <div className="Edit">
        <Header title={"일기 수정하기"} 
        leftChild={<Button comment={"< 뒤로 가기"} clickMethod={()=>{nav(-1)}}/>}
        rightChild={<Button comment={"삭제하기"} type={"NEGATIVE"} clickMethod={onClickDelete}/>}/>

        <Editor item={item} onClickUpdate={onClickUpdate}/>
    </div>

}
export default Edit;