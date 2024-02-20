import React, { useEffect, useState } from 'react';
import { getUserData, storeUserData } from './src/helpers/asyncStorageUser';
import { Context } from './src/helpers/Context';
import { globalStateSchema } from './src/helpers/Constants';
import LoginModal from './src/components/LoginComponents/Login';
import socket from './helpers/socket';
import styled from 'styled-components/native';
import ProfileAcolyte from './screens/ProfileAcolyte';
import { getAllUsers } from './src/helpers/axiosPetitions';


const MainContainer = styled.View`
  display: flex;
  flex: 1;
`

const App = () => {
  const [socketEvent, setSocketEvent] = useState(null)
  const [isLogged, setIsLogged] = useState(false);
  const [globalState, setGlobalState] = useState(globalStateSchema);

  const globalStateHandler = (data) => {
    setGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  useEffect(() => {

    const checkIfLogged = async () => {
      const user = await getUserData();
      await getAllUsers();
      if (user) {
      setIsLogged(true);
      }
    }
    checkIfLogged();
  
    },[]);

  useEffect(() => {

    const storeGlobalUserList = async()=>{

      const userList = await getAllUsers();
      globalStateHandler({userList:userList});
    }

    const storeGlobalUser = async()=>{

      const user = await getUserData();
      globalStateHandler({user: user});

      return user;
    }
    

    const initialLoad = async()=>{

      const user = await storeGlobalUser();
      await storeGlobalUserList();

      socket.connect();
      socket.emit("store_socket_id", user.email);
    }

    if(isLogged){

      initialLoad();
    }
  
  },[isLogged]);
    

  return (
    <Context.Provider value={{ globalState, globalStateHandler }}>
      <MainContainer>
        {!isLogged && <LoginModal setIsLogged={setIsLogged} />}
        {isLogged && <ProfileAcolyte/>}

      </MainContainer>
      
    </Context.Provider>
  );
}  

export default App;