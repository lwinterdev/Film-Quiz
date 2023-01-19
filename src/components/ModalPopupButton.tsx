import { useState } from "react";

type Props = {
  label: any;
  toggled: boolean;
  onClick: any;
};

const ModelPopupButton: React.FC<Props> = ({ label, toggled, onClick }) => {
  const [isToggled, setToggle] = useState(toggled);

  const callback = () => {
    setToggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label className="m-2">
      <input
        className="info-button"
        type="checkbox"
        defaultChecked={isToggled}
        onClick={callback}
      />
      <span />
      <strong className="info-button">{label}</strong>
    </label>
  );
};

export default ModelPopupButton;
