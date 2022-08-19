import React, {ChangeEvent, useState} from 'react'

import css from './InputText.module.css'
import SuperInputText from "./SuperInputText";
import SuperButton from "../c2-Button/SuperButton";
import SuperCheckbox from "../c3-Checkbox/SuperCheckbox";


function InputButtonCheckbox() {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text) // если нет ошибки показать текст
        }
    }

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <hr/>
            <h3>homeworks 4</h3>
            <div className={css.column}>
                {/*input with error*/}
                <SuperInputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    // spanClassName={s.testSpanError}
                />
                <SuperInputText/>
                <SuperButton>default</SuperButton>
                <SuperButton
                    red // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}>
                    delete {/*// название кнопки попадёт в children*/}
                </SuperButton>
                <SuperButton disabled>disabled</SuperButton>
                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}>
                    some text {/*// этот текст попадёт в children*/}
                </SuperCheckbox>
                {/*// onChange тоже должен работать*/}
                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>

        </div>
    )
}

export default InputButtonCheckbox
