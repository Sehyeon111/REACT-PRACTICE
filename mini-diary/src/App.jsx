import { useState, useReducer, useRef, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import Details from './pages/Details'

const mockData = [
  {
    id: 1,
    content: "1번 일기 입니다.",
    emotionId: 1,
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    content: "2번 일기 입니다.",
    emotionId: 2,
    createdDate: new Date(2024, 10, 15).getTime(),
  },
  {
    id: 3,
    content: "3번 일기 입니다.",
    emotionId: 4,
    createdDate: new Date(2024, 11, 14).getTime(),
  },
]

const todoMockData = [
  {
    id: 1,
    content: "리액트 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    content: "리액트 토이 프로젝트 만들기",
    emotionId: 2,
    createdDate: new Date(2024, 11, 15).getTime(),
  },
  {
    id: 3,
    content: "이사하기",
    emotionId: 4,
    createdDate: new Date(2024, 10, 14).getTime(),
  },
]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": return [action.data, ...state];
    case "DELETE": return state.filter((item) => item.id != action.data.id);
    case "UPDATE": return state.map((item) =>
      item.id === action.data.id
        ? action.data
        : item)
  }
}

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE": return [action.data, ...state];
    case "DELETE": return state.filter((item) => item.id != action.data.id);
    case "UPDATE": return state.map((item) =>
      item.id === action.data.id
        ? action.data
        : item)
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const [todoData, todoDispatch] = useReducer(todoReducer, todoMockData);
  const itemId = useRef(mockData.length);

  const onCreate = (content, emotionId, createdDate) => {
    dispatch({
      type: "CREATE",
      data: {
        id: ++itemId.current,
        content: content,
        emotionId: emotionId,
        createdDate: createdDate,
      }
    });
  }

  const onCreate2 = (content, createdDate) => {
    todoDispatch({
      type: "CREATE",
      data: {
        id: ++itemId.current,
        content: content,
        createdDate: createdDate,
      }
    });
  }

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      data: {
        id: id
      }
    });
  }

  const onDelete2 = (id) => {
    todoDispatch({
      type: "DELETE",
      data: {
        id: id
      }
    });
  }

  const onUpdate = (id, content, emotionId, createdDate) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: id,
        content: content,
        emotionId: emotionId,
        createdDate: createdDate,
      }
    });
  }



  return (
    <>
      <DiaryStateContext.Provider value={{ data, todoData }}>
        <DiaryDispatchContext.Provider value={{ onCreate, onDelete, onUpdate, onCreate2, onDelete2 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/details/:id" element={<Details />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
            </Routes>
          </BrowserRouter>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
