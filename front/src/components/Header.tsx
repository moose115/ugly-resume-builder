import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import LoginForm from './LoginForm';

const Header = ({className}: {className?: string}) => {
    const ctx = useContext(UserContext);
    const nav = useNavigate();
    return (
        <div className={className}>
            <h1>URB</h1>
            {ctx.user?.email && <h4>Logged in as {ctx.user?.email}</h4>}
            {!ctx.user?.email && <LoginForm />}
            {ctx.user?.email && <button onClick={() => {
                ctx.setUser(null);
                localStorage.removeItem('email');
                nav('/')
            }}>Logout</button>}
        </div>
    );
};

export default Header;