import React, {Component} from 'react'
import Input from '../Input/Input'
import is from 'is_js' // валидация с помощью библиотеки IS_JS

import './loginForm.css'

// function validateEmail(email) {
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

class Auth extends Component {

    state = {
        isFormValid: false,
        formControl:{
            email:{
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            Password:{
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        console.log('login')
    }

    registerHandler = () => {
        console.log('register')
    }

    onSubmitHandler = (e) => {
        e.preventDefault()
    }

    validateControl = (value, validation) => {

        

        if(!validation) {
            return true
        }

        let isValid = true // создали переменную и создаем под нее условия 

        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            //isValid = validateEmail(value) && isValid
            isValid = is.email(value) && isValid
        }

        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid // возвращаем переменну она принимает значение (true, false)
    }

    onChangeHandler = (event, controlName) => {
        
        const formControl = {...this.state.formControl} //делаем копию стейта 
        const control = {...formControl[controlName]} // делаем копию контрола по имени это либо пасс либо маил

        control.value = event.target.value
        control.touched = true// как только мы попали в эту функцию значит пользователь уже потрогал инпут
        control.valid = this.validateControl(control.value, control.validation)

        formControl[controlName] = control// обновляем наш контрол

        let isFormValid = true // создаем локальную переменную

        Object.keys(formControl).forEach(name => { // пробегаемся по всем объектам formControl и спрашиваем валидны ли они
            isFormValid = formControl[name].valid && isFormValid
        })
        
        this.setState({
            formControl,
            isFormValid
        })
    }

    renderInputs = () => {
        return Object.keys(this.state.formControl).map((controlName, index) => {
            const control = this.state.formControl[controlName]
            return(
                <Input
                    key = {controlName + index}
                    type = {control.type}
                    value = {control.value}
                    valid = {control.valid}
                    touched = {control.touched}
                    label = {control.label}
                    shouldValidate = {!!control.validation}
                    errorMessage = {control.errorMessage}
                    onChange = {event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render(){
        return(
            <div className='auth-wrapper'>
                <div>
                    <h1>Авторизация</h1>

                    <form onSubmit = {this.onSubmitHandler} className = 'auth-form'>
                        {this.renderInputs()}
                        <button 
                            onClick = {this.loginHandler}
                            disabled = {!this.state.isFormValid}
                        >LogIn</button>
                        <button 
                            onClick = {this.registerHandler}
                            disabled = {!this.state.isFormValid}
                        >Register</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Auth