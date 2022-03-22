import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);

        this.passwordRef = React.createRef();
        this.emailOrUsernameRef = React.createRef();

        this.switchToSignUp = this.switchToSignUp.bind(this);
        this.login = this.login.bind(this);
    }

    login(_event) {
        if(this.emailOrUsernameRef.current.value.length !== 0 && this.passwordRef.current.value.length !== 0) {
            sessionStorage.setItem('code', this.emailOrUsernameRef.current.value)
            this.props.setIsLogin(true);
        }
    }
    
    switchToSignUp(_event) {
        this.props.setLoginOrSignUp('signup');
    }

    render() {
        return (
            <div id='login'>
                <div class='content'>
                    <h1>LOGIN</h1>
                    <p>Welcome back! Please enter your login information.</p>
                    <div>
                        <div className='mt-4 mb-2'>
                            <div className='underline-input-wrapper'>
                                <input ref={this.emailOrUsernameRef} type='text' className='underline-input' placeholder=' ' />
                                <span>Email / Username</span>
                            </div>
                        </div>
                        <div className='mt-4 mb-2'>
                            <div className='underline-input-wrapper'>
                                <input ref={this.passwordRef} type='password' className='underline-input' placeholder=' ' />
                                <span>Password</span>
                            </div>
                        </div>
                        <div className='float-right mt-5'>
                            <button onClick={this.switchToSignUp} className='btn btn-link'>SIGN UP</button>
                            <button type='button' onClick={this.login} className='btn btn-outline-primary'>LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;