import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loader, loaderOn] = useState("Log in");

    const [state, setState] = useState({
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
    });

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
            errors: {
                ...prevState.errors,
                [field]: '',
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) return;

        const credentials = {
            email: state.email,
            password: state.password
        }

        loaderOn("Logging in...");

        login(credentials).then((isLoggedIn) => {
            if (isLoggedIn === true) {
                navigate("/dashboard", { replace: true });
                loaderOn("Log in");
            }
        }).catch((res) => {
            loaderOn("Log in");
            toast.error(res.response.data.error, {
                position: 'top-center',
                autoClose: 2500,
                hideProgressBar: true,
            });
        });


    };

    const validateForm = () => {
        const { email, password } = state;
        let errors = {};

        // Check if email is empty
        if (!email.trim()) {
            errors.email = "Email is required";
        } else {
            // Check if email format is valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\w+$/;
            if (!emailRegex.test(email)) {
                errors.email = "Email is not in a valid format";
            }
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        }

        setState(prevState => ({
            ...prevState,
            errors: errors
        }));

        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <ToastContainer />

            <div className='auth-main-container'>
                <div className='mx-auto auth-form-container'>
                    <div className='logo-container mt-3'>
                        <div className='logo-div'>
                            <img
                                src={"/images/resight2.png"}
                                alt={`resight logo`}
                            />
                        </div>
                        <span className='logo-text'>SQUARE</span>
                    </div>

                    <div className='d-flex flex-column align-items-center w-100'>
                        <div className='auth-text-bold'>
                            Welcome back
                        </div>

                        <div className='auth-form-input-container'>
                            <input
                                name='email'
                                type='email'
                                id='email'
                                placeholder='Email'
                                value={state.email}
                                onChange={handleChange}
                                required
                                className="form-control auth-form-input"
                            />
                            {state.errors.email && (
                                <div className="error-message">{state.errors.email}</div>
                            )}
                        </div>

                        <div className='auth-form-input-container'>
                            <input
                                name='password'
                                id='password'
                                type='password'
                                placeholder='Password'
                                value={state.password}
                                onChange={handleChange}
                                required
                                className="form-control  auth-form-input"
                            />
                            {state.errors.password && (
                                <div className="error-message">{state.errors.password}</div>
                            )}
                        </div>

                        <button
                            className='auth-form-btn'
                            onClick={handleSubmit}
                        >
                                {loader === "Logging in..." && <Spinner animation="border" size='sm' />}
                                <h6 className='text-white ms-2'>{loader}</h6>
                        </button>
                        <span className='auth-text-small'>Don't have an account?
                            <strong
                                style={{ color: 'var(--primary-color-dark)' }}
                                className='cursor-pointer'
                                onClick={() => navigate('/auth/register')}>      Sign up</strong>
                        </span>
                        <button
                            className='auth-form-btn-clear'
                            onClick={() => { navigate('/') }}
                        >
                            Continue with Google
                        </button>
                        <button
                            className='auth-form-btn-clear'
                            onClick={() => { navigate('/') }}
                        >
                            Back to homepage
                        </button>
                    </div>

                    <div className='auth-footer-container'>
                        <div
                            className='cursor-pointer auth-text-footer'
                            onClick={() => { }}>Terms of use</div>
                        <div
                            style={{
                                height: '20px',
                                width: '1px',
                                backgroundColor: 'var(--primary-color)',
                                margin: '5px'
                            }}
                        />
                        <div
                            className='cursor-pointer auth-text-footer'
                            onClick={() => { }}>Privacy Policy</div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
