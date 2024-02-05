// Profile.js
import React from 'react';
import { View, Text } from 'react-native';

const Profile = ({ user }) => {
  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
};

export default Profile;
