import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { emotionList } from "../utils/constant";
import { replace, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";


const New = ()=>{
    const nav = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext);

    const onClickCreate = (form) => {
        if(window.confirm("일기를 등록할까요?")){
            onCreate(form.content, form.emotionId, form.createdDate.getTime());
            nav("/", {replace:true});
        }

    }

    return <div>
        <section >
        <Header title={"새 일기 쓰기"}
                leftChild={<Button comment={"< 뒤로 가기"} clickMethod={()=>{nav(-1)}}/>}/>
        </section>
        <section style={{borderTop: '1px solid rgb(226, 226, 226)'}}>
            <Editor onSubmit={onClickCreate}/>
        </section>
        
        
    </div>
}
export default New;