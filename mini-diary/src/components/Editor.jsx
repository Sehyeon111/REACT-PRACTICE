import { emotionList } from "../utils/constant";
import { getEmotionImage } from "../utils/get_emotion_image";
import "./Editor.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DiaryDispatchContext } from "../App";
import { getStringedDate } from "../utils/get-stringed-date";

const Editor = ({item, onClickUpdate}) => {
    const [form, setForm] = useState({
        ...item,
        createdDate: new Date(Number(item.createdDate))
    });
    const nav = useNavigate();

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

    const onSubmitUpdate = () => {
        onClickUpdate(form);
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
            <textarea name="content" onChange={onChangeEvent} value={form.content}></textarea>
        </section>
        <section className="section_button"> 
                    <Button comment={"취소하기"} clickMethod={()=>{nav(-1)}}/>
                    <Button comment={"작성완료"} type={"POSITIVE"} clickMethod={onSubmitUpdate}/>
        </section>
    </div>
}

export default Editor;