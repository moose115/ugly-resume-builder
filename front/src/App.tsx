import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { UserContext } from './context/UserContext';
import { User } from './types/User';
import Resume from './pages/Resume';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const email = localStorage.getItem('email');
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
      setUser(data);
      console.log(email, data);


      if (email && data) {
        nav('/resume');
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="resume" element={<Resume />} />
            </Route>
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
