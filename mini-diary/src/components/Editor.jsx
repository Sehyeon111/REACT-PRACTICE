import { emotionList } from "../utils/constant";
import { getEmotionImage } from "../utils/get_emotion_image";
import "./Editor.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext } from "../App";
import { getStringedDate } from "../utils/get-stringed-date";

// 일기 생성과 수정은 같은 Editor 컴포넌트에서 수행한다
const Editor = ({item, onSubmit}) => {
    // 사용자의 입력내용을 state로 관리한다
    const [form, setForm] = useState({});
    const nav = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // props로 item이 없다면 New 페이지로, form을 기본 내용으로 설정하고 / item이 있다면 수정 페이지로 form을 해당 item 내용으로 설정한다
    useEffect(()=>{
        if(!item){
            setForm({
                emotionId : 3,
                createdDate: new Date(),
            });
        } else {
            setForm({
                ...item,
                createdDate: new Date(Number(item.createdDate))
            });
        }
        setIsLoading(false);
    }, [item])

    // 입력 값이 변할 때마다 form state를 변경한다
    const onChangeEvent = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        if(name ==="createdDate") {
            value = new Date(value);
        }
        setForm({
            ...form,
            [name]:value,
        })
    }

    // 입력 값을 전송한다
    const onSubmitUpdate = () => {
        onSubmit(form);
    }

    if(isLoading) {
        return <div>로딩 중...</div>
    }

    return <div className="Editor">
        <section className="section_date">
            <h4>오늘의 날짜</h4>
            <input type="date" name="createdDate" value={getStringedDate(form.createdDate)}
                    onChange={onChangeEvent}/>
        </section>
        <section className="section_emotion">
            <h4>오늘의 감정</h4>
            <div className="emotion_wrapper">
            {emotionList.map((item)=> {return <div key={item.emotionId} name="emotionId" className={`EmotionItem  ${item.emotionId===form.emotionId?`EmotionItem_on_${item.emotionId}`:""}`}
                                                    onClick={()=>{
                                                        onChangeEvent({
                                                        target : {
                                                            name: "emotionId",
                                                            value: item.emotionId
                                                        } 
                                                        })}}>
                <img className="emotion_img" src={getEmotionImage(item.emotionId)}/>
                <div>{item.emotionName
                    }</div>
            </div>})}
            </div>
        </section>
        <section className="section_content">
            <h4>오늘의 일기</h4>
            <textarea name="content" onChange={onChangeEvent} value={form.content} placeholder="오늘은 어땠나요?"></textarea>
        </section>
        <section className="section_button"> 
                    <Button comment={"취소하기"} clickMethod={()=>{nav(-1)}}/>
                    <Button comment={"작성완료"} type={"POSITIVE"} clickMethod={onSubmitUpdate}/>
        </section>
    </div>
}

export default Editor;