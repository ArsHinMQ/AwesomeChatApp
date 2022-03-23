import React, { Component } from 'react';

import emailValidator from '../utils/emailValidator';


const SignUpEmail = (props) => {
    return (
        <div id='signUpEmail'>
            <p>Please enter your email</p>
            <div className='my-4'>
                <div className='underline-input-wrapper'>
                    <input onChange={props.emailChanged} type='email' className='underline-input' placeholder=' ' />
                    <span>Email</span>
                </div>
                <small ref={props.hintRef} className='text-danger'></small>
                <div className='float-right mt-5'>
                    <button onClick={props.switchToLogin} className='btn btn-link'>LOGIN</button>
                    <button ref={props.submitBtnRef} onClick={props.nextBtn} type='button' className='btn btn-outline-primary'>NEXT</button>
                </div>
            </div>
        </div>
    )
}

const SignUpCodeVerification = (props) => {
    return (
        <div id='signupCodeVerification'>
            <p>Enter the code that's been sent to {props.email}</p>
            <div className='my-4'>
                <div className='underline-input-wrapper'>
                    <input type='password' className='underline-input' placeholder=' ' required />
                    <span>Code</span>
                </div>
                <small className='text-danger'></small>
                <div className='float-right mt-5'>
                    <button onClick={props.backBtn} className='btn btn-link'>BACK</button>
                    <button type='button' onClick={props.nextBtn} className='btn btn-outline-primary'>VERIFY</button>
                </div>
            </div>
        </div>
    )
}


const SignUpUserDetails = (props) => {
    return (
        <div id='signUpUserDetails'>
            <p>Done! You can create your account now.</p>
            <div className='mb-2 mt-4'>
                <div className='underline-input-wrapper'>
                    <input onChange={props.usernameChanged} required type='text' className='underline-input' placeholder=' ' />
                    <span>Username</span>
                </div>
                <small ref={props.hintRef} className='text-danger'></small>
            </div>
            <div className='my-2'>
                <div className='underline-input-wrapper'>
                    <input ref={props.nameRef} type='text' required className='underline-input' placeholder=' ' />
                    <span>Name</span>
                </div>
            </div>
            <div className='mb-2 mt-4'>
                <div className='underline-input-wrapper'>
                    <input ref={props.passwordRef} required onChange={props.passwordChanged} type='password' className='underline-input' placeholder=' ' />
                    <span>Password</span>
                </div>
            </div>
            <div className='my-2'>
                <div className='underline-input-wrapper'>
                    <input ref={props.confrimPasswordRef} required onChange={props.passwordChanged} type='password' className='underline-input' placeholder=' ' />
                    <span>Confrim Password</span>
                </div>
                <small ref={props.passwordHintRef} className='text-danger'></small>
            </div>
            <div className='float-right mt-5'>
                <button type='button' onClick={props.createBtn} ref={props.submitBtnRef} className='btn btn-outline-primary'>CREATE</button>
            </div>
        </div>
    );
}

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'email': '',
            'stepIndex': 0,
            'username': '',
            'name': '',
            'password': ''
        };

        this.hintRef = React.createRef();
        this.submitBtnRef = React.createRef();
        this.nameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confrimPasswordRef = React.createRef();
        this.passwordHintRef = React.createRef();

        this.emailChanged = this.emailChanged.bind(this);
        this.nextBtn = this.nextBtn.bind(this);
        this.backBtn = this.backBtn.bind(this);
        this.passwordChanged = this.passwordChanged.bind(this);
        this.usernameChanged = this.usernameChanged.bind(this);
        this.createBtn = this.createBtn.bind(this);
        this.switchToLogin = this.switchToLogin.bind(this);

        this.steps = [
            <SignUpEmail switchToLogin={this.switchToLogin} hintRef={this.hintRef} emailChanged={this.emailChanged} submitBtnRef={this.submitBtnRef} nextBtn={this.nextBtn} />,
            <SignUpCodeVerification email={this.state.email} backBtn={this.backBtn} nextBtn={this.nextBtn} />,
            <SignUpUserDetails createBtn={this.createBtn} usernameChanged={this.usernameChanged} hintRef={this.hintRef} passwordChanged={this.passwordChanged} passwordHintRef={this.passwordHintRef} submitBtnRef={this.submitBtnRef} nameRef={this.nameRef} passwordRef={this.passwordRef} confrimPasswordRef={this.confrimPasswordRef} />
        ];

    }

    emailChanged(event) {
        if (event.target.value.trim() === '') {
            this.submitBtnRef.current.setAttribute('disabled', 'disabled');
        }
        else if (emailValidator(event.target.value)) {
            this.hintRef.current.innerHTML = '';
            this.submitBtnRef.current.removeAttribute('disabled');
        } else {
            this.hintRef.current.innerHTML = 'Invalid email';
            this.submitBtnRef.current.setAttribute('disabled', 'disabled');
        }
        this.setState({
            'email': event.target.value
        });
    }

    nextBtn(_event) {
        if (this.state.email.trim() !== '') {
            this.setState({
                'stepIndex': this.state.stepIndex + 1
            });
        }
    }

    backBtn(_event) {
        this.setState({
            'stepIndex': this.state.stepIndex - 1
        });
    }

    usernameChanged(event) {
        const re = new RegExp(/[\s,\W]/)
        if (re.test(event.target.value)) {
            this.submitBtnRef.current.setAttribute('disabled', 'disabled');
            this.hintRef.current.innerHTML = 'Username must only contains letters, digits, underline.'
        } else {
            this.submitBtnRef.current.removeAttribute('disabled');
            this.hintRef.current.innerHTML = '';
        }

        this.setState({
            'username': event.target.value,
            'name': event.target.value
        });
        this.nameRef.current.value = event.target.value
    }

    passwordChanged(_event) {
        if (this.passwordRef.current.value.length < 4) {
            this.submitBtnRef.current.setAttribute('disabled', 'disabled');
            this.passwordHintRef.current.innerHTML = 'Too short.';
        } else if (this.passwordRef.current.value !== this.confrimPasswordRef.current.value) {
            this.submitBtnRef.current.setAttribute('disabled', 'disabled');
            this.passwordHintRef.current.innerHTML = 'Missmatched passwords';
        } else {
            this.submitBtnRef.current.removeAttribute('disabled');
            this.passwordHintRef.current.innerHTML = '';
            this.setState(
                {
                    'password': this.passwordRef.current.value
                }
            )
        }
    }

    createBtn(_event) {
        sessionStorage.setItem('code', this.state.email);
        this.props.setIsLogin(true);
    }

    switchToLogin(_event) {
        this.props.setLoginOrSignUp('login');
    }

    render() {
        return (
            <div id='signUp'>
                <div class='content'>
                    <h1>SIGN UP</h1>
                    {this.steps[this.state.stepIndex]}
                </div>
            </div>
        );
    }
}

export default SignUp;