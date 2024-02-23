import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet, TurboModuleRegistry } from 'react-native';

// Assets
import iconAtack from '../../../assets/Icon_attack_v1.png'
import iconShield from '../../../assets/Icon_shield_v1.png'
import socket from '../../../helpers/socket';
import VillanoUserListModal from './VillanoUserListModal';

const VillanoButtons = ({} ) => {

  const { globalState, globalStateHandler } = useContext(Context);
  const [openEnemyList, setOpenEnemyList] = useState(false);
  const [illnessToSend, setIllnessToSend] = useState(""); // Estado para almacenar la enfermedad a enviar

  // Función para abrir el modal y establecer la enfermedad a enviar
  const handleButtonPress = (illness) => {
    setOpenEnemyList(true); 
    setIllnessToSend(illness); 
  };

  return (
    globalState.user._id ? (
      <ButtonsContainer>
        <Square onPress={() => handleButtonPress('epic_weakness')}>
          <Image source={iconAtack} style={{ width: 60, height: 60 }} />
        </Square>
        <Square onPress={() => handleButtonPress('rotting_plague')}>
          <Image source={iconShield} style={{ width: 60, height: 60 }} />
        </Square>
        <Square onPress={() => handleButtonPress('marrow_apocalypse')}>
          <Image source={iconAtack} style={{ width: 60, height: 60 }} />
        </Square>
        {openEnemyList && <VillanoUserListModal setOpenEnemyList={setOpenEnemyList} illnessToSend={illnessToSend} />}
      </ButtonsContainer>
    ) : (
      <Text>No es tu turno</Text>
    )
  );
};

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