import React from 'react';
import './App.css';

//images
import BackgroundImage from './images/background.jpg';

//components
import QuestionCard from './components/QuestionCard';
import {VscDeviceCameraVideo} from 'react-icons/vsc';

//hooks
import { useState } from 'react';

import { fetchQuizQuestions } from './API';
import { Difficulty, QuestionState } from './API';

type AnswerObject = {
  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;
}

const TotalQuestions = 10;

function App() {
  

  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(true);

 
  const startTrivia = async() => { //function to start the game
    setLoading(true);

    const newQuestions = await fetchQuizQuestions(
      TotalQuestions, Difficulty.EASY
    );

    setQuestions(newQuestions);
    setUserAnswers([]);
    setNumber(0);
    setScore(0);
    setGameOver(false);
    setLoading(false);


  };

  
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
      
      {(gameOver ) && !loading && //show the start button only when the game is finished or not started yet
        <button className='start-button' onClick={startTrivia}>
          Start
        </button>
      }
      
      { !loading &&
        <p>Score: {score}</p>
      }

      {loading && <p>Loading Questions...</p>}
      
      {!loading && !gameOver && userAnswers.length !== TotalQuestions +1 && //show the questions and possible answers only when the game is not over yet
        <QuestionCard 
          questionNumber={number + 1} 
          totalQuestions={TotalQuestions} 
          question={questions[number].question} 
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          correctAnswer={questions[number].correct_answer}
          callback={checkAnswer}
        />
      }
      
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TotalQuestions -1&& //show next button only if the game is currently active or last question has not yet been reached
            <button className='m-4 next-button ' onClick={nextQuestion}>
              Next
            </button>
      }

      {userAnswers.length == TotalQuestions && !loading &&
        <>
          <div className='quiz-finished'>Quiz Finished!</div>
          <p>You got {score} out of 10 Questions correct!</p>
        </>
      }

      {(!gameOver && userAnswers.length === TotalQuestions ) && !loading && //show the start button only when the game is finished or not started yet
        <button className='start-button' onClick={startTrivia}>
          Try Again
        </button>
      }

      

    </div>
  );
}

export default App;
