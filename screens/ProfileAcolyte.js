import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet,Text } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../src/helpers/Context';
import socket from '../helpers/socket';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import LoginModal from '../src/components/LoginModal';

const ProfileAcolyte = () => {
  const [showProfile, setShowProfile] = useState(true);
  const { globalState, globalStateHandler } = useContext(Context);
  const [blockButtonSocket, setBlockButtonSocket] = useState(false)
  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  useEffect(() => {

    console.log('userglobal', globalState);
    
  }, []);
  
  useEffect(() => {
    if (globalState)
    {

      console.log("ACOLITO globalState");
      console.log(globalState.user);
    }
    
  }, [globalState]);

  const goBack = () => {
    setShowProfile(false);
  };

  const disableButton = ()=> {
    setBlockButtonSocket(true)
  }

  async function onSignOutButtonPress() {
    try {
      await GoogleSignin.revokeAccess(); // Revoca el acceso de Google
      await GoogleSignin.signOut(); // Cierra sesión de Google
      await auth().signOut(); // Cierra sesión de Firebase (si estás utilizando Firebase)
      setUserRole(null); // Actualiza el estado del usuario autenticado
      setIsAuthenticated(false);
      setLoginModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <View>
      {isAuthenticated ? (
       
        <View>
          {globalState.user.name !== "" ? (
            <Container>
              <ProfileText>ACOLYTE</ProfileText>
              <Image
                source={{ uri: globalState.user.imgURL }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <ProfileText>Name: {globalState.user.name}</ProfileText>
              <ProfileText>Rol: {globalState.user.rol}</ProfileText>
  
              <ProfileText>Inventory:</ProfileText>
              <View style={styles.inlineContainer}>
                {Object.keys(globalState.user.inventory).map((key, index) => (
                  <ProfileText key={index}>{globalState.inventory[key]}</ProfileText>
                ))}
              </View>
  
              <ProfileText>Diseases:</ProfileText>
              <View style={styles.inlineContainer}>
                {Object.keys(globalState.user.diseases).map((key, index) => (
                  <ProfileText key={index}>{globalState.user.diseases[key]}</ProfileText>
                ))}
              </View>
  
              <ButtonContainer>
                <CustomButton
                  disabled={blockButtonSocket}
                  onPress={() => {
                    disableButton();
                    socket.emit("test_broadcast", globalState.user.name);
                    setBlockButtonSocket(false);
                  }}
                >
                  <ButtonText>envio de socket</ButtonText>
                </CustomButton>
                <CustomButton onPress={goBack}>
                  <ButtonText>Attack 2</ButtonText>
                </CustomButton>
                <CustomButton onPress={goBack}>
                  <ButtonText>Reset</ButtonText>
                </CustomButton>
              </ButtonContainer>
  
              <SignOutButton onPress={onSignOutButtonPress}>
                <ButtonText>Sign Out</ButtonText>
              </SignOutButton>
            </Container>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      ) : (
        
        <LoginModal />
      )}
    </View>
  );
      }

const styles = StyleSheet.create({

  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const SignOutButton = styled.TouchableOpacity`
  background-color: rgba(232, 0, 0, 0.6);
  justify-content: center;
  width: 40%;
  height: 8%;
  border-radius: 60px;
  align-self: center;
  margin-top: -9%;
  margin-left: 10%;
`
const ButtonText = styled.Text`
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
`
const ProfileText = styled.Text`
  color: black;
  font-size: 20px;
  text-align: center;
  margin: 5px;
`
const Container = styled.View`
  width: 80%; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: rgba(232, 0, 0, 0.6);
  margin-bottom: -50%;
  margin-left: 10%;
  `
const View = styled.View`
  width: 90%; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  `
const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 58%;
`
const CustomButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 255, 0.6);
  justify-content: center;
  width: 30%;
  height: 40%;
  border-radius: 60px;
  margin: 10px;
`
export default ProfileAcolyte;
