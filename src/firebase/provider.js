import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async ()=> {

    try{
        const result = await signInWithPopup( FirebaseAuth, googleProvider);
  
        const { displayName, email, photoURL, uid } = result.user

        await updateProfile(FirebaseAuth.currentUser, { displayName});
        
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    }catch(error){

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWhitEmailPassword = async ({ email, password, displayName})=>{

    try{

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        

        return{
            ok:true,
            uid, photoURL, email, displayName
        }

    }catch(error){

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}
export const loginWhithEmailPassword = async ( {email, password })=> {

    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }

    }catch(error){
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }

}

export const logoutFirebase= async()=>{

    return await FirebaseAuth.signOut();
    
}