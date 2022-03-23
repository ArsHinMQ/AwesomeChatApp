import React, { Component } from 'react';

import { Dropdown } from 'react-bootstrap'

import thumbnail from '../images/thumbnail.jpg';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            theme_color: localStorage.getItem('theme-color')
        }

        this.editProfileRef = React.createRef();
        this.changePasswordRef = React.createRef();
        this.newThumbnailRef = React.createRef();
        this.newPasswordRef = React.createRef();
        this.confrimPasswordRef = React.createRef();
        this.hintRef = React.createRef();
        this.changePwdSubmitBtn = React.createRef();

        this.closeBtnClick = this.closeBtnClick.bind(this);
        this.themeColorChange = this.themeColorChange.bind(this);
        this.themeChange = this.themeChange.bind(this);
        this.toggleEditProfile = this.toggleEditProfile.bind(this);
        this.toggleChangePassword = this.toggleChangePassword.bind(this);
        this.newThumbanilBtnClick = this.newThumbanilBtnClick.bind(this);
        this.backBtn = this.backBtn.bind(this);
        this.newPassword = this.newPassword.bind(this);
        this.logout = this.logout.bind(this);
    }

    newThumbanilBtnClick(_event) {
        this.newThumbnailRef.current.click();
    }

    closeBtnClick(_event) {
        this.props.blurRef.current.classList.remove('on');
        this.props.settingsRef.current.classList.remove('open');
        this.editProfileRef.current.classList.remove('show');
        this.changePasswordRef.current.classList.remove('show');
    }

    themeColorChange(event) {
        this.props.setThemeColor(event.target.value);
        this.setState({
            theme_color: event.target.value
        });
    }

    themeChange(event) {
        this.props.setTheme(event.target.value);
    }

    backBtn() {
        this.editProfileRef.current.classList.remove('show');
        this.changePasswordRef.current.classList.remove('show');
    }

    toggleEditProfile(_event) {
        this.editProfileRef.current.classList.toggle('show');
    }

    toggleChangePassword(_event) {
        this.changePasswordRef.current.classList.toggle('show');
    }

    newPassword(_event) {
        if (this.newPasswordRef.current.value.length < 4) {
            this.hintRef.current.innerHTML = 'Too short';
            this.changePwdSubmitBtn.current.setAttribute('disabled', 'disabled');
        } else if (this.newPasswordRef.current.value !== this.confrimPasswordRef.current.value) {
            this.hintRef.current.innerHTML = 'Mismatched password';
            this.changePwdSubmitBtn.current.setAttribute('disabled', 'disabled');
        } else {
            this.hintRef.current.innerHTML = '';
            this.changePwdSubmitBtn.current.removeAttribute('disabled');
        }
    }

    logout(_event) {
        sessionStorage.removeItem('code');
        this.props.setIsLogin(false);
    }

    render() {
        return (
            <div id='settings' ref={this.props.settingsRef}>
                <div id='editProfile' ref={this.editProfileRef}>
                    <header className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center'>
                            <button onClick={this.backBtn} className='btn btn-link ml-0 px-0 mr-3'><i className='fa fa-arrow-left'></i></button>
                            <h3>Edit</h3>
                        </div>
                        <div className='d-flex align-items-center'>
                            <button onClick={this.closeBtnClick} className='btn btn-link pr-0'>
                                <i className='fa fa-close'></i>
                            </button>
                        </div>
                    </header>
                    <div className='content'>
                        <div className='d-flex align-items-center flex-column'>
                            <img className='thumbnail large' src={thumbnail} alt='' />
                            <button onClick={this.newThumbanilBtnClick} className='btn btn-outline-primary my-3'>Change Profile Image</button>
                        </div>
                        <div>
                            <div className='underline-input-wrapper my-4'>
                                <input type='text' className='underline-input' placeholder='' />
                                <span>Name</span>
                            </div>
                            <div className='underline-input-wrapper my-4'>
                                <input type='text' className='underline-input' placeholder='' />
                                <span>Username</span>
                            </div>
                            <div className='underline-input-wrapper my-4'>
                                <textarea type='text' className='underline-input' placeholder='' rows='1'></textarea>
                                <span>Bio</span>
                            </div>
                            <div className='float-right'>
                                <button onClick={this.toggleEditProfile} className='btn btn-link btn-sm mr-2'>CANCEL</button>
                                <button className='btn btn-outline-primary btn-sm'>EDIT</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='changePassword' ref={this.changePasswordRef}>
                    <header className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex align-items-center'>
                            <button onClick={this.backBtn} className='btn btn-link ml-0 px-0 mr-3'><i className='fa fa-arrow-left'></i></button>
                            <h3>Password</h3>
                        </div>
                        <div className='d-flex align-items-center'>
                            <button onClick={this.closeBtnClick} className='btn btn-link pr-0'>
                                <i className='fa fa-close'></i>
                            </button>
                        </div>
                    </header>
                    <div className='content'>
                        <div>
                            <div className='underline-input-wrapper my-4'>
                                <input type='password' name='current_pass' className='underline-input' placeholder=' ' required />
                                <span>Current Password</span>
                            </div>
                            <div className='underline-input-wrapper my-4'>
                                <input onChange={this.newPassword} ref={this.newPasswordRef} type='password' name='new_pass' className='underline-input' placeholder=' ' required />
                                <span>New Password</span>
                            </div>
                            <div className='underline-input-wrapper my-4'>
                                <input onChange={this.newPassword} ref={this.confrimPasswordRef} type='password' className='underline-input' placeholder=' ' required />
                                <span>Confrim Password</span>
                            </div>
                            <small className='text-danger' ref={this.hintRef}></small>
                            <div className='float-right'>
                                <button type='button' onClick={this.toggleChangePassword} className='btn btn-link btn-sm mr-2'>CANCEL</button>
                                <button type='submit' ref={this.changePwdSubmitBtn} className='btn btn-outline-primary btn-sm'>CHANGE</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='settingsInfo'>
                    <header id='settingsHeader' className='d-flex justify-content-between align-items-center'>
                        <h3>
                            Settings
                        </h3>
                        <div className='d-flex align-items-center'>
                            <Dropdown>
                                <Dropdown.Toggle variant='link' id='dropdown-basic'>
                                    <i className='fa fa-ellipsis-v'></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu aria-expanded='false'>
                                    <Dropdown.Item href='#edit' onClick={this.toggleEditProfile}><i className='fa fa-user mr-2'></i>Edit Profile</Dropdown.Item>
                                    <Dropdown.Item href='#password' onClick={this.toggleChangePassword}><i className='fa fa-lock mr-2'></i>Change Password</Dropdown.Item>
                                    <Dropdown.Item href='logout' onClick={this.logout} className='text-danger'><i className='fa fa-sign-out mr-2'></i>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <button onClick={this.closeBtnClick} className='btn btn-link pr-0'>
                                <i className='fa fa-close'></i>
                            </button>
                        </div>
                    </header>
                    <div className='content'>
                        <div id='myGeneralInfo' className='d-flex align-items-center'>
                            <div>
                                <div className='file-wrapper'>
                                    <img className='thumbnail large' src={thumbnail} alt='' />
                                    <button onClick={this.newThumbanilBtnClick}><i className='fa fa-upload'></i></button>
                                    <input type='file' ref={this.newThumbnailRef} accept='images/*  ' />
                                </div>
                            </div>
                            <div className='ml-3'>
                                <h2>Header</h2>
                                <a href='#'>@username</a>
                            </div>
                        </div>
                        <div id='myAccountInfo'>
                            <div>
                                <h6>Email</h6>
                                <p>example@email.com</p>
                            </div>
                            <div>
                                <h6>Bio</h6>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias voluptate et praesentium maxime minima illum qui molestiae iure maiores culpa quidem, inventore harum nam numquam delectus!</p>
                            </div>
                        </div>
                        <div id='themeSetting' className='pt-3'>
                            <h6>Theme</h6>
                            <div className='d-flex align-items-center justify-content-around mt-3'>
                                <button onClick={this.themeChange} id='mixedTheme' value='' className='btn btn-link'>Mixed</button>
                                <button onClick={this.themeChange} id='darkTheme' value='dark-theme' className='btn btn-link'>Dark</button>
                                <button onClick={this.themeChange} id='lightTheme' value='light-theme' className='btn btn-link'>Light</button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <input onChange={this.themeColorChange} id='themeColor' type='color' value={this.state.theme_color} />
                                <label htmlFor='themeColor' className='ml-2'>Choose theme color</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;