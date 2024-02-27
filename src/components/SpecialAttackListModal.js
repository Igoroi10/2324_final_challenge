import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View } from 'react-native';
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
      specialAttackTarget(item);
    };
    
    const specialAttackTarget = (item) => {
      if(globalState.user.rol !== "guest"){
          const dataToSend = {
            id: user._id,
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
        <IngredientList
          data={posibleTargets}
          renderItem={({ item, index }) => (
            <IngredientItem
              onPress={() => selectedtarget(item)}
              selected={item}
              // onLongPress={() => { openModal(item) }}
            >
              {item.imgURL && (
                <Image source={{ uri: item.imgURL }} style={styles.image} />

              )}
                <IngredientName>{item.name}</IngredientName>

            </IngredientItem>
          )}
          keyExtractor={(item, index) => index+1}
          horizontal
        />

      </ContentContainer>
    </ModalContainer>
  );
};




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

export default showSpecialEnemyList;

