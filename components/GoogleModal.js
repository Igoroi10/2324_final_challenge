import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useContext} from 'react'
import { Button } from 'react-native';
import { Text, ActivityIndicator, StyleSheet } from 'react-native';
import styled from "styled-components/native";
import axios from 'axios'



GoogleSignin.configure({
  webClientId: '278625394290-1u0iag96nrpv7aptlr1h5a7cbkhovlhd.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';


const GoogleModal = () =>{
  const [loading, setLoading] = useState(false)

    async function onGoogleButtonPress() {
      setLoading(true)

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

        console.log("********************token****************************")
        console.log(idTokenResult.token);
        const URL = "http://192.168.1.164:5000/api/users/token"
        try{
          const decodedUser = await axios.post(URL, { idToken: idTokenResult.token });
          console.log(decodedUser.data)
        }
        catch(error){
          console.log("*****************************error")
          console.log(error)
        }
        // const decodedUser = await axios.get(URL);
        
        // console.log(decodedUser)
        // const userMail = decodedUser;
        // console.log("*****************data from server********************")
        // console.log(userMail)
        // Sign-in the user with the credential
        return false;
        //auth().signInWithCredential(googleCredential);
    }

    return (
      <ModalTemplate visible = {loading?false:true }>
          <GoogleButton title="Google Sign-In"  onPress={onGoogleButtonPress} disabled={loading} />
          {loading?<ActivityIndicator size="10" style={[spinnerStyle]}/> : <Text>Sign - In</Text>}
        </ModalTemplate>

      );



}

const spinnerStyle = StyleSheet.create({
  flex: 1,
  justifyContent: 'center',

});

const ModalTemplate = styled.Modal`
position: absolute;
width: 100%;
height: 100%;
`

const  GoogleButton= styled.Button`
width: 42px;
height: 42px;
border-radius: 10px;
margin-left: 16px;
background: #EEEEEE;
margin-top: 40%; 
align-items: center;
justify-content: center;
`


export default GoogleModal

