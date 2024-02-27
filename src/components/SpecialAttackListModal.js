import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';


const showSpecialEnemyList = ({setOpenEnemyList, setOpenSpecialEnemyList}) => {
    const [target, setTarget] = useState([]);
    const {globalState, globalStateHandler} = useContext(Context);
    const [posibleTargets, setPosibleTargets] = useState([]);

    const user = globalState.user;
    let isGood;

    if(user.rol === "acolyte" || user.rol === "mortimer")
        isGood = true
    else    
        isGood = false

        // console.log("globalSatte user list " + globalState.userList.length)
    

    useEffect(() => { 
      const posibleTargetsList = globalState.userList.filter((el) => {
        
        if(isGood){
          if(el.rol !== "acolyte" && el.rol !== "mortimer")
            return el;
        }
        else{
          if(el.rol === "acolyte" || el.rol === "mortimer")
            return el;
        }
      })    
      // console.log(posibleTargetsList)
      setPosibleTargets(posibleTargetsList)
    }, [globalState.userList]);

    const selectedtarget = (item) => {
    //console.log('ESPECIAL');
      setTarget(item)
      //console.log("selected user");
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

