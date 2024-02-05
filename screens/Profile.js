import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import styled from 'styled-components';



const Profile = ({ user, goBack }) => {
  return (
    <View>
      <Image
        source={{ uri: user.imageUri }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <ProfileText>Name: {user.name}</ProfileText>
      <ProfileText>Email: {user.email}</ProfileText>
  
      <ProfileText>Role: {user.role}</ProfileText>

      <ProfileText>Inventory:</ProfileText>
      <View>
        {user.inventory.map((item, index) => (
          <ProfileText key={index}>{item}</ProfileText>
        ))}
      </View>

      <ProfileText>Change Stats:</ProfileText>
      <View style={styles.inlineContainer}>
        {Object.keys(user.changeStats).map((key, index) => (
          <ProfileText key={index}>{user.changeStats[key]}</ProfileText>
        ))}
      </View>

<ProfileText>Change Max Stats:</ProfileText>
      <View style={styles.inlineContainer}>
        {Object.keys(user.changeMaxStats).map((key, index) => (
          <ProfileText key={index}>{user.changeMaxStats[key]}</ProfileText>
        ))}
      </View>

      <ProfileText>Diseases:</ProfileText>
      <View>
        {Object.keys(user.diseases).map((key, index) => (
          <ProfileText key={index}>
            {user.diseases[key]}
          </ProfileText>
        ))}
      </View>

      <SignOutButton onPress={goBack}>
              <ButtonText>Sign Out</ButtonText>
            </SignOutButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineContainer: {
    flexDirection: 'row', // Coloca los elementos en la misma línea
    alignItems: 'center',

  },
});

const SignOutButton = styled.TouchableOpacity`
    background-color: rgba(232, 0, 0 , 0.6);
    justify-content: center;
    width: 50%;
    height: 7%;
   
    border-radius: 60px;
    align-self: center;
`
const ButtonText = styled.Text`
    color: rgba(255,255,255,1);
    font-size: 20px;
    text-align: center;
`

const ProfileText = styled.Text`
    color: 'black';
    font-size: 20px;
    text-align: center;
    margin: 5px;
`


export default Profile;
