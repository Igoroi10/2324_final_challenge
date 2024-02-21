import React, { useState,useContext,useEffect } from 'react';
import { View, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { storeUserData } from '../../helpers/asyncStorageUser';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { URL } from '../../../config';
import { Context } from '../../helpers/Context';

const LoginModal = ({setIsLogged}) => {

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const {globalState, globalStateHandler} = useContext(Context);




  useEffect(() => {
    console.log("ENTRAMOS")
    console.log(globalState.initiative);
    if (globalState.initiative == []) {
      globalStateHandler({currentTurn: `${globalState.initiative[0].id}`});
    }
  }, [globalState.initiative]);

  useEffect(() => {
    if (globalState.currentTurn != "")
    {
      console.log("Entra en currentTurn");
      console.log(globalState.currentTurn);
    }
  }, [globalState.currentTurn]);

  async function onGoogleButtonPress() {

    GoogleSignin.configure({
      webClientId: '278625394290-1u0iag96nrpv7aptlr1h5a7cbkhovlhd.apps.googleusercontent.com',
    });

    setIsButtonLoading(true);
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });


      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const signInWithCredential = await auth().signInWithCredential(googleCredential);

      const idTokenResult = await auth().currentUser.getIdTokenResult();

      const tokenURL = URL + "api/users/token"

      const decodedUser = await axios.post(tokenURL, { idToken: idTokenResult.token });

      const user = decodedUser.data.user;

      await storeUserData(user);
      setIsLogged(true);
    }
    catch (error) {
      // Manejar errores aquí
      console.error(error);
      setIsButtonLoading(false);

    } finally {
      setIsButtonLoading(false);
    }
  }

  return (
    <ImageBackground source={require("../../../assets/wallpaper_login.jpeg")} style={styles.imageBackground}>
      <MainContainer>
        <StyledButton onPress={onGoogleButtonPress} disabled={isButtonLoading}>
          {isButtonLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
        </StyledButton>
      </MainContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  }
});

const StyledButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: rgba(255, 255, 255, 0.9);
  border: rgba(255, 255, 255, 1);
  border-radius: 60px;
  
  height: 27%;
  width: 40%;
`;

const MainContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center; 
  bottom: -70%;

`

const ButtonText = styled.Text`
  color:rgba(92, 0, 172, 0.8);
  font-size: 20px;
  text-align: center;

`;

export default LoginModal;