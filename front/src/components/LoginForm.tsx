import React, {useContext} from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const userContext = useContext(UserContext)
    const nav = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('email', email);

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });

        const data = await response.json();
        if(data) {
            localStorage.setItem('email', data.email);
            userContext.setUser(data);
            console.log('about to redirect');
            
            nav('/resume');
        }
    };
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type={'email'} id={'email'} value={email} onChange={(event) => setEmail(event.target.value)} />
            
                <button type={'submit'}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;