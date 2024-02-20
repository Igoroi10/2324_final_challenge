import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getUserData, storeUserData } from './src/helpers/asyncStorageUser';
import { Context } from './src/helpers/Context';
import { globalStateSchema } from './src/helpers/Constants';
import LoginModal from './src/components/LoginModal';
import socket from './helpers/socket';
import styled from 'styled-components/native';
import ProfileAcolyte from './screens/ProfileAcolyte';
import ProfileMortimer from './screens/ProfileMortimer';
import ProfileVillano from './screens/ProfileVillano';
import ProfileKnight from './screens/ProfileKnight';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AppScreen = () => {
  const [socketEvent, setSocketEvent] = useState(null)
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(true);
  const [globalState, setGlobalState] = useState(globalStateSchema);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const globalStateHandler = (data) => {
    setGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  useEffect(() => {

    const checkIfLogged = async () => {
    const user = await AsyncStorage.getItem('user');
    console.log(user);
    if (user) {
    setIsLogged(true);
    socket.connect();
    socket.emit("store_socket_id", user.email)
    }
    }
    checkIfLogged();

    return () => {
      socket.removeAllListeners();
      };
    
    },[]);

  useEffect(() => {
    // Establece el rol del usuario autenticado
    const setRole = async () => {
   
    //ASYNC STORAGE
    const role = await AsyncStorage.getItem('userRole');
    setUserRole(role);
    
    }
    setRole();
    socket.connect();
    console.log("socket conectao");
    
    socket.on("test_broadcast_response", (data) => {
      console.log("*********************SOCKET TEST************************")
      console.log(data)
    })

  },[isAuthenticated]);

  //Maneja el login
  const handleLogin = async () => {
    setIsAuthenticated(true);
    setLoginModalVisible(false);
  };

    

  return (
    <Context.Provider value={{ globalState, globalStateHandler }}>
      {!isAuthenticated && <LoginModal onLogin={handleLogin} setLoginModalVisible={setLoginModalVisible} />}
      {isAuthenticated && (
        <>
          {userRole === 'acolyte' && <ProfileAcolyte />}
          {userRole === 'mortimer' && <ProfileMortimer />}
          {userRole === 'villain' && <ProfileVillano />}
          {userRole === 'knigth' && <ProfileKnight />}
        </>
      )}
    </Context.Provider>
  );
}  


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
`;

export default AppScreen;