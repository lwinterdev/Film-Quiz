import React from "react";

type Props = {
  callback: any;
  closeIcon: any;
};

const InfoPopup: React.FC<Props> = ({ callback, closeIcon }) => {
  return (
    <div className="popup">
      <p>
        This Project was made using React, Typescript, Bootstrap and Open Trivia
        DB API
      </p>
      <button className="cancel-button m-1" onClick={callback}>
        {closeIcon}
      </button>
    </div>
  );
};

export default InfoPopup;
