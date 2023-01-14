import React from 'react';
import './App.css';

//images
import BackgroundImage from './images/background.jpg';

//components
import QuestionCard from './components/QuestionCard';
import {VscDeviceCameraVideo} from 'react-icons/vsc';
import {ImSpinner6} from 'react-icons/im';
import DifficultyButton from './components/DifficultyButton';
import QuestionAmountButton from './components/QuestionAmountButton';

//styles
import './styles/answer.css';
import './styles/difficultyButton.css';
import './styles/spinner.css';
import './styles/question.css';
import './styles/startButton.css';
import './styles/nextButton.css';
import './styles/restartButton.css';
import './styles/smallButton.css';
import './styles/quizFinished.css';

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


function App() {
  
  const [questionDifficulty,setQuestionDifficulty] = useState('easy');
  const [questionAmount,setQuestionAmount] = useState(10);
  const [difficultySelected,setDifficultySelected] = useState(false);
  const [loading,setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber] = useState(0);
  const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver,setGameOver] = useState(false);


  const chooseDifficulty = (difficulty:string) => { //function to select the difficulty
    setDifficultySelected(true);
    startTrivia(difficulty);
  }


  const handleQuestionAmountChange = (amount:number) => { //function to change the amount of questions
    setQuestionAmount(prev => prev + amount);
    if (questionAmount > 50){setQuestionAmount(50)};
    if (questionAmount < 10){setQuestionAmount(10)};
  }


  const startTrivia = async(difficulty:any) => { //function to start the game
    setLoading(true);

    setQuestionDifficulty(difficulty);

    const newQuestions = await fetchQuizQuestions(
      questionAmount, difficulty
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
    console.log(gameOver)
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
    setUserAnswers(prev => [...prev, answerObject]);
  };


  const nextQuestion = () =>{ //function to jump to next question
    const nextQuestion = number +1 ;
    setNumber(nextQuestion);
  };


  const showEndResult = () => { //function to end the game
    setGameOver(true);
  }

  
  return (
    <div style={{ backgroundImage: `url(${BackgroundImage})`,
                               backgroundPosition: 'center',
                               backgroundSize: 'cover',
                               backgroundRepeat: 'no-repeat',
                               height: '100vh'}}>
                                    
      <div className='App-header'>                              
        <h1 className='p-2'>FILM QUIZ <VscDeviceCameraVideo style={{'marginBottom':'5px'}}/></h1>
        

        { /*TODO
          <div>
          
            <p className='question'>Number of Questions</p>
            <span>
              <button className='small-button' onClick={()=>handleQuestionAmountChange(10)}>+</button>
                <div>{questionAmount}</div>
              <button className='small-button' onClick={()=>handleQuestionAmountChange(-10)}>-</button>
            </span>

          </div>
          */
        }
        

        {difficultySelected && //show current difficulty only if selected
          <p>Difficulty: {questionDifficulty}</p>
        }

        {!gameOver && !loading && difficultySelected && userAnswers.length !== questionAmount +1 && //show current score only if difficulty selected
          <p>Score: {score}</p>    
        }

        {loading && 
          <div>Loading Questions... 
            <div className='spinner'>
              <ImSpinner6/>
            </div>
          </div>
        }
      </div>
      
      <div className='App'>

        {!difficultySelected &&  //show difficulty selection only if not chosen yet
          <div className=''>
        
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
      
        {!loading && !gameOver && userAnswers.length <= questionAmount +1 && difficultySelected &&//show the questions and possible answers only when the game is not over yet
          <QuestionCard 
            questionNumber={number + 1} 
            questionAmount={questionAmount} 
            question={questions[number].question} 
            answers={questions[number].answers}
            userAnswer={userAnswers && userAnswers[number]}
            correctAnswer={questions[number].correct_answer}
            callback={checkAnswer}
          />
        }

        {!gameOver && !loading && userAnswers.length === number + 1 && number !== questionAmount -1&& //show next button only if the game is currently active or last question has not yet been reached
          <button className='m-1 next-button' onClick={nextQuestion}>
            Next
          </button>
        }

        {(!gameOver && userAnswers.length === questionAmount ) && !loading && //show the finish button if last question was reached
          <button className='m-1 next-button' onClick={showEndResult}>
            Finish
          </button>
        }

        {(gameOver && userAnswers.length === questionAmount ) && !loading && //show the end screen if last answer was given
        <div>
          <p className='p-1 quiz-finished'>You got {score} out of {questionAmount} Questions correct!</p>
          {/*<div> 
            TODO: Show the score for each single answer 
          </div>*/}
          <button className='m-1 next-button' onClick={resetGame}>
            Try Again
          </button>
        </div>
        }

      </div>

      
    </div>
  );
}

export default App;
