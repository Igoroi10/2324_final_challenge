import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';


const showSpecialEnemyList = ({setOpenEnemyList, setOpenSpecialEnemyList}) => {
    const [target, setTarget] = useState([]);
    const {globalState, globalStateHandler} = useContext(Context);
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
          if(userObject.isAlive && (( userObject.rol === "villain" || userObject.rol === "guest") && userObject.isConnected === true) || userObject.rol === "knight"){
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
  
    const selectedTarget = (item) => {
      specialAttackTarget(item);
    };
    
    const specialAttackTarget = (item) => {
      if(globalState.user.rol !== "guest"){
          const dataToSend = {
            id: globalState.user._id,
            targId: item._id,
            stat: "intelligence"
          };
          socket.emit('attack_try', dataToSend);
          //console.log('emitir socket', dataToSend)
      }
      setOpenSpecialEnemyList(false)
  }

  return (
    <ModalContainer transparent={true} visible={true}>
    <ContentContainer>
      <TitleText> Choose the oponent to attack: </TitleText>
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


const TitleText = styled.Text`
font-family: 'Breathe Fire IV';
font-size: 30px;
color: black;
letter-spacing: 4px;
`

const EnemiesList = styled(FlatList)`
  margin-top: 20px;
`;

const ModalContainer = styled.Modal`
`;

const ContentContainer = styled.View`
  border-radius: 20px;
  margin-top: 50%;
  background-color: #fff;
  padding: 20px;
`;

const IngredientList = styled(FlatList)`
  margin-top: 20px;
`;

const IngredientItem = styled.TouchableOpacity`
background-color: ${(props) => (props.selected ? '#95a5a6' : '#3498db')};
  padding: 15px;
  border-radius: 15px;
  margin-right: 15px;
`;


const IngredientName = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const styles = {
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
};

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


export default showSpecialEnemyList;