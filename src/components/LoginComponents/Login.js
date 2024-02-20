import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { storeUserData } from '../../helpers/asyncStorageUser';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { URL } from '../../../config';


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


const LoginModal = ({setIsLogged}) => {

  const [isButtonLoading, setIsButtonLoading] = useState(false);

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
    <View>
      <StyledButton onPress={onGoogleButtonPress} disabled={isButtonLoading}>
        {isButtonLoading ? <ActivityIndicator color="white" /> : <ButtonText>Google Sign-In</ButtonText>}
      </StyledButton>
    </View>
  );
};

export default LoginModal;