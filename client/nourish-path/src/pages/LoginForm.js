import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'An error occurred');
            }

            // Save the user's name and email in local storage
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', email);

            console.log('Logged in successfully');

            // Programmatic navigation to dashboard
            navigate('/dashboard');
        
        } catch (error) {
            console.error('Login error:', error.message);
            alert('Failed to log in. Please check your credentials and try again.');
        }
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
