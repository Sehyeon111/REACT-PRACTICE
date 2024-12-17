import { getEmotionImage } from "../utils/get_emotion_image";
import "./Viewer.css"
import { emotionList } from "../utils/constant";
const Viewer = ({content, emotionId})=>{
    const currentEmotion = emotionList.find((item)=>String(item.emotionId)===String(emotionId));

    return <div className="Viewer">
        <section className="img_section">
            <h4>오늘의 감정</h4>
            <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
                        <img src={getEmotionImage(emotionId)}/>
                        <div>{currentEmotion.emotionName}</div>
                    </div>
        </section>
        <section className="content_section">
        <h4>오늘의 일기</h4>
            <div className="content_wrapper">
                <p>{content}</p>
            </div>
        </section>
    </div>
}
export default Viewer;