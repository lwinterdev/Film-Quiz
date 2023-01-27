import React from "react";

type Props = {
  callback: any;
  closeIcon: any;
};

const InfoPopup: React.FC<Props> = ({ callback, closeIcon }) => {
  return (
    <div className="popup p-4">
      <p>
        This Project was made using React, Typescript, Bootstrap
        <button className="cancel-button m-1" onClick={callback}>
          {closeIcon}
        </button>
      </p>
    </div>
  );
};

export default InfoPopup;
