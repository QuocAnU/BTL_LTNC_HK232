
import React, { useState } from 'react'
import styles from './login.module.scss'
import classNames from 'classnames/bind'
import logo from './../../assets/images/MyKar2.svg'
import fbicon from './../../assets/images/Facebook_Logo.svg'
import ggicon from './../../assets/images/google_logo.svg'
import xicon from './../../assets/images/X_logo.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [authErrorMessage, setAuthErrorMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const navigate = useNavigate();

    const validateEmail = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError('Email is required');
            setAuthErrorMessage('');
            setErrorMessage(true)

        }
        else if (!regex.test(email)) {
            setEmailError('Invalid email format');
            setAuthErrorMessage('');
            setErrorMessage(true)

        } else {
            setEmailError('');
            setErrorMessage(false)
        }


    }
    const validatePassword = async () => {
        if (!password) {
            setPasswordError('Password is required');
            setAuthErrorMessage('');
            setErrorMessage(true)

        } else {
            setPasswordError('');
            setErrorMessage(false)
        }


    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await validateEmail();
        await validatePassword();
        if (!errorMessage) {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            try {
                const response = await axios.post(
                    "http://localhost:3001/admin/login", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }

                )

                if (response) {
                    console.log(response.data.token)
                    const token = await response.data.token;
                    console.log(token)
                    localStorage.setItem('token', token)
                    navigate("/")

                }

            } catch (error) {
                if (error.response && error.response.status) {
                    // console.log(err);
                    setAuthErrorMessage("Incorrect Email or Password");
                    setEmailError('');
                    setPasswordError('');

                }
            }
        }





    }
    return (
        <div className={cx('background')}>
            <div className={cx('login')}>
                <div className={cx('logo-image')}>
                    <img src={logo} alt='logo' className={cx('image')} />
                </div>
                <div className={cx('login-form')}>
                    <div className={cx('form')}>
                        <div className={cx('login-text')} >Log in</div>
                        {authErrorMessage && <p className={cx('error')}>{authErrorMessage}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className={cx('title')}>
                                <label className={cx('lable-text')} htmlFor="email">Email:</label>

                                <input className={cx('input')}
                                    type="text" id="email" name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={validateEmail}
                                />
                                {emailError &&
                                    <p className={cx('error')}>{emailError}</p>}
                            </div>
                            <div className={cx('title')}>
                                <div className={cx('pass')} >
                                    <label className={cx('lable-text')} htmlFor="password">Password:</label>
                                    <a href="/forgot-password" className={cx('lable-text-1')} >Forgot your password ?</a>
                                </div>
                                <input className={cx('input')}
                                    type="password" id="password" name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={validatePassword}
                                />
                                {passwordError && <p className={cx('error')}>{passwordError}</p>}
                            </div>
                            <button className={cx('button')} type="submit">Continue</button>
                        </form>
                        <p className={cx('lable-text-2')}>Or sign in with</p>
                        <div className={cx('button-icon')}>
                            <button className={cx('icon-button')}>
                                <img className={cx('imageX')} src={xicon} alt="gg" />
                            </button>
                            <button className={cx('icon-button')}>
                                <img src={fbicon} alt="fb" />
                            </button>
                            <button className={cx('icon-button')}>
                                <img src={ggicon} alt="gg" />
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;
