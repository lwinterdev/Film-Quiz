import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  totalQuestions: number;
  correctAnswer: string
}

const QuestionCard:React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, totalQuestions, correctAnswer}) => {
  return (
    <div>
      <p>Question: {questionNumber} / {totalQuestions}</p>
      <p className='question p-3' dangerouslySetInnerHTML={{__html: question}}></p>
      <div>
        {answers && answers.map(answer => (
          <div className='p-1 answer-container ' key={answer} >
            <button className='answer' disabled={userAnswer ? true : false} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
          </div>
        ))}
      </div>
      {userAnswer &&
        <div> The correct answer was: 
        <div dangerouslySetInnerHTML={{__html: correctAnswer}}></div>
        </div>
      }
    </div>

    
  )
}

export default QuestionCard