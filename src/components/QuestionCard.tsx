import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  questionAmount: number;
  correctAnswer: string

}

const QuestionCard:React.FC<Props> = ({question, answers, callback, userAnswer, questionNumber, questionAmount, correctAnswer}) => {

  return (

    <div>
      <p>Question: {questionNumber} / {questionAmount}</p>
      <p className='question p-2' dangerouslySetInnerHTML={{__html: question}}></p>
      
      <div>
        {answers && answers.map(answer => (
          <div className='p-1 answer-container ' key={answer} >
            <button className={(userAnswer && answer === correctAnswer) ? 'correct-answer' : 'answer'} disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}}></span>
            </button>
          </div>
        ))}
      </div>

  	</div>

    
  )
}

export default QuestionCard