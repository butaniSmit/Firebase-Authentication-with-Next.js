import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
  } from "firebase/auth";
import { doc, setDoc,getDocFromCache, getDoc } from "firebase/firestore";
import { auth,db } from "../config/firebase";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});
export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);
  const signUp =async (name: string,email: string, password: string) => {
    const data= await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db,"Users",`${auth.currentUser?.uid}`),{
        name:name,
        id:`${auth.currentUser?.uid}`
    })
    return data;
  };

  const logIn =async (email: string, password: string) => {
    const logindata =await signInWithEmailAndPassword(auth, email, password);
   const res=await fetch(`https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/Users/${auth.currentUser?.uid}`)
   const result = await res.json();
   localStorage.setItem("logindata",result.fields.name.stringValue);
   localStorage.setItem("Token",`${auth.currentUser?.uid}`)
    return logindata
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };
  const ResetPassword =async (email: string, password: string) => {
    const result= await sendPasswordResetEmail(auth,email);
    return result
   };
  return (
    <AuthContext.Provider value={{ user,signUp, logIn, logOut ,ResetPassword}}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
