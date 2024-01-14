import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { styled, alpha } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));

function HomePage() {
    const [isLoginForm, setIsLoginForm] = useState(false);

    const handleToggle = (event) => {
        setIsLoginForm(event.target.checked);
    };

    return (
        <div className="container">
            <h1>NourishPath</h1>
            <div id="toggleSwitchContainer">
                <label id="toggleSwitchLabel">
                    {isLoginForm ? 'Login' : 'Register'}
                    <GreenSwitch
                        checked={isLoginForm}
                        onChange={handleToggle}
                        inputProps={{ 'aria-label': 'login-register-switch' }}
                    />
                </label>
            </div>
          {isLoginForm ? <LoginForm /> : <RegistrationForm />}
        </div>
    );
}

export default HomePage;
