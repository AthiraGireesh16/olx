import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from '../../store/Context';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Modular import
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore modular import

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const { auth, app } = useContext(FirebaseContext); // Access auth and app object from context
  const db = getFirestore(app); // Get Firestore instance using the app context

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!username || !email || !phone || !password) {
      setError('All fields are required!');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address!');
      return;
    }

    if (phone.length < 10) {
      setError('Phone number must be at least 10 digits!');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    setError(''); // Reset error message

    try {
      // Create user with email and password
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with username
      await updateProfile(result.user, { displayName: username });
      
      // Add the user to Firestore
      await addDoc(collection(db, 'users'), {
        id: result.user.uid,
        username: username,
        phone: phone,
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.message); // Set error message from Firebase
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>} {/* Display error messages */}
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
