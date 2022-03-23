import React, { useState, useEffect } from 'react';

import Inbox from './components/inbox';
import Chat from './components/chat';
import Settings from './components/settings';
import UserDetails from './components/userDetails';
import SignUp from './components/signup';
import Login from './components/login';

import isColorTooLight from './utils/checkColor';


const App = () => {
    const settingsRef = React.createRef();
    const userDetailsRef = React.createRef();
    const chatRef = React.createRef();
    const blurRef = React.createRef();

    const [themeColor, setThemeColor] = useState(localStorage.getItem('theme-color') || '');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || '');
    const [isLogin, setIsLogin] = useState((sessionStorage.getItem('code') === null || !sessionStorage.getItem('code')) ? false : true);
    const [loginOrSignUp, setLoginOrSignUp] = useState((isLogin) ? 'login' : 'signup');

    useEffect(() => {
        localStorage.setItem("theme-color", themeColor || '');
        localStorage.setItem("theme", theme || '');

        if (themeColor.trim() !== '') {
            document.documentElement.style.setProperty('--theme-color', themeColor);
        }

        if (theme.trim() !== '') {
            if (isColorTooLight(themeColor) && theme !== 'light-theme') {
                document.documentElement.style.setProperty('--font-secondary', '#000000');
            } else {
                document.documentElement.style.setProperty('--font-secondary', '#ffffff');
            }
        }

    }, [themeColor, theme]);

    if (JSON.parse(isLogin)) {
        return (
            <main className={theme}>
                <Chat chatRef={chatRef} blurRef={blurRef} userDetailsRef={userDetailsRef} />
                <Inbox chatRef={chatRef} settingsRef={settingsRef} blurRef={blurRef} />
                <Settings setIsLogin={setIsLogin} settingsRef={settingsRef} blurRef={blurRef} setTheme={setTheme} setThemeColor={setThemeColor} />
                <UserDetails blurRef={blurRef} userDetailsRef={userDetailsRef} />
                <div id='blur' ref={blurRef}></div>
            </main>
        )
    } else {
        if (loginOrSignUp === 'signup') {
            return (
                <main className={theme}>
                    <SignUp setIsLogin={setIsLogin} setLoginOrSignUp={setLoginOrSignUp} />
                </main>
            )
        } else {
            return (
                <main className={theme}>
                    <Login setIsLogin={setIsLogin} setLoginOrSignUp={setLoginOrSignUp}/>
                </main>
            )
        }
    }
}

export default App;