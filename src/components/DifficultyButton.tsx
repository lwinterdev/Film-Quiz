import React from 'react'


type Props = {
    difficulty: string;
    callback: any;
}

const DifficultyButton:React.FC<Props> = ({difficulty,callback}) => {
 
    return (
        <button className='difficulty-button' onClick={callback}>
            <div>{difficulty}</div>
        </button>
    )
}

export default DifficultyButton