import { createContext, useState } from 'react';
import { storage, auth, db } from '../firebase/config'; // Import Firebase services

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({ children }) {
    const [user, setUser] = useState(null);

    return (
        <FirebaseContext.Provider value={{ storage, auth, db }}>
            <AuthContext.Provider value={{ user, setUser }}>
                {children}
            </AuthContext.Provider>
        </FirebaseContext.Provider>
    );
}
