import React, {useState} from "react";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

import './App.css';
import SignupForm from './components/Signup';
import Login from './components/Login';
import ConfirmSignUp from "./components/ConfirmSignUp";
import Home from "./components/Home";
import Room from "./components/Room"
import CreateRoom from "./components/CreateRoom"; 

function App() {
  const [showConfirmationCodeForm, setShowConfirmationCodeForm] = useState(false)
  const [user, setUser] = useState("")
  const [ableToLogin, setAbleToLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState(null)

  const handleSignup = (user_param) => {
    setShowConfirmationCodeForm(true);
    setUser(user_param)
  };

  const handleRedirectLogin = () => {
    setAbleToLogin(true)
  }

  const handleLoggedIn = () => {
    console.log('Enabled')
    setLoggedIn(true)
  }

  const handleRoom = (room_id) => {
    setRoom(room_id)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/room/:roomId" element={ <Room room={room} loggedIn={loggedIn}/>}/>
          <Route path="/create-room" element={ <CreateRoom loggedIn={loggedIn}/>}/>
          <Route path="/home" element={<Home onRoomSelection={handleRoom} loggedIn={loggedIn} />}/>
          <Route path="/login" element={<Login onLogIn={handleLoggedIn} />}/>
          <Route path="/confirm-signup" element={<ConfirmSignUp username={user} onConfirmation={handleRedirectLogin} />}/>
          <Route path="/" element={<SignupForm onSignup={handleSignup} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
