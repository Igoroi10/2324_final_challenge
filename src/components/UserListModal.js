import React, { useState, useEffect, useContext } from 'react';
import { FlatList, Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';
import * as Progress from 'react-native-progress';






const showEnemyList = ({setOpenEnemyList}) => {
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
      //console.log('NORMAL');
      setTarget(item)
      // console.log("selected user");
      attackTarget(item);
    };

    const attackTarget = (item) => {
      if(globalState.user.rol !== "guest"){
        const dataToSend = {
          id: user._id,
          targId: item._id,
          stat: "strength"
        }
  
        socket.emit('attack_try', dataToSend);
        //console.log('emitir socket', dataToSend)
      }
      else{
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

      setOpenEnemyList(false)
    }


  return (
    <ModalContainer transparent={true} visible={true}>
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
          keyExtractor={(item, index) => index+1}
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
    width: 300,
    height: '60%',
    borderRadius: 30,
    objectFit: 'cover',
    marginBottom: 15
  },
};

export default showEnemyList;

