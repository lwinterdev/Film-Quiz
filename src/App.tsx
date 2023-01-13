import React from 'react';
import './App.css';

//images
import BackgroundImage from './images/background.jpg';

//components
import QuestionCard from './components/QuestionCard';
import {VscDeviceCameraVideo} from 'react-icons/vsc';
import DifficultyButton from './components/DifficultyButton';
import QuestionAmountButton from './components/QuestionAmountButton';

//hooks
import { useState } from 'react';

import { fetchQuizQuestions } from './API';
import { QuestionState } from './API';

type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TotalQuestions = 10;

function App() {
  
  const [qestionDifficulty,setQuestionDifficulty] = useState('easy');
  const [questionAmount,setQuestionAmount] = useState(10);
  const [difficultySelected,setDifficultySelected] = useState(false);
  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);


  const chooseDifficulty = (difficulty:string) => { //function to select the difficulty
    setDifficultySelected(true);
    startTrivia(difficulty);
  }

  const handleQuestionAmountChange = (event:any) => {
    setQuestionAmount(event.target.value);
  }


  const startTrivia = async(difficulty:any) => { //function to start the game
    setLoading(true);

    setQuestionDifficulty(difficulty);

    const newQuestions = await fetchQuizQuestions(
      TotalQuestions, difficulty
    );

    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setScore(0);
    setGameOver(false);
    setLoading(false);
  };


  const resetGame = () => { //function to reset the game after finishing
    setDifficultySelected(false);
    setUserAnswers([]);
    setNumber(0);
    setScore(0);
    setGameOver(false);
    setLoading(false);
  }

  
  const checkAnswer =(e: React.MouseEvent<HTMLButtonElement>) => { //function to check the answer the user has given
    const answer = e.currentTarget.value;
    //check if correct
    const correct = questions[number].correct_answer === answer;
    //add score if correct
    if (correct) setScore(prev => prev +1);
    //save answer
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer

    };
    setUserAnswers(prev => [...prev, answerObject])
  };


  const nextQuestion = () =>{ //function to jump to next question
    const nextQuestion = number +1 ;
    setNumber(nextQuestion);
  };

  
  return (
    <div className="App" style={{ backgroundImage: `url(${BackgroundImage})`,
                                  backgroundPosition: 'center',
                                  backgroundSize: 'cover',
                                  backgroundRepeat: 'no-repeat'}}>

      <h1 className='p-4'>FILM QUIZ <VscDeviceCameraVideo style={{'marginBottom':'5px'}}/></h1>
      
      {(gameOver ) && !loading && difficultySelected && //show the start button only when the game is finished or not started yet
        <button className='start-button' onClick={startTrivia}>
          Start
        </button>
      }

      
      {!difficultySelected &&   //show difficulty selection only if not chosen yet
        <div>
          <p className='question p-2'>Select Difficulty</p>
          
          <DifficultyButton
            difficulty = 'Easy'
            callback = {() =>chooseDifficulty('easy')}
          />

          <DifficultyButton
            difficulty = 'Medium'
            callback = {() =>chooseDifficulty('medium')}
          />

          <DifficultyButton
            difficulty = 'Hard'
            callback = {() =>chooseDifficulty('hard')}
          />
        </div>
      }

      { /* TODO
        <QuestionAmountButton
          callback={setQuestionAmount}
          amount={TotalQuestions}
        /> */
      }

      {/*difficultySelected &&
        <p>{qestionDifficulty}</p>*/
      }

      {!loading && difficultySelected &&
        <p>Score: {score}</p>
      }

      {loading && <p>Loading Questions...</p>}
      
      {!loading && !gameOver && userAnswers.length !== TotalQuestions +1 && difficultySelected &&//show the questions and possible answers only when the game is not over yet
        <QuestionCard 
          questionNumber={number + 1} 
          totalQuestions={TotalQuestions} 
          question={questions[number].question} 
          answers={questions[number].answers}
          userAnswer={userAnswers && userAnswers[number]}
          correctAnswer={questions[number].correct_answer}
          callback={checkAnswer}
        />
      }
      
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TotalQuestions -1&& //show next button only if the game is currently active or last question has not yet been reached
            <button className='m-4 next-button ' onClick={nextQuestion}>
              Next
            </button>
      }

      {userAnswers.length === TotalQuestions && !loading && //show the final score after game is finished
        <>
          <div className='quiz-finished'>Quiz Finished!</div>
          <p>You got {score} out of 10 Questions correct!</p>
        </>
      }

      {(!gameOver && userAnswers.length === TotalQuestions ) && !loading && //show the start button only when the game is finished or not started yet
        <button className='start-button' onClick={resetGame}>
          Try Again
        </button>
      }

      

    </div>
  );
}

export default App;