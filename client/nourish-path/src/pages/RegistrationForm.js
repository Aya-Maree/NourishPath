import React, { useState } from 'react';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 409) { // Assuming 409 status code for conflict
                    alert('A user with this email already exists.');
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            } else {
                // Handle success here
                setName('');
                setEmail('');
                setPassword('');
                alert('User registered successfully');
            }

        } catch (error) {
            console.error('Error registering user:', error);
            alert('Failed to register. Please try again.');
        }
    }

    return (
        <form id="registrationForm" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
