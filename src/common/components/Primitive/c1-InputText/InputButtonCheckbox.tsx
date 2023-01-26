import React, {ChangeEvent, useState} from 'react'
import css from './InputText.module.css'
import SuperInputText from "./SuperInputText";
import SuperButton from "../c2-Button/SuperButton";
import SuperCheckbox from "../c3-Checkbox/SuperCheckbox";
import SuperPasswordInput from "./PasswordInpit/SuperPasswordInput";

function InputButtonCheckbox() {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const [pswd, setPswd] = useState<string>('')
    const errorPswd = pswd ? '' : 'Password required!'

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
            <h3>Inputs</h3>
            <div className={css.column}>
                {/*input with error*/}
                <SuperInputText
                    placeholder={"text"}
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                    // spanClassName={s.testSpanError}
                />
                <SuperInputText/>
                <hr/>
                <h3>PasswordInput</h3>
                <SuperPasswordInput
                    placeholder={"password"}
                    value={pswd}
                    onChangeText={setPswd}
                    error={errorPswd}
                />
                <hr/>
                <h3>Buttons</h3>
                <SuperButton>default</SuperButton>
                <SuperButton
                    red // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}>
                    delete {/*// название кнопки попадёт в children*/}
                </SuperButton>
                <SuperButton disabled>disabled</SuperButton>
                <hr/>
                <h3>Checkboxes</h3>
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
