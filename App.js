
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import Profile from './screens/Profile';

const AppScreen = () => {
  const [showProfile, setShowProfile] = useState(false);

  const user = {
    name: 'PATXI',
    email: 'aeg@gmail.com',
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <View>
      <Text>FINAL CHALLENGE</Text>
      {!showProfile ? (
        <Button title="Ir a Perfil" onPress={toggleProfile} />
      ) : (
        <Profile user={user} />
      )}
    </View>
  );
};

export default AppScreen;
