import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ProfileAcolyte from '../../screens/ProfileAcolyte';
import ProfileMortimer from '../../screens/ProfileMortimer';
import ProfileRider from '../../screens/ProfileKnight';
import ProfileVillano from '../../screens/ProfileVillano';
import styled from 'styled-components/native';
import { getUserData } from '../helpers/asyncStorageUser';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

//Constantes rutas
import { routeAsier, apiUsers, token, routeOscar } from '../helpers/rutas';

GoogleSignin.configure({
  webClientId: '278625394290-1u0iag96nrpv7aptlr1h5a7cbkhovlhd.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';

const LoginModal = ({}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [globalState, setGlobalState] = useState();
  const [isLoading, setLoading] = useState(false);
  //const [user, setUser] = useState(); // 

  const user = {
    name: 'PATXI',
    email: 'aeg@gmail.com',
    imageUri: 'https://lh3.googleusercontent.com/a/ACg8ocICfs24HN3aXJKBCUbfjW9RL4yZTnIkw7icAS0wMiPf7w=s96-c',
    rol: 'acolyte',
    inventory: ["uno", "dos"],
    changeStats: [1, 2, 3, 4],
    changeMaxStats: [5, 6, 7, 8],
    diseases: [0,1],
  };

  useEffect(() => {

    getAllUsersFromDataBase();

    console.log(user);

  }, []);

  const goProfile = () => {
    onGoogleButtonPress();
    setShowProfile(true);

  };

  const goBack = () => {
    setShowProfile(false);
  };

  const handleSuccessfulLogin = () => {
    setShowProfile(true);
  };

  const getAllUsersFromDataBase = async () => {
    try {

      // Realizar la solicitud al servidor con el token en el encabezado de autorización
      //const responseUsers = await axiosInstance.get(urlUsers);
      const responseUsers = await axios.get(`${routeAsier + apiUsers}`);
      console.log('USUARIOS RECIBIDOS', responseUsers.data);
      // Seleccionamos todos los usuarios y los seteamos 
      setGlobalState(responseUsers.data);
      console.log('GLOBAL STATE', globalState);

    } catch (error) {
      console.log(error);
    };
  }

  async function onGoogleButtonPress() {
    setLoading(true)


    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    console.log("paso1")

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
    //const URL = "http://192.168.1.1:5001/api/users/token"
    const URL = 'http://192.168.1.172:5001/api/users/token';
    try{
      const decodedUser = await axios.post(`${routeOscar + apiUsers + token}`, { idToken: idTokenResult.token });
      console.log('USUARIO REGISTRADO', decodedUser.data)
      //setUser(decodedUser.data); 
      console.log('USUARIO', user);
      //setIsLogged(true);
      handleSuccessfulLogin();
      setLoading(false);
    }
    catch (error) {
      console.log("*****************************error")
      console.log(error)
    }
    // const decodedUser = await axios.get(URL);

    // console.log(decodedUser)
    // const userMail = decodedUser;
    // console.log("*****************data from server********************")
    // console.log(userMail)
    // Sign-in the user with the credential
    
    //auth().signInWithCredential(googleCredential);
  }


  return (
    <View>
    
    { showProfile ? (
      user.rol === 'acolyte' ? (
        <ProfileAcolyte user={user} goBack={goBack} />
      ) : user.rol === 'mortimer' ? (
        <ProfileMortimer user={user} goBack={goBack} />
      ) : user.rol === 'villano' ? (
        <ProfileVillano user={user} goBack={goBack} />
      ) : user.rol === 'knight' ? (
        <ProfileRider user={user} goBack={goBack} />
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