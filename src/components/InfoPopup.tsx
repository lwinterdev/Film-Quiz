import React from "react";

type Props = {
  callback: any;
  closeIcon: any;
  codeIcon: any;
};

const InfoPopup: React.FC<Props> = ({ callback, closeIcon, codeIcon }) => {
  return (
    <div className="popup p-4">
      <p>
        This Project was made using React, Typescript, Bootstrap and Open Trivia 
        DB API  
        <a className="p-1" href='https://github.com/lwinterdev/Film-Quiz' target="_blank" rel="noopener noreferrer">{codeIcon}</a >
      </p>
      
      <button className="cancel-button m-1" onClick={callback}>
        {closeIcon}
      </button>
    </div>
  );
};

export default InfoPopup;
