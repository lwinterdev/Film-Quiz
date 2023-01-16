import React from 'react'


type Props = {
    difficulty: string;
    callback: any;
}

const DifficultyButton:React.FC<Props> = ({difficulty,callback}) => {
 
    return (
        <div className='p-1 answer-container'  >
            <button className='difficulty-button' onClick={callback}>
                <div>{difficulty}</div>
            </button>
        </div>
    )
}

export default DifficultyButton