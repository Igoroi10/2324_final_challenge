import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';

// Assets
import iconAtack from '../../../assets/Icon_attack_v1.png'
import iconShield from '../../../assets/Icon_shield_v1.png'
import socket from '../../../helpers/socket';

const FightButtons = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  return (

    <ButtonsContainer>
      <Square onPress={showEnemyList}>
        <Image source={iconAtack} style={styles.image}  />
      </Square>

      <Square onPress={attackTest}>
        <Image source={iconShield} style={styles.image} />
      </Square>

    </ButtonsContainer>

  )
}

const attackTest = () =>{
  const user = globalState.user;
  let isGood;

  if(user.rol === "acolyte" || user.rol === "mortimer")
      isGood = true
  else    
      isGood = false

  const posibleTargets = globalState.userList.map((el) => {
      if(isGood){
        if(el.rol !== "acolyte" && el.rol !== "mortimer")
          return el;
      }
      else{
        if(el.rol === "acolyte" || el.rol === "mortimer")
          return el;
      }
  })
  const dataToSend = {
    id: globalState.user._id,
    targId: posibleTargets[1]._id,
    stat: globalState.user.characterStats.strength
  }
  socket.emit()
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10
  },
});

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 12%;
  width: 80%;
`

const Square = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -4%;
  opacity: ${(props) => (props.disabled ? 0.8 : 1)};
  background-color: ${(props) => (props.disabled ? 'rgba(0, 0, 0, 0)' : 'transparent')}; 
  height: 65%;
  width: 40%;
  border: 1px;
  border-color: white;
  border-radius: 1000px;
  width: 100px;
  height: 100px;
`;



export default FightButtons