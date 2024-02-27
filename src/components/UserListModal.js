import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';
import * as Progress from 'react-native-progress';






const ShowEnemyList = ({ setOpenEnemyList, openEnemyList}) => {

  const { globalState } = useContext(Context);
  const [posibleTargets, setPosibleTargets] = useState([]);

  useEffect(() => {

    
if(globalState.user.rol === "mortimer"){

      const initiativeUsers = [];
      globalState.initiative.forEach((id)=>{
  
        globalState.userList.forEach((userObject)=>{
  
          if(userObject._id === id){
  
            initiativeUsers.push(userObject);
          }
        })
      })

      const acolytes = initiativeUsers.filter((userObject)=>{

        if(userObject.isAlive && userObject.rol === "acolyte" && (userObject.characterStats.hp < userObject.characterMaxStats.maxHp ||checkDisseases(userObject))){
          return userObject;
        }
      })
      
      setPosibleTargets(acolytes);
    }else if(globalState.user.rol === "villain"){



    }else if(globalState.user.rol === "guest"){



    }else if(globalState.user.rol === "acolyte"){
      const initiativeUsers = [];
      globalState.initiative.forEach((id)=>{
  
        globalState.userList.forEach((userObject)=>{
  
          if(userObject._id === id){
  
            initiativeUsers.push(userObject);
          }
        })
      })
  
      const villains = initiativeUsers.filter((userObject)=>{
        if(userObject.isAlive && (userObject.rol === "knight" || userObject.rol === "villain" || userObject.rol === "guest") ){
          return userObject;
        }
      })
      setPosibleTargets(villains);
    }
  }, [globalState.user]);


  const checkDisseases = (user) => {

    if(user.diseases.rotting_plague === true || user.diseases.epic_weakness === true  || user.diseases.marrow_apocalypse === true || user.diseases.ethazium === true ){
      return true
    } else {
      return false;
    }
  } 

  const selectedtarget = (item) => {
    attackTarget(item);
  };


  const attackTarget = (target) => {
    if (globalState.user.rol === "acolyte" || globalState.user.rol === "knight") {
      const dataToSend = {
        id: globalState.user._id,
        targId: target._id,
        stat: "strength"
      }

      socket.emit('attack_try', dataToSend);
    }
    else if(globalState.user.rol === "guest") {
      const dataToSend = {
        id: target._id,
        illness: "ethazium",
        active: true,
        name: globalState.user.name
      }
      console.log("disease applyed")
      console.log(target)
      socket.emit('disease_try', dataToSend);

    }
    else if (globalState.user.rol === "villain"){
      console.log("villain")
    }else if(globalState.user.rol === "mortimer"){
      console.log("mortimer")
      
      const dataToSend = {
        target: target,
      }
      socket.emit('mortimer_cure', dataToSend);
    }

    setOpenEnemyList(false)
  }

  return (
    <ModalContainer  transparent={true} visible={openEnemyList}>
      <ContentContainer>
        <TitleText> Choose an enemy to attack: </TitleText>

        <EnemiesList
          showsHorizontalScrollIndicator={false}
          data={posibleTargets}
          renderItem={({ item, index }) => (
            <EnemyItem
              onPress={() => selectedtarget(item)}
              selected={item}
              // onLongPress={() => { openModal(item) }}
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

      <CloseButton onPress={() => setOpenEnemyList(false)}> 
        <Text> X </Text>
        </CloseButton>

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
  top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 100%;
  height: 70%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const TitleText = styled.Text`
font-family: 'Breathe Fire IV';
font-size: 30px;
color: black;
letter-spacing: 4px;
`

const EnemiesList = styled(FlatList)`
  margin-top: 20px;
`;

const StatsRow = styled.View`
  display: flex;
  flex-direction: row;
`
const StatTexts = styled.Text`
  margin-top: 5px;
  font-family: 'Breathe Fire IV';
  letter-spacing: 4px;
  color: white;
  font-size: 25px;
`

const EnemyItem = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  background-color: rgba(23, 23, 23, 1);
  padding: 15px;
  border-radius: 15px;
  margin-right: 15px;
  margin-bottom: 25px;
`;

const CloseButton = styled.TouchableOpacity`
  display: flex; 
  justify-content: center; 
  align-items: center;
  background-color: rgba(255, 0, 255, 1);
  border-radius: 25px;
  width: 10%;
  height: 10%;
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

export default ShowEnemyList;

