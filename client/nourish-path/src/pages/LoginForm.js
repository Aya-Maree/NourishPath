import React, { useState } from 'react';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add logic to handle login here
        console.log(email, password);
    }

    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
                <label className="form-label" htmlFor="loginEmail">Email:</label>
                <input id="loginEmail" className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label className="form-label" htmlFor="loginPassword">Password:</label>
                <input id="loginPassword" className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
