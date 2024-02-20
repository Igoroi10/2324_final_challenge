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
      <ButtonText> READY </ButtonText>
    </Readybtn>

  )
}



const Readybtn = styled.TouchableOpacity`
  background-color: rgba(0, 0, 232, 0.6);
  align-items: center;
  justify-content: center;
  height: 7%;
  width: 80%;
  border: rgba(255, 255, 255, 0.6);
  border-radius: 60px;
  margin-top: 10%;
`

const ButtonText = styled.Text`
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  text-align: center;
`

export default ReadyButton