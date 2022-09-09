import React, {useState} from 'react'
import SuperRadio from "../c6-Radio/SuperRadio";
import SuperSelect from "./SuperSelect";

const arr = ['x', 'y', 'z']

function SelectRadio() {
    const [value, onChangeOption] = useState(arr[1])

    return (
        <div>
            <hr/>
            <h3>Select and Radio</h3>
            {/*should work (должно работать)*/}
            <div>
                <SuperSelect
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
            </div>
            <div>
                <SuperRadio
                    name={'radio'}
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
            </div>
            <hr/>
        </div>
    )
}

export default SelectRadio
