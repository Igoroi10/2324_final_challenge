import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { getUserData } from '../helpers/asyncStorageUser';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Context } from "../helpers/Context";
import socket from '../../helpers/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId: '278625394290-1u0iag96nrpv7aptlr1h5a7cbkhovlhd.apps.googleusercontent.com',
});

import auth from '@react-native-firebase/auth';
import { URL } from '../../config';
import { token , apiUsers} from '../helpers/rutas';

const LoginModal = ({ onLogin, setLoginModalVisible}) => {
  const [isLoading, setLoading] = useState(false);
  const { globalState, globalStateHandler } = useContext(Context);

  useEffect(() => {

    getAllUsersFromDataBase()

  }, []);

  const getAllUsersFromDataBase = async () => {
    try {
      const urlUsers = URL+'api/users/';
      // const urlUsers = "http://192.168.1.166:5001/api/users/"
      // Realizar la solicitud al servidor con el token en el encabezado de autorización
      console.log(urlUsers)
      const responseUsers = await axios.get(urlUsers);
      // Seleccionamos todos los usuarios y los seteamos 
      globalStateHandler({ userList: [responseUsers.data]});

    } catch (error) {
      console.log(error);
    };
  }

  async function onGoogleButtonPress() {
    setLoading(true)

    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });


      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);


      const signInWithCredential = await auth().signInWithCredential(googleCredential);

      const idTokenResult = await auth().currentUser.getIdTokenResult();

      getAllUsersFromDataBase();

      const tokenURL = URL + "api/users/token"

      const decodedUser = await axios.post(tokenURL, { idToken: idTokenResult.token });

      const user = decodedUser.data.user.email;
      await AsyncStorage.setItem('user', user)
      .then(() => {
      console.log('email guardado en AsyncStorage:', user);
      })
      const rol = decodedUser.data.user.rol;
      await AsyncStorage.setItem('userRole', rol)
      .then(() => {
      console.log('rol guardado en AsyncStorage:', rol);
      })

      if(globalState){
      globalStateHandler({ user: decodedUser.data.user});

      socket.connect();
      socket.emit("store_socket_id", decodedUser.data.user.email)
      }
      handleSuccessfulLogin();
    }
    catch (error) {
      // Manejar errores aquí
      console.error(error);

    } finally {
      setLoading(false);
    }
  }

  const handleSuccessfulLogin = () => {
    onLogin(); 
    setLoginModalVisible(false); 
  };


  return (
   <View>
          <StyledButton onPress={onGoogleButtonPress} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
          </StyledButton>
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