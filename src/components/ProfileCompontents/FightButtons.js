import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';

// Assets
import iconAtack from '../../../assets/Icon_attack_v1.png'
import iconFire from '../../../assets/fireIcon.png'
import socket from '../../../helpers/socket';

const FightButtons = ({setOpenEnemyList, setOpenSpecialEnemyList} ) => {

  const { globalState, globalStateHandler } = useContext(Context);

  const openEnemyList = () =>{
    setOpenEnemyList(true);
  }

  const openSpecialEnemyList = () => {
    setOpenSpecialEnemyList(true);
  };

  return (
    (globalState.user._id === globalState.currentTurn  && globalState.currentMessage === "") ? (
      <ButtonsContainer>
        {/* este boton */}
        <Square onPress={openEnemyList}>
          <Image source={iconAtack} style={styles.image}  />
        </Square>
        <Square onPress={openSpecialEnemyList}>
          <Image source={iconFire} style={styles.image} />
        </Square>

      </ButtonsContainer>
    ):(
     <NotTurnContainer>
      <NotTurnImage  source={require("../../../assets/NotTurn.png")} />
       <Text> Wait, it is not your time to attack </Text>
     </NotTurnContainer>
    )
  )
}

const styles = StyleSheet.create({
  image: {
    width: '110%',
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
  position: absolute;
  bottom: 10%; 

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


const NotTurnContainer = styled.View`
  width: 100%;
  height: 35%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1%;
`

const Text = styled.Text`
  font-size: 30px;
  color: white;
  font-family: 'Breathe Fire IV';
  letter-spacing: 4px;
  text-shadow-color: grey;
  text-shadow-offset: 1px 0px; 
  text-shadow-radius: 3px;
`

const NotTurnImage = styled.Image`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4
`


export default FightButtons