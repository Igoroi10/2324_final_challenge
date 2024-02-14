import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { getUserData } from './src/helpers/asyncStorageUser';
import LoginModal from './src/components/LoginModal';
import GoogleModal from './src/components/GoogleModal'

const AppScreen = () => {
  
  const [isLogged, setIsLogged] = useState(false);

  useEffect(()=>{

    const checkIfLogged = async ()=>{
      const user = await getUserData();
      
      if(user){
        setIsLogged(true);
      }
    }
    checkIfLogged();
    
  },[]);

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

  return (
    <View>
      <GoogleModal />
      <LoginModal/>
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
`

const ButtonText = styled.Text`
    color:rgba(92, 0, 172, 0.8);
    font-size: 20px;
    text-align: center;
`

export default AppScreen;