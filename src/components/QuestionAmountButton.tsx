import React from 'react'

type Props = {
    callback:any;
    amount:number
}

const QuestionAmountButton:React.FC<Props>  = (callback,amount) => {
  return (
      <span>
        <p className='question'>Number of Questions</p>
        <button className='small-button'>+</button>
            amount
        <button className='small-button'>-</button>
      </span>
  )
}

export default QuestionAmountButton