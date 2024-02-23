import React, { useEffect, useState } from 'react';
import { getUserData } from './src/helpers/asyncStorageUser';
import { Context } from './src/helpers/Context';
import { globalStateSchema } from './src/helpers/Constants';
import Login from './src/components/LoginComponents/Login';
import socket from './helpers/socket';
import styled from 'styled-components/native';
import ProfileManager from './src/components/ProfileCompontents/ProfileManager';
import { getAllUsers } from './src/helpers/axiosPetitions';
import SocketListener from './src/components/SocketListener';

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
    
    const socketConnection = (user)=>{
      

      socket.emit("store_socket_id", user.email);
      
      socket.onAny((eventName, ...data) => {
        setSocketEvent({event: eventName, value: data[0]})
      }) 

      return () => {
        socket.removeAllListeners();
      };
    }

    const initialLoad = async()=>{

      const user = await storeGlobalUser();
      await storeGlobalUserList();
      socketConnection(user)
    }

    if(isLogged){

      initialLoad();
    }
  
  },[isLogged]);
    

  return (
    <Context.Provider value={{ globalState, globalStateHandler }}>

      {socketEvent !== null && (<SocketListener props={socketEvent}/>)}

      <MainContainer>

        {!isLogged && <Login setIsLogged={setIsLogged} />}
        {(isLogged && globalState.user.name !== "")&& <ProfileManager/>}
      </MainContainer>
    </Context.Provider>
  );
}  

export default App;