import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';
import styles from './Inputs.module.css';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const userContext = useContext(UserContext)
    const nav = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(!email) return alert('Please enter an email address.');

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
        if (data) {
            localStorage.setItem('email', data.email);
            userContext.setUser(data);
            console.log('about to redirect');

            nav('/resume');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles['input-container']}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type={'email'} id={'email'} className={styles.input} value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <button type={'submit'} className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default LoginForm;