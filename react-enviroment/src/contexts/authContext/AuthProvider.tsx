// src/contexts/authContext/AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await ensureUniqueUsername(firebaseUser); // Ensure unique username flow
      }
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const ensureUniqueUsername = async (user: User) => {
    // Prompt for a username if one doesn’t already exist
    let username = user.displayName || window.prompt("Please enter a unique username:");

    while (await isUsernameTaken(username)) {
      username = window.prompt("Username already taken. Please enter a different username:");
    }

    await createUserDocWithUsername(user, username);
  };

  const isUsernameTaken = async (username: string | null): Promise<boolean> => {
    if (!username) return true; // Prevent empty username
    const usernameDocRef = doc(db, 'usernames', username);
    const usernameDoc = await getDoc(usernameDocRef);
    return usernameDoc.exists();
  };

  const createUserDocWithUsername = async (user: User, username: string) => {
    const usersDocRef = doc(db, 'users', user.uid);
    const usernameDocRef = doc(db, 'usernames', username);

    const userDoc = await getDoc(usersDocRef);

    if (!userDoc.exists()) {
      const batch = writeBatch(db);
      batch.set(usersDocRef, {
        username,
        profilePicture: '/assets/default-avatar.png', // URL to default profile picture in assets
        createdAt: serverTimestamp(),
        favorites: [],
        wishlists: {},
      });
      batch.set(usernameDocRef, { userId: user.uid }); // Map username to userId
      await batch.commit();
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
