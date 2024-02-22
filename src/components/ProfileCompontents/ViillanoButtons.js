import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';

// Assets
import iconAtack from '../../../assets/Icon_attack_v1.png'
import iconShield from '../../../assets/Icon_shield_v1.png'
import socket from '../../../helpers/socket';
import UserListModal from '../UserListModal';

const VillanoButtons = ({} ) => {

  const { globalState, globalStateHandler } = useContext(Context);
  const [openEnemyList, setOpenEnemyList] = useState(false);

  const rottingPlague = () =>{
    
    const data = {
      id: user._id,
      illness: "rotting_plague",
      active: true
    }
    socket.emit('disease_try', data);
  }

  const epicWeakness = () =>{
    
    const data = {
      id: user._id,
      illness: "epic_weakness",
      active: true
    }
    socket.emit('disease_try', data);
  }

  const marrowApocalypse = () =>{
    
    const data = {
      id: user._id,
      illness: "marrow_apocalypse",
      active: true
    }
    socket.emit('disease_try', data);
  }

  return (
    globalState.user._id ? (
      <ButtonsContainer>
        <Square onPress={setOpenEnemyList}>
          <Image source={iconAtack} style={styles.image}  />
          {(openEnemyList && globalState.userList.length > 0) && (
              <UserListModal setOpenEnemyList={setOpenEnemyList} />
            )}
        </Square>
        <Square onPress={setOpenEnemyList}>
          <Image source={iconShield} style={styles.image} />
          {(openEnemyList && globalState.userList.length > 0) && (
              <UserListModal setOpenEnemyList={setOpenEnemyList} />
            )}
        </Square>
        <Square onPress={setOpenEnemyList}>
          <Image source={iconAtack} style={styles.image} />
          {(openEnemyList && globalState.userList.length > 0) && (
              <UserListModal setOpenEnemyList={setOpenEnemyList} />
            )}
        </Square>
      </ButtonsContainer>
    ):(
     <>
        <Text> No ES TU TURNO </Text>
        </>
  ))
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

const Text = styled.Text`
  font-size: 40px;
  color: white;
`
export default VillanoButtons;