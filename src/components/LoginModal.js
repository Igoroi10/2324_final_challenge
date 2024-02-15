import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ProfileAcolyte from '../../screens/ProfileAcolyte';
import ProfileMortimer from '../../screens/ProfileMortimer';
import ProfileRider from '../../screens/ProfileKnight';
import ProfileVillano from '../../screens/ProfileVillano';
import styled from 'styled-components/native';
import { getUserData } from '../helpers/asyncStorageUser';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Context } from "../helpers/Context";

GoogleSignin.configure({
  webClientId: '278625394290-1u0iag96nrpv7aptlr1h5a7cbkhovlhd.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';

const LoginModal = ({}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [globalState, setGlobalState] = useState();
  const [isLoading, setLoading] = useState(false);
  const [userGlobalState, setUserGlobalState] = useState(); 
  

  useEffect(()=>{

    getAllUsersFromDataBase()
    
  },[]);

  useEffect(() => {
    if (userGlobalState) {
      handleSuccessfulLogin();
      setLoading(false);
    }
  }, [userGlobalState]);
  

  const goBack = () => {
    setShowProfile(false);
  };

  const handleSuccessfulLogin = () => {
    setShowProfile(true);
  };

  const getAllUsersFromDataBase = async () => {
    try {
        const urlUsers = 'http://192.168.1.163:5001/api/users/';
        // const urlUsers = "http://192.168.1.166:5001/api/users/"
        // Realizar la solicitud al servidor con el token en el encabezado de autorización
        //const responseUsers = await axiosInstance.get(urlUsers);
        const responseUsers = await axios.get(urlUsers);
        console.log('USUARIOS RECIBIDOS', responseUsers.data);
        // Seleccionamos todos los usuarios y los seteamos 
        setGlobalState(responseUsers.data.data);
        console.log('GLOBAL STATE', globalState);

    } catch (error) {
      console.log(error);
  };
}

async function onGoogleButtonPress() {
  setLoading(true)

try{
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    console.log('paso1');

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    console.log("paso2")

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    console.log("paso3")
    console.log(googleCredential)

    const signInWithCredential = await auth().signInWithCredential(googleCredential);

    console.log("paso4")
    console.log("**********************SIGN IN W CREDENTIAL******************")
    console.log(signInWithCredential)

    const idTokenResult = await auth().currentUser.getIdTokenResult();

    console.log("********************token****************************")
    console.log(idTokenResult.token);
    getAllUsersFromDataBase();
    //const URL = "http://192.168.1.1:5001/api/users/token"
    const URL = 'http://192.168.1.163:5001/api/users/token';
    
      const decodedUser = await axios.post(URL, { idToken: idTokenResult.token });
      console.log('USUARIO REGISTRADO', decodedUser.data.user);
      setUserGlobalState(decodedUser.data.user); 
      console.log('USUARIO GLOBAL', userGlobalState);
    
    }
    catch (error) {
      // Manejar errores aquí
      console.error(error);

    } finally {
      setLoading(false);
    }
  }
    // const decodedUser = await axios.get(URL);
    
    // console.log(decodedUser)
    // const userMail = decodedUser;
    // console.log("*****************data from server********************")
    // console.log(userMail)
    // Sign-in the user with the credential
    
    //auth().signInWithCredential(googleCredential);



  return (
    <View>
    
    { showProfile ? (
      userGlobalState.rol === 'acolyte' ? (
        <ProfileAcolyte user={userGlobalState} goBack={goBack} />
      ) : userGlobalState.rol === 'mortimer' ? (
        <ProfileMortimer user={userGlobalState} goBack={goBack} />
      ) : userGlobalState.rol === 'villano' ? (
        <ProfileVillano user={userGlobalState} goBack={goBack} />
      ) : userGlobalState.rol === 'knight' ? (
        <ProfileRider user={userGlobalState} goBack={goBack} />
      ) : (
        <Text>No se ha encontrado un perfil para este rol.</Text>
      )
    ) : (
      
      <>
      <StyledButton onPress={onGoogleButtonPress} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
        </StyledButton>
        </>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

const StyledButton = styled.TouchableOpacity`
    background-color: rgba(171, 147, 192, 0.7);
    display: flex;
    justify-content: center;
    height: 60px;
    width: 40%;
    margin-top: 35%;
    border-radius: 60px;
    border: #7B26C4;
    align-self: center;
`;
const ButtonText = styled.Text`
    color:rgba(92, 0, 172, 0.8);
    font-size: 20px;
    text-align: center;

`;
export default LoginModal;