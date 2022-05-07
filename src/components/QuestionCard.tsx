import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number
}

const QuestionCard:React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions}) => {
  return (
    <div>
      <p>Question: {questionNumber} / {totalQuestions}</p>
      <p className='question p-3' dangerouslySetInnerHTML={{__html: question}}></p>
      <div>
        {answers && answers.map(answer => (
          <div className='p-1 answer-container ' key={answer}>
            <button className='answer' disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
          </div>
        ))}
      </div>
    </div>

    
  )
}

export default QuestionCard