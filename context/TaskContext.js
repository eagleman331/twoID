import React, { createContext, useMemo, useState } from "react";

export const TaskContext = createContext();

const TaskContextProvider = (props) => {
  const [completeWork, setCompleteWOrk] = useState({
    primaryData: "",
    first: "",
    second: "",
    final: "",
    targetdata: "",
    videoId: "",
  });
  const [knownUser, setKnownUser] = useState({
    name: "",
    email: "",
    group: "",
    roles: null,
    timestamp: null,
  });
  const [ready, setReady] = useState();
  const [selectedTouristSpot, setSelectedTouristSpot] = useState({})
  const [dataQuestion, setDataQuestion] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const [questionLenght, setQuestionLenght] = useState(0);
  const [testData, setTestData] = useState([]);
  const [startExam, setStartExam] = useState(false);
  const [listSubprofession, setListSubprofession] = useState([]);
  const [answerTest, setAnswerTest] = useState([])
  const [completeExam, setCompleteExam] = useState({
    profession: "",
    exam: "",
    test: "",
  });
  const memoedValue = useMemo(() => ({
    completeWork,
        setCompleteWOrk,
        answerTest, 
        setAnswerTest,
        knownUser,
        setKnownUser,
        ready,
        setReady,
        dataQuestion,
        setDataQuestion,
        quizData,
        setQuizData,
        score,
        setScore,
        questionLenght,
        setQuestionLenght,
        completeWork,
        setCompleteWOrk,
        startExam,
        setStartExam,
        listSubprofession,
        setListSubprofession,
        testData,
        setTestData,
       
  }))

  return (
    <TaskContext.Provider
    value={{completeWork,
      setCompleteWOrk,
      knownUser,
      setKnownUser,
      answerTest, 
      setAnswerTest,
      ready,
      setReady,
      dataQuestion,
      setDataQuestion,
      quizData,
      setQuizData,
      score,
      setScore,
      questionLenght,
      setQuestionLenght,
      completeWork,
      setCompleteWOrk,
      startExam,
      setStartExam,
      listSubprofession,
      setListSubprofession,
      testData,
      setTestData,
      selectedTouristSpot,
      setSelectedTouristSpot
    }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
