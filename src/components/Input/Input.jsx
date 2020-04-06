import React from 'react'
import './input.css'


function isInvalid ({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = (props) => {

    const inputType = props.type || 'text'
    const cls = []
    const htmlFor = `${inputType}-${Math.random()}`

    if(isInvalid(props)) {
        cls.push('invalid')
    }

    return(
        <div className = {`wrapper-input ${cls.join(' ')}`}>
            <label htmlFor = {htmlFor}>{props.label}</label>
            <input 
                type = {inputType}
                id = {htmlFor}
                value = {props.value}
                onChange = {props.onChange}
                />

            {isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значениез'}</span> : null}
             
        </div>
    )
}
export default Input