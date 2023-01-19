import { useState } from "react";

type Props = {
  label: any;
  toggled: boolean;
  onClick: any;
};

const Toggle: React.FC<Props> = ({ label, toggled, onClick }) => {
  const [isToggled, setToggle] = useState(toggled);

  const callback = () => {
    setToggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <label className="m-2">
      <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
      <span className="toggle-span" />
      <strong>{label}</strong>
    </label>
  );
};

export default Toggle;
