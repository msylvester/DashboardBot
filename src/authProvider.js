import { AUTH_LOGIN , AUTH_LOGOUT} from 'react-admin';
// import firebase from "firebase";
import Base from "./Base.js"


export default (type, params) => {
    if (type === AUTH_LOGIN) {




          const { username, password } = params;

          //   Base.instantiate()

          return Base.getInstance().auth().signInWithEmailAndPassword(username, password)

                .then((response)=>{
                  console.log('🇺🇸 🤞🏻')
                  console.log('success')
                  console.log(`hyere is the response ${response}`)
                  console.log(response)
                  console.log(response['user']['email'])
                  const userEmail = response['user']['email']
                  console.log(`the userEmail is ${userEmail}`)
                  let atEmail = userEmail.substring(userEmail.indexOf("@")+1, userEmail.length);
                  console.log(`the atMail is ${atEmail.substring(0, atEmail.indexOf("."))}`)

                  localStorage.setItem('token', atEmail.substring(0, atEmail.indexOf(".")));
                })


                .catch((error) => {
                  // Handle Errors here.
                  console.log(`😍`)
                  console.log(error)

                  throw new Error(error.message)
                  // ...
                });

}

       if (type === AUTH_LOGOUT) {

         // const base = firebase
         //
         // const { username, password } = params;
         //
         // base.initializeApp({
         //   apiKey: "AIzaSyANdkPvOsVgDPwXeP0HcN3Bp1fsBQwmCXM",
         //   authDomain: "zenith-botcopy.firebaseapp.com",
         //   databaseURL: "https://zenith-botcopy.firebaseio.com",
         //   projectId: "zenith-botcopy",
         //   storageBucket:"zenith-botcopy.appspot.com",
         //   messagingSenderId: "284635359967"
         // });
      //   Base.instantiate()
         Base.getInstance().auth().signOut().then(() => {
            // Sign-out successful.
            console.log(`syccess signign out`)
          }).catch(function(error) {
            // An error happened.
                console.log(`syccess signign out`)
          });

         localStorage.removeItem('token');
         return Promise.resolve();
     }
       //      });

    return Promise.resolve();
}


// // in src/authProvider.js
// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
//
// export default (type, params) => {
//     // called when the user attempts to log in
//     if (type === AUTH_LOGIN) {
//         const { username } = params;
//         localStorage.setItem('username', username);
//         // accept all username/password combinations
//         return Promise.resolve();
//     }
//     // called when the user clicks on the logout button
//     if (type === AUTH_LOGOUT) {
//         localStorage.removeItem('username');
//         return Promise.resolve();
//     }
//     // called when the API returns an error
//     if (type === AUTH_ERROR) {
//         const { status } = params;
//         if (status === 401 || status === 403) {
//             localStorage.removeItem('username');
//             return Promise.reject();
//         }
//         return Promise.resolve();
//     }
//     // called when the user navigates to a new location
//     if (type === AUTH_CHECK) {
//         return localStorage.getItem('username')
//             ? Promise.resolve()
//             : Promise.reject();
//     }
//     return Promise.reject('Unknown method');
// };
