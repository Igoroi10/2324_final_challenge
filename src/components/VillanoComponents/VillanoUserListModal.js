import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import socket from '../../../helpers/socket';

const showVillanoEnemyList = ({ setOpenEnemyList, illnessToSend }) => {
    const [target, setTarget] = useState([]);
    const {globalState, globalStateHandler} = useContext(Context);
    const [posibleTargets, setPosibleTargets] = useState([]);

    const user = globalState.user;
    let isGood;

    if(user.rol === "villano" || user.rol === "mortimer" || user.rol === "acolyte")
        isGood = true
    else    
        isGood = false 

    useEffect(() => { 
        
      const posibleTargetsList = globalState.userList.filter((el) => {
        
        if(isGood){
          if(el.rol !== "villano" )
            return el;
        }
        else{
          if(el.rol !== "villano")
            return el;
        }
      })    
      setPosibleTargets(posibleTargetsList)
    }, [globalState.userList]);
   
    // Función para manejar la enfermedad correspondiente según el contexto
    const handleDisease = (item) => {
      console.log
        
            const data = {
                id: user._id,
                illness: illnessToSend, // Se usa la enfermedad proporcionada
                targId: item._id,
                active: true
            }
            console.log(data);
            socket.emit('disease_try', data);
            setOpenEnemyList(false);
        
    }

    const selectedTarget = (item) => {
      setTarget(item);
      console.log("selected user", item.name);
      handleDisease(item); 
      setOpenEnemyList(false);
  };

  return (
      <ModalContainer transparent={true} visible={true}>
          <ContentContainer>
              <IngredientList
                  data={posibleTargets}
                  renderItem={({ item, index }) => (
                      <IngredientItem
                          onPress={() => selectedTarget(item)}
                          selected={item}
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

export default showVillanoEnemyList;

