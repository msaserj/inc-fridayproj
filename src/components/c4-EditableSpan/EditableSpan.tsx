import React, {useState} from 'react'
import {restoreState, saveState} from './localStorage/localStorage'
import SuperEditableSpan from "./SuperEditableSpan";
import SuperButton from "../c2-Button/SuperButton";

function EditableSpan() {
    const [value, setValue] = useState<string>('')

    const save = () => {
        saveState<string>('editable-span-value', value)
    }
    const restore = () => {
        setValue(restoreState<string>('editable-span-value', ''))
    }
    return (
        <div>
            <hr/>
           <h3>Editable Span</h3>

            {/*should work (должно работать)*/}
            <div>
                <SuperEditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{children: value ? undefined : 'enter text...'}}
                />
            </div>
            <SuperButton onClick={save}>save</SuperButton>
            <SuperButton onClick={restore}>restore</SuperButton>

        </div>
    )
}

export default EditableSpan
