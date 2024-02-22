import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';
import AllUsersReadyModal from '../AllUsersReadyModal';
import Stats from './Stats';

const Profile = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);
  const [isStartFight, setIsStartFight] = useState(false);
  
  useEffect(() => {

    if (globalState.userList) {

        const readyUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isReady);
        const connectedUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isConnected)

        // console.log("readyUsers.length")
        // console.log(readyUsers.length)

        // console.log("connectedUsers.length")
        // console.log(connectedUsers.length)

        if(readyUsers.length === connectedUsers.length && readyUsers.length !== 0){
        // console.log("la longitud de los dos arrays es la misma");
        setIsStartFight(true);
        }else{
            setIsStartFight(false)
        }
    }
  }, [globalState.userList]);

  useEffect(() => {
    // console.log("isStartFight")
    // console.log(isStartFight)
  }, [isStartFight])

  return (
    <>
      {!isStartFight && (
        <ProfileContainer>
          <Image source={{ uri: globalState.user.imgURL }} style={styles.image} />
          <ProfileText>{globalState.user.name}</ProfileText>
          <Stats />
        </ProfileContainer>
      )}
  
      {isStartFight && <AllUsersReadyModal />}
    </>
  );
  
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 200
  },
});

const ProfileText = styled.Text`
 color: white;
 font-size: 20px;
 text-align: center;
`

const ProfileContainer = styled.View`
  height: 50%;
  align-items: center;
  border: rgba(255,255,255, 0.6);
  width: 88%;
`


export default Profile