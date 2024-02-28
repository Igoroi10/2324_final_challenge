import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import socket from '../../../helpers/socket';


const ReadyButton = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  const userReady = () => {

    const sendData = {
      email: globalState.user.email
    }

    socket.emit('user_ready', sendData);
  }


  return (

    <Readybtn onPress={userReady}>
      <ButtonImage source={require('../../../assets/ReadyButton.png')} />
      <ButtonText> Ready for the battle </ButtonText>
    </Readybtn>

  )
}

const Readybtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 25%;
  width: 100%;
  border-radius: 60px;
  position: absolute;
  bottom: 5%;
`

const ButtonImage = styled.Image`
  width: 80%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  border-radius: 30px;
  z-index: -1;
  position: absolute;
  border-radius: 20px;
`

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-family: 'Breathe Fire IV';
  font-size: 20px;
  letter-spacing: 4px;
  text-shadow-color: black;
  text-shadow-offset: 1px 0px; 
  text-shadow-radius: 5px;
`

export default ReadyButton