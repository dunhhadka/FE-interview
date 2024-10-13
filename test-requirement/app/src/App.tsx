import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import HomePage from './components/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path='/login' element={<LoginForm/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
