import React, { useEffect, useState } from 'react';
import { formatTime ,  mergeToSeconds} from '../common/utils';
function TimeInput(props) {
    const {value , onChange} = props;
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');
    useEffect(()=>{
        const str = formatTime(value);
        const arr = str.split(':');
        setHours(arr[0]);
        setMinutes(arr[1]);
        setSeconds(arr[2]);
    },[])
    const handleChange = (event) => {
        const { name, value } = event.target;

        // 验证输入是否为数字，以及数字的范围
        if (/^\d*$/.test(value) && Number(value) >= 0 && Number(value) < 60) {
            switch (name) {
                case 'hours':{
                    setHours(value);
                    const time = mergeToSeconds(value , minutes , seconds);
                    onChange({
                        target: {
                            value:time
                    }})
                    break;
                }

                case 'minutes':{
                    setMinutes(value);
                    const time = mergeToSeconds(hours , value , seconds);
                    onChange({
                        target: {
                            value:time
                    }})
                    break;
                }

                case 'seconds':{
                    setSeconds(value);
                    const time = mergeToSeconds(hours , minutes , value);
                    onChange({
                        target: {
                            value:time
                    }})
                    break;
                }
                default:
                    break;
            }
        }

    };


    return (
        <div style={{display:'inline-block'}}>
            <input
                type="text"
                name="hours"
                value={hours}
                placeholder="HH"
                onChange={handleChange}
                maxLength="2"
                style={{ width: '30px', marginRight: '5px' }}
            />
            <span>:</span>
            <input
                type="text"
                name="minutes"
                value={minutes}
                placeholder="MM"
                onChange={handleChange}
                maxLength="2"
                style={{ width: '30px', marginRight: '5px', marginLeft: '5px' }}
            />
            <span>:</span>
            <input
                type="text"
                name="seconds"
                value={seconds}
                placeholder="SS"
                onChange={handleChange}
                maxLength="2"
                style={{ width: '30px', marginLeft: '5px' }}
            />
        </div>
    );
}

export default TimeInput;