import { useState } from 'react';
import {WiDust} from 'react-icons/wi'
type Props = {
    label: any;
    toggled : boolean;
    onClick: any;
}

const Toggle:React.FC<Props> = ({ label, toggled, onClick }) => {
    const [isToggled, toggle] = useState(toggled);

    const callback = () => {
        toggle(!isToggled);
        onClick(!isToggled);
    }

    return (
        <label className='m-2'>
            <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
            <span className='graintoggle-span' />
            <strong>{label}</strong>
        </label>
    )
}

export default Toggle