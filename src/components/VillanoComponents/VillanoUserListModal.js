import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import socket from '../../../helpers/socket';

const showVillanoEnemyList = ({ setOpenEnemyList, illnessToSend }) => {
    const [target, setTarget] = useState([]);
    const {globalState, globalStateHandler} = useContext(Context);
    const [posibleTargets, setPosibleTargets] = useState([]);

    const user = globalState.user;
    let isGood;

    if(user.rol === "villain" || user.rol === "mortimer" || user.rol === "acolyte")
        isGood = true
    else    
        isGood = false 

    useEffect(() => { 
        
      const posibleTargetsList = globalState.userList.filter((el) => {
        
        if(isGood){
          if(el.rol !== "villain" )
            return el;
        }
        else{
          if(el.rol !== "villain")
            return el;
        }
      })    
      setPosibleTargets(posibleTargetsList)
    }, [globalState.userList]);
   
    // Función para manejar la enfermedad correspondiente según el contexto
    const handleDisease = (item) => {
      console.log
        
        const data = {
            illness: illnessToSend, // Se usa la enfermedad proporcionada
            id: item._id,
            active: true,
            name: globalState.user.name

        }
        console.log(data);
        socket.emit('disease_try', data);
        setOpenEnemyList(false);  
    }

    const selectedTarget = (item) => {
      setTarget(item);
      console.log("selected user", item.name);
      handleDisease(item); // Llama a la función de enfermedad correspondiente pasando el objetivo seleccionado
      setOpenEnemyList(false);
  };

  return (
      <ModalContainer transparent={true} visible={true}>
          <ContentContainer>
            <TitleText> Choose the acolyte to attack: </TitleText>
              <EnemiesList
                  data={posibleTargets}
                  renderItem={({ item, index }) => (
                      <EnemyItem
                          onPress={() => selectedTarget(item)}
                          selected={item}
                      >
                        <EnemyName>{item.name}</EnemyName>
                          {item.imgURL && (
                              <Image source={{ uri: item.imgURL }} style={styles.image} />
                          )}
                          <StatsRow>
                            <StatTexts>Health: {item.characterStats.hp}</StatTexts>
                          </StatsRow>
                          <StatsRow>
                            <StatTexts>Strength: {item.characterStats.strength}</StatTexts>
                          </StatsRow>
                          <StatsRow>
                            <StatTexts>Agility: {item.characterStats.agility}</StatTexts>
                          </StatsRow>
                          <StatsRow>
                            <StatTexts>intelligece: {item.characterStats.intelligence}</StatTexts>
                          </StatsRow>
                      </EnemyItem>
                  )}
                  keyExtractor={(item, index) => index + 1}
                  horizontal
              />
          </ContentContainer>
      </ModalContainer>
  );
};
const ModalContainer = styled.Modal`
display: flex;
align-items: center;
justify-content: center;
`;

const ContentContainer = styled.View`
  border-radius: 20px;
  margin-top: 30%;
  background-color: #fff;
  padding: 20px;
  height: 70%;
`;

const TitleText = styled.Text`
font-family: 'Breathe Fire IV';
font-size: 20px;
color: black;
letter-spacing: 4px;
`

const EnemiesList = styled(FlatList)`
  margin-top: 20px;
`

const StatsRow = styled.View`
  display: flex;
  flex-direction: row;
`

const StatTexts = styled.Text`
  margin-top: 5px;
  font-family: 'Breathe Fire IV';
  letter-spacing: 4px;
  color: white;
  font-size: 20px;
`

const EnemyItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  background-color: #0B1215;
  padding: 15px;
  border-radius: 15px;
  margin-right: 15px;
`;


const EnemyName = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'Breathe Fire IV';
  letter-spacing: 5px;
  font-size: 30px;
`;

const styles = {
  image: {
    width: 280,
    height: '45%',
    borderRadius: 30,
    objectFit: 'cover',
    marginBottom: 15
  },
};

export default showVillanoEnemyList;

