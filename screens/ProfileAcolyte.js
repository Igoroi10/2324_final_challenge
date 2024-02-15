import React, { useEffect, useState, useContext } from 'react';
import { Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../src/helpers/Context';
const ProfileAcolyte = ({  goBack }) => {
  //const [userGlobalState, setUseruserGlobalState] = useState(); 
  const { userGlobalState,  setUseruserGlobalState }   = useContext(Context);
  useEffect(()=>{

    console.log('userglobal', userGlobalState);
    
  },[]);

  return (
    <View >
      <Container>
      <ProfileText>ACOLYTE</ProfileText>
        {/* <Image
          source={{ uri: userGlobalState[3].imgURL }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        /> */}
        <ProfileText>Name: {userGlobalState.name}</ProfileText>
        {/* <ProfileText>Email: {userGlobalState[3].email}</ProfileText> */}
        <ProfileText>Role: {userGlobalState.role}</ProfileText>

        <ProfileText>Inventory:</ProfileText>
        <View style={styles.inlineContainer}>
        {Object.keys(userGlobalState.inventory).map((key, index) => (
            <ProfileText key={index}>{userGlobalState.inventory[key]}</ProfileText>
          ))}
        </View>

        <ProfileText>Change Stats:</ProfileText>
        <View style={styles.inlineContainer}>
          {Object.keys(userGlobalState.changeStats).map((key, index) => (
            <ProfileText key={index}>{userGlobalState.changeStats[key]}</ProfileText>
          ))}
        </View>

        {/* <ProfileText>Change Max Stats:</ProfileText>
        <View style={styles.inlineContainer}>
          {Object.keys(userGlobalState[3].changeMaxStats).map((key, index) => (
            <ProfileText key={index}>{userGlobalState[3].changeMaxStats[key]}</ProfileText>
          ))}
        </View> */}

        <ProfileText>Diseases:</ProfileText>
        <View style={styles.inlineContainer}>
          {Object.keys(userGlobalState.diseases).map((key, index) => (
            <ProfileText key={index}>{userGlobalState.diseases[key]}</ProfileText>
          ))}
        </View>

      </Container>

      <ButtonContainer>
        <CustomButton onPress={goBack}>
          <ButtonText>Attack 1</ButtonText>
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
