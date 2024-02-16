import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { getUserData, storeUserData } from './src/helpers/asyncStorageUser';
import { Context } from './src/helpers/Context';
import { globalStateSchema } from './src/helpers/Constants';
import LoginModal from './src/components/LoginModal';
import socket from './helpers/socket';

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
      console.log("USUARIOOOOOO");
      console.log(user);

      if (user) {
        setIsLogged(true);
      }
    }
    checkIfLogged();

  }, []);

  useEffect(() => {
    if (globalState.user.name !== "") {
      storeUserData(globalState.user);
      socket.connect();
      socket.on("test_broadcast", (data) => {
        console.log("***********SOCKET*******************");
        console.log(data);

      })
    }
  }, [globalState]);

  return (

    <View>

      <Context.Provider value={{ globalState, globalStateHandler }}>
        <LoginModal />
      </Context.Provider>

    </View>
  );
};

export default AppScreen;