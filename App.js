import React, { useEffect, useState } from 'react';
import { View, Button} from 'react-native';
import { getUserData } from './src/helpers/asyncStorageUser';
import { Context } from './src/helpers/Context';
import { globalStateSchema } from './src/helpers/Constants';
import LoginModal from './src/components/LoginModal';
import socket from './helpers/socket';
import styled from 'styled-components/native';


const AppScreen = () => {

  const [isLogged, setIsLogged] = useState(false);

  const [globalState, setGlobalState] = useState(globalStateSchema);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const globalStateHandler = (data) => {
    setGlobalState(globalState => ({
      ...globalState,
      ...data
    }));
  }

  useEffect(() => {
    
    const checkIfLogged = async () => {
      const user = await getUserData();
      
      if(user){
        setIsLogged(true);
      }
    }
    checkIfLogged();

    socket.connect();
    console.log("socket conectao");


    
    socket.on("test_broadcast", (data) => {
      console.log("*********************SOCKET************************")
      console.log(data)
    })

  },[]);

return (



    <Context.Provider value={{ globalState, globalStateHandler }}>

      <LoginModal />


    </Context.Provider>

);
};

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