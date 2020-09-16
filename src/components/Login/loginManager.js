import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


 export  const initializeLogInFramework= ()=>{
    if(firebase.apps.length===0){
        firebase.initializeApp(firebaseConfig);
    }
}


 export const handleGoogleSignIn=()=>{
         // Google provider.
const googleProvider = new firebase.auth.GoogleAuthProvider();
  
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName,photoURL,email}=res.user;
      const signInUser={
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,
        success:true
    
      }
    
      return signInUser;
    
      console.log(displayName,photoURL,email);
    })
    
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
    }
    
 
  export const handleFbSignIn=()=>{
    // Facebook provider..
  
   const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success=true;
      return user;
    //   console.log('after fb login',user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorCode,errorMessage,email ,credential)
      // ...
    });
  }

  
 export const handleSignOut=()=>{
    return firebase.auth().signOut()
    .then(rse=>{
     const signOutUser={
       isSignedIn:false,
       name:'',
       email:'',
       password:'',
       photo:'',
       error:'',
       success:'',
       // newUser:false
     }
   return signOutUser;
   
    })
    .catch(err=>{
   
    })
   }

   export const createUserWithEmailAndPassword = (name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(res=>{
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      
      updateUserName(name);
      return newUserInfo;



    })
    
     .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // // ...
      // console.log(errorCode,errorMessage)

      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
      
    });
   
   }
  export  const signInWithEmailAndPassword =(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>{
      const newUserInfo=res.user;
      newUserInfo.error='';
      newUserInfo.success=true;
      return newUserInfo;
    })
     .catch(function(error) {
      const newUserInfo={};
      newUserInfo.error=error.message;
      newUserInfo.success=false;
      return newUserInfo;
    });
  
  }

  const updateUserName= name=>{
    var user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName: name,
    
  }).then(function() {
    // Update successful.
    console.log('user name Update successful.')
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
  }
  
  
    
    