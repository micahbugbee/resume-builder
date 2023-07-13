import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/SignIn.css';
import UserContext from './contexts/UserContext';

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
        });
    }

    return (
            <form className='sign-in-form' onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <Link to={`/sign-up`} className='sign-up-btn'>Sign Up</Link>
                <br />
                <div className='sign-up-input'>
                    <span>Username:  </span>
                    <input className='sign-in-input' placeholder="Enter Username" type="text" name="username" onChange={e => setUsername(e.target.value)} />
                </div>
                <br></br>
                <div className='sign-up-input'>
                    <span>Password:  </span>
                    <input className='sign-in-input' placeholder="Enter Password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <br />
                <button className='sign-in-btn'>
                    Sign In
                </button>
            </form>
    );
};

export default SignIn;