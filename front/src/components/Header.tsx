import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const ctx = useContext(UserContext);
    const nav = useNavigate();
    return (
        <div>
            <h1>Hello {ctx.user?.email}</h1>
            {ctx.user?.email && <button onClick={() => {
                ctx.setUser(null);
                localStorage.removeItem('email');
                nav('/')
            }}>Logout</button>}
        </div>
    );
};

export default Header;