import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { Button } from 'react-native';


GoogleSignin.configure({
  webClientId: '278625394290-1u0iag96nrpv7aptlr1h5a7cbkhovlhd.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';


const GoogleModal = () =>{

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        const signInWithCredential = await auth().signInWithCredential(googleCredential,);
        console.log("**********************SIGN IN W CREDENTIAL******************")
        console.log(signInWithCredential)

        const idTokenResult = await auth().currentUser.getIdTokenResult();

        const decodedUser = await axios.post('http://192.168.1.164/api/users/', {

          token: idTokenResult.token
        })
        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    return (
        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
      );



}


