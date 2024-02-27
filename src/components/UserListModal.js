import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';





const ShowEnemyList = ({ setOpenEnemyList, openEnemyList}) => {

  const { globalState, globalStateHandler } = useContext(Context);
  const [posibleTargets, setPosibleTargets] = useState([]);

  useEffect(() => {

    if(globalState.user.rol === "mortimer" || globalState.user.rol === "villain" || globalState.user.rol === "guest"){

      const initiativeUsers = [];
      globalState.initiative.forEach((id)=>{
  
        globalState.userList.forEach((userObject)=>{
  
          if(userObject._id === id){
  
            initiativeUsers.push(userObject);
          }
        })
      })
  
      const acolytes = initiativeUsers.filter((userObject)=>{
        if(userObject.isAlive && userObject.rol === "acoltyte"){
          return userObject;
        }
      })
      
      setPosibleTargets(acolytes);
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
  }, [])


  useEffect(()=>{

    console.log("POSIBLE TARGETS_______________________")
    console.log(posibleTargets)
  },[posibleTargets])

  // useEffect(() => {
  //   const posibleTargetsList = globalState.userList.filter((el) => {

  //     if (isGood) {
  //       if (el.rol !== "acolyte" && el.rol !== "mortimer")
  //         return el; 
  //     }
  //     else {
  //       if (el.rol === "acolyte" || el.rol === "mortimer")
  //         return el;
  //     }
  //   })
  //   // console.log(posibleTargetsList)
  //   setPosibleTargets(posibleTargetsList)
  // }, [globalState.userList]);

  const selectedtarget = (item) => {
    attackTarget(item);
  };


  const attackTarget = (item) => {
    if (globalState.user.rol !== "guest" && globalState.user.rol !== "mortimer") {
      const dataToSend = {
        id: user._id,
        targId: item._id,
        stat: "strength"
      }

      socket.emit('attack_try', dataToSend);
    }
    else if(globalState.user.rol !== "mortimer") {
      const dataToSend = {
        id: item._id,
        illness: "ethazium",
        active: true,
        name: globalState.user.name
      }
      console.log("disease applyed")
      console.log(item)
      socket.emit('disease_try', dataToSend);

    }
    else{
      console.log("mortimer cures")
    }

    setOpenEnemyList(false)
  }

  return (
    <ModalContainer transparent={false} visible={openEnemyList}>
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
          keyExtractor={(item, index) => index + 1}
          horizontal
        />

      </ContentContainer>
    </ModalContainer>
  );
};




const ModalContainer = styled.Modal`
  background-color: black;
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
  color: #000000;
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

export default ShowEnemyList;

