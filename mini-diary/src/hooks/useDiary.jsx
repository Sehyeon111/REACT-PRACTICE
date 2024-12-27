import { DiaryStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// id에 해당하는 Diary를 가져온다
function useDiary(id) {
    const data = useContext(DiaryStateContext);
    const [currentDiaryItem, setCurrentDiaryItem] = useState(null);
    const nav = useNavigate();

    useEffect(()=>{
        const currentDiaryItem = data.find((item)=>String(item.id) === String(id));

        if(!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.");
            nav('/', {replace:true});
        }

        else setCurrentDiaryItem(currentDiaryItem);
    }, [id]);

    return currentDiaryItem;
}

export default useDiary;