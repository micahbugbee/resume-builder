import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import '../css/SignIn.css';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();   

    function handleSubmit(event) {
        event.preventDefault();
        if (password === confirm) {
            createUser(username, password).then(() => {
                navigate('/sign-in');
            }).catch(error => {
                console.log(error);
                window.alert('Failed registration: error creating user');
            });
        } else {
            window.alert('Passwords do not match.');
        }
    }

    return (
        <form className='sign-in-form' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <br></br>
            <div className='sign-up-input'>
                <span>Username:  </span>
                <input className='sign-in-input' placeholder="Enter Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <br></br>
            <div className='sign-up-input'>
                <span>Password:  </span>
                <input className='sign-in-input' placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <br></br>
            <div className='sign-up-input'>
                <span>Confirm:  </span>
                <input className='sign-in-input' placeholder="Confirm Password" type="password" name="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
            <br />
            <button className='sign-in-btn'>Sign Up</button>
        </form>
    )
};

export default SignUp;