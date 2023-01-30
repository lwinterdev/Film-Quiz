import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  questionAmount: number;
  correctAnswer: string;
  questionTime: any;
  difficulty:any;
  score:any
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  questionAmount,
  correctAnswer,
  questionTime,
  score,
  difficulty,
}) => {
  return (
    <div className="App">

      <div className="panel p-3">
        <span className="p-3">Difficulty: {difficulty} || Question: {questionNumber}/{questionAmount} || Score: {score}</span>
      </div>
      
      <p
        className="question p-3"
        dangerouslySetInnerHTML={{ __html: question }}
      ></p>

      <div>
        {answers &&
          answers.map((answer) => (
            <div className={"answer-container"} key={answer}>
              <div
                className={
                  userAnswer && userAnswer.answer === answer //show different style if user has chosen
                    ? "p-1 chosen-answer"
                    : " p-1 answer-container"
                }
              >
                <button
                  className={
                    userAnswer && answer === correctAnswer //show the correct answer after user has chosen
                      ? "correct-answer"
                      : "answer"
                  }
                  disabled={userAnswer ? true : false} //disable after user has chosen answer
                  value={answer}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionCard;
