import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FirebaseContext } from './store/Context';
import Context from './store/Context'; 
import { app, auth } from './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseContext.Provider value={{ app, auth }}>
        <Context>
            <App />
        </Context>
    </FirebaseContext.Provider>
);
