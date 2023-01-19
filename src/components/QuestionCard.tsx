import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNumber: number;
  questionAmount: number;
  correctAnswer: string;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  questionAmount,
  correctAnswer,
}) => {
  return (
    <div className="App">
      <div className="p-1">
        Question: {questionNumber}/{questionAmount}
      </div>

      <p
        className="question p-2"
        dangerouslySetInnerHTML={{ __html: question }}
      ></p>

      <div>
        {answers &&
          answers.map((answer) => (
            <div className={"answer-container"} key={answer}>
              <div
                className={
                  userAnswer && userAnswer.answer === answer
                    ? "p-1 chosen-answer"
                    : " p-1 answer-container"
                }
              >
                <button
                  className={
                    userAnswer && answer === correctAnswer
                      ? "correct-answer"
                      : "answer"
                  }
                  disabled={userAnswer ? true : false}
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
