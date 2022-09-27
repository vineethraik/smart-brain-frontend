import React, { Component } from "react";
import { backend } from "../App/App";
import './Register.css'

const initialState = {
    nameField: '',
    emailField: '',
    passwordField: '',
    error: {
        active: false,
        value: 'Error',
        op1: 0.2,
        op2: 1,
    }
}

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    changeErrorState = (active, value = '') => {
        this.setState({
            error: {
                active: active,
                value: value,
                op1: 0.2,
                op2: 1
            }
        })
    }

    onFieldChange = (target) => (event) => {
        switch (target) {
            case 'name':
                this.setState({ nameField: event.target.value });
                break;
            case 'email':
                this.setState({ emailField: event.target.value });
                break;
            case 'password':
                this.setState({ passwordField: event.target.value });
                break;

            default:
                break;
        }
    }

    onClickedRegister = () => {
        const { nameField, emailField, passwordField } = this.state;
        const {changeRoute}=this.props;
        this.changeErrorState(true, 'Registering')
        if (nameField !== '') {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailField)) {
                if (passwordField.length >= 8) {
                    fetch(`${backend.mainUrl}/register`, {
                        method: 'POST',
                        credentials: 'include',
                        body: JSON.stringify({
                            name: nameField,
                            email: emailField,
                            password: passwordField
                        }),
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(res => {
                            this.changeErrorState(false)
                            console.log(res);
                            if (res.status === 'success') {
                                alert("Check your email for verification link");
                                changeRoute('signin');
                            } else {
                                switch (res.code) {
                                    case '00':
                                        alert('Email already Registered, Register with different email or signin');
                                        break;
                                    case '01':
                                        alert('Unknown error occurred,Please try again later');
                                        break;

                                    default:
                                }
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        })

                } else {
                    this.changeErrorState(false)
                    alert('password should be of 8 or more characters');
                }
            } else {
                this.changeErrorState(false)
                alert('Enter a Valid email address');
            }
        } else {
            this.changeErrorState(false)
            alert('name can not be empty');
        }

    }

    render() {
        return (
            <div className="register main">
                <div className="register form" style={(this.state.error.active) ? { opacity: this.state.error.op1 } : { opacity: 1 }}>
                    <p className="register title">Register</p>
                    <label className="register element" htmlFor="registerEmail">Name</label>
                    <input onChange={this.onFieldChange('name')} className="register element" type="name" name="" id="registerName" />
                    <label className="register element" htmlFor="registerEmail">Email</label>
                    <input onChange={this.onFieldChange('email')} className="register element" type="email" name="" id="registerEmail" />
                    <label className="register element" htmlFor="registerPassword">Password</label>
                    <input onChange={this.onFieldChange('password')} className="register element" type="password" name="" id="registerPassword" />
                    <p onClick={this.onClickedRegister} className="register button">Register</p>
                </div>
                {(this.state.error.active) ?
                    <div className="register error" >
                        <p>{this.state.error.value}</p>
                    </div>
                    : <></>
                }
            </div>
        )
    }
}