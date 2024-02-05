import React from 'react';
import { View, Text, Image} from 'react-native';
import styled from 'styled-components';



const Profile = ({ user, goBack }) => {
  return (
    <View>
      <Image
        source={{ uri: user.imageUri }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
  
      <Text>Role: {user.role}</Text>

      <Text>Inventory:</Text>
      <View>
        {user.inventory.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>

      <Text>Change Stats:</Text>
      <View>
        {Object.keys(user.changeStats).map((key, index) => (
          <Text key={index}>
            {user.changeStats[key]}
          </Text>
        ))}
      </View>

      <Text>Change Max Stats:</Text>
      <View>
        {Object.keys(user.changeMaxStats).map((key, index) => (
          <Text key={index}>
            {user.changeMaxStats[key]}
          </Text>
        ))}
      </View>

      <Text>Diseases:</Text>
      <View>
        {Object.keys(user.diseases).map((key, index) => (
          <Text key={index}>
            {user.diseases[key]}
          </Text>
        ))}
      </View>

      <SignOutButton onPress={goBack}>
              <ButtonText>Sign Out</ButtonText>
            </SignOutButton>
    </View>
  );
};

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


export default Profile;
