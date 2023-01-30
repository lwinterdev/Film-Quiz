import React from 'react'

type Props = {
    value:any;
}

const ProgressBar :React.FC<Props> = ({value}) => {
  return (
    <div className='progress-container'>
        <div className='progress' style={{width:value}}>{value}</div>    
    </div>
  )
}

export default ProgressBar