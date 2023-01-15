import React from 'react'

type Props ={
  callbackIncrement:any;
  callbackDecrement:any;
  questionAmount:number;
}

const QuestionAmountButton:React.FC<Props>  = ({questionAmount,callbackIncrement, callbackDecrement}) => {
  return (
       
    <span>
      <button className='small-button' onClick={callbackIncrement} disabled={(questionAmount === 40) ? true : false}>+</button>
        <div>{questionAmount}</div>
      <button className='small-button' onClick={callbackDecrement} disabled={(questionAmount === 10) ? true : false}>-</button>
    </span>
  
  )
}

export default QuestionAmountButton