import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet, TurboModuleRegistry } from 'react-native';

// Assets
import iconMarrow from '../../../assets/agilityIcon.png';
import iconEpic from '../../../assets/strenghtIcon.png'
import iconRotting from '../../../assets/intelligenceIcon.png';
import UserListModal from '../UserListModal';

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
    (globalState.user._id === globalState.currentTurn && globalState.currentMessage === "") ? (
      <ButtonsContainer>
        <Square onPress={() => handleButtonPress('epic_weakness')}>
          <IconImage source={iconEpic} style={{ width: 100, height: 100 }} />
          <IconText>EPIC WEAKNESS</IconText>
        </Square>
        <Square onPress={() => handleButtonPress('rotting_plague')}>
          <IconImage source={iconRotting} style={{ width: 100, height: 100 }} />
          <IconText>ROTTING PLAGUE</IconText>
        </Square>
        <Square onPress={() => handleButtonPress('marrow_apocalypse')}>
          <IconImage source={iconMarrow} style={{ width: 100, height: 100 }} />
          <IconText>MARROW APOCALYPSE</IconText>
        </Square> 

        {openEnemyList && illnessToSend != "" && <UserListModal setOpenEnemyList={setOpenEnemyList} illnessToSend={illnessToSend} />}
      </ButtonsContainer>
    ) : (
      <NotTurnContainer>
        <NotTurnImage  source={require("../../../assets/NotTurn.png")} />
        <Text> Wait, it is not your time to attack </Text>
     </NotTurnContainer>
    )
  );
};



const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: 20%;
  width: 85%;
  position: absolute;
  bottom: 5%;
`
const Square = styled.TouchableOpacity`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  height: 50%;
`;

const Text = styled.Text`
  font-size: 30px;
  color: white;
  font-family: 'Breathe Fire IV';
  letter-spacing: 4px;
`
const IconText = styled.Text`
  font-size: 12px;
  color: white;
  font-family: 'Breathe Fire IV';
  letter-spacing: 2px;
  margin-top: 25%;
  text-align: center;
`
const IconImage = styled.Image`
  border: 1px solid white;
  border-radius: 500px;
  width: 100%;
  height: 100%;
  margin-bottom: 20%;
`
const NotTurnContainer = styled.View`
  width: 100%;
  height: 38%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1%;
`

const NotTurnImage = styled.Image`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4
  `
  
export default VillanoButtons;