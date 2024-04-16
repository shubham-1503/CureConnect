import { createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    deleteUser } from "firebase/auth";
import { auth } from "./firebase"; 

export const docreateUserWithEmailAndPassword = async (email,password) => {
    return createUserWithEmailAndPassword(auth,email,password);
};

// user Sign in using fireabase
export const doSiginIn = async (email,password) => {
    return signInWithEmailAndPassword(auth,email,password);
};

// send a reset password email to user
export const sendMail = async (email) => {
    try{

        await sendPasswordResetEmail(auth,email);
    }catch(Error){
        throw Error;
    }
};

export const validateEmail = async (email) =>{

    try {
        const result = await fetchSignInMethodsForEmail(auth,email);
        return result;
    } catch (error) {
    }
};

export const deleteUserAccount = async () =>{
    
    const user = auth.currentUser;

        try {
            const result = await deleteUser(user);
            return result;
        } catch (error) {
        }
};


