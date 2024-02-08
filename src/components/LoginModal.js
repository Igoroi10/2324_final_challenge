import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProfileAcolyte from '../../screens/ProfileAcolyte';
import ProfileMortimer from '../../screens/ProfileMortimer';
import ProfileRider from '../../screens/ProfileKnight';
import ProfileVillano from '../../screens/ProfileVillano';
import styled from 'styled-components/native';
import { getUserData } from '../helpers/asyncStorageUser';
import axios from 'axios';

const LoginModal = () => {
  
  const [showProfile, setShowProfile] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [globalState, setGlobalState] = useState();

  const user = {
    name: 'PATXI',
    email: 'aeg@gmail.com',
    imageUri: 'https://lh3.googleusercontent.com/a/ACg8ocICfs24HN3aXJKBCUbfjW9RL4yZTnIkw7icAS0wMiPf7w=s96-c',
    role: 'acolyte',
    inventory: ["uno", "dos"],
    changeStats: [1, 2, 3, 4],
    changeMaxStats: [5, 6, 7, 8],
    diseases: [0,1],
  };

  useEffect(()=>{

    // getAllUsersFromDataBase();

    const checkIfLogged = async ()=>{
      const user = await getUserData();
      
      if(user){
        setIsLogged(true);
      }
    }
    checkIfLogged();
    
  },[]);

  const goToProfile = () => {
    setShowProfile(!showProfile);
  };

  const goBack = () => {
    setShowProfile(false);
  };

  const getAllUsersFromDataBase = async (urlUsers) => {
    try {
        const urlUsers = 'http://localhost:5001/api/users';
        // Realizar la solicitud al servidor con el token en el encabezado de autorización
        //const responseUsers = await axiosInstance.get(urlUsers);
        const responseUsers = await axios.get(urlUsers);
        console.log('USUARIOS RECIBIDOS', responseUsers);
        // Seleccionamos todos los usuarios y los seteamos 
        setGlobalState(responseUsers);
        console.log('GLOBAL STATE', globalState);

    } catch (error) {
      console.log(error);
  };
}

  return (
    <View>
    
    {showProfile ? (
      user.role === 'acolyte' ? (
        <ProfileAcolyte user={user} goBack={goBack} />
      ) : user.role === 'mortimer' ? (
        <ProfileMortimer user={user} goBack={goBack} />
      ) : user.role === 'villano' ? (
        <ProfileVillano user={user} goBack={goBack} />
      ) : user.role === 'knight' ? (
        <ProfileRider user={user} goBack={goBack} />
      ) : (
        <Text>No se ha encontrado un perfil para este rol.</Text>
      )
    ) : (
      <StyledButton onPress={goToProfile}>
        <ButtonText>LOGIN</ButtonText>
      </StyledButton>
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
export default LoginModal;