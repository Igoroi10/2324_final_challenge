import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Profile from './screens/Profile';

const AppScreen = () => {
  const [showProfile, setShowProfile] = useState(false);

  const user = {
    name: 'PATXI',
    email: 'aeg@gmail.com',
    imageUri: 'https://lh3.googleusercontent.com/a/ACg8ocICfs24HN3aXJKBCUbfjW9RL4yZTnIkw7icAS0wMiPf7w=s96-c',
    role: 'Acolite',
    inventory: ["uno", "dos"],
    changeStats: [1, 2, 3, 4],
    changeMaxStats: [5, 6, 7, 8],
    diseases: [0]
  };

  const goToProfile = () => {
    setShowProfile(!showProfile);
  };

  const goBack = () => {
    setShowProfile(false);
  };

  return (
    <View>
      <Text>FINAL CHALLENGE</Text>
      {!showProfile ? (
        <Button title="Ir a Perfil" onPress={goToProfile} />
      ) : (
        <Profile user={user} goBack={goBack} />
      )}
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


export default AppScreen;