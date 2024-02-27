import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';

// Assets
import iconEthazium from '../../../assets/magicIcon.png';

const ApplyEthazium = ({setOpenEnemyList} ) => {

  const { globalState, globalStateHandler } = useContext(Context);

  const openEnemyList = () =>{
   setOpenEnemyList(true);
  }

  return (
    
      <ButtonsContainer>
        <Square onPress={openEnemyList}>
          <Image source={iconEthazium} style={styles.image}  />
        </Square>
      </ButtonsContainer>
    )
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
  bottom: 20%;
  left:15%;
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

export default ApplyEthazium;