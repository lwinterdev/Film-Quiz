import React from "react";
import "./App.css";

//images
import BackgroundImage from "./images/background.jpg";

//components
import QuestionCard from "./components/QuestionCard";
import { VscDeviceCameraVideo } from "react-icons/vsc";
import { ImSpinner6 } from "react-icons/im";
import { TbGrain } from "react-icons/tb";
import { FiInfo } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";
import { VscGithub } from "react-icons/vsc";
import { MdOutlineAccessAlarm } from "react-icons/md";
import DifficultyButton from "./components/DifficultyButton";
import QuestionAmountButton from "./components/QuestionAmountButton";
import ToggleButton from "./components/ToggleButton";
import ModalPopupButton from "./components/ModalPopupButton";
import InfoPopup from "./components/InfoPopup";

//styles
import "./styles/answer.css";
import "./styles/difficultyButton.css";
import "./styles/spinner.css";
import "./styles/question.css";
import "./styles/startButton.css";
import "./styles/nextButton.css";
import "./styles/restartButton.css";
import "./styles/smallButton.css";
import "./styles/quizFinished.css";
import "./styles/toggleButton.css";
import "./styles/progress.css";

//hooks
import { useState, useEffect, useRef } from "react";
import { fetchQuizQuestions } from "./API";
import { QuestionState } from "./API";
import { useLocalStorage } from "usehooks-ts";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [questionDifficulty, setQuestionDifficulty] = useState("easy");
  const [questionAmount, setQuestionAmount] = useState(10);
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [infoPopupToggle, setInfoPopupToggle] = useState(false);

  const [grainToggle, setGrainToggle] = useLocalStorage("grainToggle", true); //get the value from local storage

  const [timerToggle, setTimerToggle] = useState(false);
  const handleTimerToggle = () => {
    //function to toggle the timer for quiz
    setTimerToggle(!timerToggle);
  };

  const chooseDifficulty = (difficulty: string) => {
    //function to select the difficulty
    setQuestionDifficulty(difficulty);
    setDifficultySelected(true);
    startTrivia(difficulty);
  };

  const handleQuestionAmountChange = (amount: number) => {
    //function to change the amount of questions
    setQuestionAmount((prev) => prev + amount);
  };

  const startTrivia = async (difficulty: any) => {
    //function to start the game
    setLoading(true);

    const newQuestions = await fetchQuizQuestions(questionAmount, difficulty);

    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setScore(0);
    setGameOver(false);
    setLoading(false);

  };

  const resetGame = () => {
    //function to reset the game after finishing
    setDifficultySelected(false);
    setQuestionDifficulty("easy");
    setUserAnswers([]);
    setNumber(0);
    setScore(0);
    setGameOver(false);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    //function to check the answer the user has given
    const answer = e.currentTarget.value;
    //check if correct
    const correct = questions[number].correct_answer === answer;
    //add score if correct
    if (correct) setScore((prev) => prev + 1);

    //save answer
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };


  const nextQuestion = () => {
    //function to jump to next question
    const nextQuestion = number + 1;
    setNumber(nextQuestion);
  };

  const showEndResult = () => {
    //function to end the game
    setGameOver(true);
  };

  const handleGrainToggle = () => {
    //function to toggle the film grain effect
    setGrainToggle(!grainToggle);
  };

  const handleInfoPopupToggle = () => {
    //function to toggle the website info
    setInfoPopupToggle(!infoPopupToggle);
  };

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [refOne]);

  const handleClickOutside = (e: any) => {
    //function to react to clicks outside of the referenced element
    try {
      if (!refOne!.current!.contains(e.target)!) {
        setInfoPopupToggle(false); //typescript would throw an error otherwise
      }
    } catch {}
  };

  return (
    <div
      className={grainToggle ? "grain-active" : ""}
      style={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <span className="">
        <div className="grain-toggle">
          <ToggleButton
            label={<TbGrain size={20} />}
            toggled={grainToggle}
            onClick={handleGrainToggle}
          />
        </div>

        {<span className="App">
          <h1 className="p-3">
            FILM QUIZ <VscDeviceCameraVideo style={{ marginBottom: "5px" }} />
          </h1>
        </span>}
      </span>

      <div className="App-header">
        <div className="App">
          {loading && ( //show spinner if the questions are loading
            <div>
              Loading Questions...
              <div className="spinner">
                <ImSpinner6 color="" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="App">
        {!difficultySelected && ( //show number and timer selection only if difficulty not chosen yet
          <div>
            <p className="p-2">Number of Questions</p>

            <QuestionAmountButton
              questionAmount={questionAmount}
              callbackIncrement={() => handleQuestionAmountChange(10)}
              callbackDecrement={() => handleQuestionAmountChange(-10)}
            />
            
          </div>
        )}

        {!difficultySelected && ( //show difficulty selection only if not chosen yet
          <>
            <p className="p-2">Select Difficulty</p>

            <DifficultyButton
              difficulty="Easy"
              callback={() => chooseDifficulty("easy")}
            />

            <DifficultyButton
              difficulty="Medium"
              callback={() => chooseDifficulty("medium")}
            />

            <DifficultyButton
              difficulty="Hard"
              callback={() => chooseDifficulty("hard")}
            />
          </>
        )}

        {/*(!gameOver && difficultySelected ) && !loading && //show the start button if difficulty chosen (would break the app somehow right now if displayed :shrug:)
          <button className='m-1 start-button' onClick={() => startTrivia(questionDifficulty)}> 
            Start
          </button>*/}

        {!loading &&
          !gameOver &&
          userAnswers.length <= questionAmount + 1 &&
          difficultySelected && ( //show the questions and possible answers only when the game is not over yet
            <div>
              <QuestionCard
                questionNumber={number + 1}
                questionAmount={questionAmount}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers && userAnswers[number]}
                correctAnswer={questions[number].correct_answer}
                callback={checkAnswer}
                score={score}
                difficulty={questionDifficulty}
              />
            </div>
          )}

        {!gameOver &&
          difficultySelected &&
          !loading &&
          userAnswers.length !== questionAmount && ( //show next button only if the game is currently active or last question has not yet been reached
            <div>
              <button
                className="m-1 next-button"
                onClick={nextQuestion}
                disabled={
                  //make button invisible when user has not answered + to keep the background image from changing size all the time
                  !gameOver &&
                  !loading &&
                  userAnswers.length === number + 1 &&
                  number !== questionAmount - 1
                    ? false
                    : true
                }
              >
                Next
              </button>
            </div>
          )}

        {!gameOver &&
          userAnswers.length === questionAmount &&
          !loading && ( //show the finish button if last question was reached
            <button className="m-1 next-button" onClick={showEndResult}>
              Finish
            </button>
          )}

        {gameOver &&
          userAnswers.length === questionAmount &&
          !loading && ( //show the end screen if last answer was given
            <div>
              <div className="end-image">Fin</div>
              <p className="p-1 quiz-finished">
                You got {score} out of {questionAmount} Questions correct!
              </p>
              <div className="end-card">
                <button className="m-1 next-button" onClick={resetGame}>
                  Try Again
                </button>
              </div>
            </div>
          )}
      </div>

      <div className="App-footer">
        <ModalPopupButton
          label={<FiInfo size={30} />}
          toggled={infoPopupToggle}
          onClick={handleInfoPopupToggle}
        />
      </div>

      {infoPopupToggle && ( //show the info popup only when toggled
        <span className="popup m-1" ref={refOne}>
          <InfoPopup
            callback={() => setInfoPopupToggle(false)}
            closeIcon={<ImCancelCircle />}
            codeIcon={<VscGithub />}
          />
        </span>
      )}
    </div>
  );
}

export default App;
