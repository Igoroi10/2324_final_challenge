import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet,Text } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../src/helpers/Context';
import socket from '../helpers/socket';



const ProfileAcolyte = () => {
  const [showProfile, setShowProfile] = useState(true);
  const { globalState, globalStateHandler } = useContext(Context);
  const [blockButtonSocket, setBlockButtonSocket] = useState(false)
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
  
  return (
    <View>
  {globalState.user.name !== "" ? (
    <View>
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

    {/* Que es change stats? no existe ningún array en el globalStateSchema de changeStats */}
      {/* <ProfileText>Change Stats:</ProfileText>
      <View style={styles.inlineContainer}>
        {Object.keys(globalState.changeStats).map((key, index) => (
          <ProfileText key={index}>{globalState.changeStats[key]}</ProfileText>
        ))}
      </View> */}

      <ProfileText>Diseases:</ProfileText>
      <View style={styles.inlineContainer}>
        {Object.keys(globalState.user.diseases).map((key, index) => (
          <ProfileText key={index}>{globalState.user.diseases[key]}</ProfileText>
        ))}
      </View>

      <ButtonContainer >
        <CustomButton disabled={blockButtonSocket} onPress={()=>{
          disableButton();
          socket.emit("test_broadcast", "socket enviado desde cliente ("+ globalState.user.name + ")")
          setBlockButtonSocket(false)
        }} >
          <ButtonText>envio de socket</ButtonText>
        </CustomButton>
        <CustomButton onPress={goBack}>
          <ButtonText>Attack 2</ButtonText>
        </CustomButton>
        <CustomButton onPress={goBack}>
          <ButtonText>Reset</ButtonText>
        </CustomButton>
      </ButtonContainer>

      <SignOutButton onPress={goBack}>
        <ButtonText>Sign Out</ButtonText>
      </SignOutButton>
    </Container>
    </View>
  ) : (
    <Text>Loading...</Text>
  )}
</View>

  );
};

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
