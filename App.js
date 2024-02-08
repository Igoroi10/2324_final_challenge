import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getUserData } from './src/helpers/asyncStorageUser';
import { Context } from './src/helpers/Context';
import { globalStateSchema } from './src/helpers/Constants';
import LoginModal from './src/components/LoginModal';
import socket from './helpers/socket';

const AppScreen = () => {
  
  const [isLogged, setIsLogged] = useState(false);

  const [globalState, setGlobalState] = useState();

  const globalStateHandler = (data) =>{
    setGlobalState( globalState => ({
      ...globalState,
      ...data
    }));
}

  useEffect(()=>{

    const checkIfLogged = async ()=>{
      const user = await getUserData();
      
      if(user){
        setIsLogged(true);
      }
    }
    checkIfLogged();

    socket.connect();
    console.log("socket conectao")
    
  },[]);

  return (
    <View>

      <Context.Provider value={{globalState, globalStateHandler}}>  

      <LoginModal/>
      </Context.Provider>
    </View>
  );
};

export default AppScreen;