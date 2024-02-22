import React, { useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import socket from '../../../helpers/socket';
import BattleField from '../MortimerComponents/battleField';
import { all } from 'axios';

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`

const LeftContainer = styled.View`
  width: 40%;
  height:100%;
  align-items: center; 
  border: 1px solid white;
  border-radius: 20px;
`

const TextsContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
`

const BattleButton = styled.TouchableOpacity`
  width: 90%;
  height: 90%;
`

const RightContainer = styled.View`
  padding-top: 2%;
  padding-bottom: 2%;
  width: 55%;
  height: 100%;
  border-radius: 20px;
`

const RowContainer = styled.View`
  flex-direction: row;
  justify-content:space-around;
  width: 100%;
`

const PictureContainer = styled.View`
  width: 33%;
  height: 60%;
  padding:2%;
`

const ProfilePicture = styled.Image`
  border-radius: 300px;
  width: 100%;
  height: 80%;
  margin-right: 5%;
`

const ProfileInformation = styled.View`
  padding-top: 5%;
  width: 67%;
`

const ProfileVariblesTitle = styled.Text`
  font-size: 20px;
  letter-spacing: 4px;
  color: white;
`
const ProfileVariblesTexts = styled.Text`
  font-size: 15px;
  letter-spacing: 4px;
  color: gray;
`

const ButtonStyle = styled.Image`
  object-fit: contain;
  width: 100%;
  height: 100%;
`

const RosetePicture = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 20px;
`

const AcolyteImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 300px;
`

const MainContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
`

const MortimerProfile = () => {

  const { globalState } = useContext(Context);
  const [usersList, setUsersList] = useState();
  const [readyUserList, setReadyUserList] = useState();
  const [isStartFight, setIsStartFight] = useState(false);
  const [isButtonPress, setIsButtonPress] = useState(false);

  const [isBattleField, setIsBattleField] = useState(false);

  useEffect(() => {
    const connectedUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isConnected);

    setUsersList(connectedUsers);

    checkLife();
    checkAllUsersHP();

  }, [globalState.userList]);
  

  useEffect(() => {

    if (usersList) {

        const readyUsers = usersList.filter(user => user.isReady);
        
        if(readyUsers.length === usersList.length && readyUsers.length !== 0){
          setIsStartFight(true);
          setReadyUserList(readyUsers);
        }else{
            setIsStartFight(false)
        }
    }
  }, [usersList]);

  useEffect(()=>{

    if(globalState.battleStart === true){
        // console.log("Battle Started")
    }
  },[globalState.battleStart])

  useEffect(()=>{  
    console.log("_____________________________")

    console.log("_____________________________")

    console.log("USEEFFECT CURRENTURN")
    console.log("_____________________________")
    console.log("_____________________________")

    if(globalState.currentTurn !== ""){


        
        let user;

			globalState.userList.forEach((el) => {
				if(globalState.currentTurn === el._id)
					user = el;

			})

            let turnNumber;
            globalState.userList.forEach((el, index)=>{

                if(el.name === user.name){
                  turnNumber = index
                }
            })


            console.log("_____________________________")
            console.log("TURNO DE ")
            console.log(globalState.userList[turnNumber].name);

        if(globalState.userList[turnNumber].rol === "knight"){
				

            console.log("TURNO DE JINETE");
            console.log(globalState.userList[turnNumber].name)
            let acolyteArray = [];
            for(let i = 0; i< globalState.userList.length; i++){

                for(let j = 0; j< globalState.initiative.length; j++){

                    if(globalState.initiative[j] === globalState.userList[i]._id && globalState.userList[i].rol === "acolyte" && globalState.userList[i].characterStats.hp > 0){
                        acolyteArray.push(globalState.userList[i]);
                    }
                }
            }

            const randomAcolyte = Math.floor(Math.random() * acolyteArray.length);  

            const dataToSend = {
                id: globalState.userList[turnNumber]._id,
                targId: acolyteArray[randomAcolyte]._id,
                stat: "strength"
            }
            socket.emit('attack_try', dataToSend);
        }

    }
    
  },[globalState.currentTurn])


  const calculateArtifactPosition = (index) => {
    if (usersList)
    {
      const acolytes = usersList.length

      const radius = 150;
      const centerX = Dimensions.get('window').width / 4.3;
      const centerY = Dimensions.get('window').height / 2.3;
      const angle = (((index * (360 / acolytes)) + 270) * (Math.PI / 180));
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      return { left: x, top: y };
    }
  };

  const checkLife = () => {
    globalState.userList.forEach(element => {
    if(element.rol === "acolyte" || element.rol === "knight"){
      if(element.characterStats.hp <= 0 && element.isReady){
          // console.log(`${element.name} ha muerto!!`);
          // console.log(element.characterStats);
        }
      }
    });
  }

  const battleStart = ()=>{

    setIsButtonPress(true);
    setIsBattleField(true);

    const userIDs = readyUserList.map(({_id})=>_id);
    const dataToSend ={

        userIDs: userIDs
    }
    socket.emit("start_battle", dataToSend);
  }

  const checkAllUsersHP = () => {
    const userList = globalState.userList;
    const acolyteUsers = userList.filter(user => user.rol === 'acolyte');
    const knightUsers = userList.filter(user => user.rol === 'knight');

    const allAcolyteHPZero = userList.filter(user => user.rol === 'acolyte' && user.characterStats.hp <= 0)
    const allKnightHPZero = userList.filter(user => user.rol === 'knight' && user.characterStats.hp <= 0)

    if(knightUsers.length === allKnightHPZero.length){
      // console.log("//////////  Todos los jinetes han fallecido  //////////////");
    }
    else if(acolyteUsers.length === allAcolyteHPZero.length){
      // console.log('///////  Todos los acolitos han fallecido  /////////');
    }
  };


  return (



    <MainContainer>
      {!isBattleField && (
        <ProfileContainer>
          <LeftContainer>
              <RowContainer>
              <PictureContainer>
                  <ProfilePicture source={{ uri: globalState.user.imgURL }} />
              </PictureContainer>
              <ProfileInformation>
                  <ProfileVariblesTitle>{globalState.user.name}</ProfileVariblesTitle>
                  <ProfileVariblesTexts>{globalState.user.rol}</ProfileVariblesTexts>
                  <ProfileVariblesTexts>{globalState.rol}</ProfileVariblesTexts>
              </ProfileInformation>
              </RowContainer>
              <RowContainer>
              <ProfileVariblesTitle>HP</ProfileVariblesTitle>
              <ProfileVariblesTexts>INT</ProfileVariblesTexts>
              <ProfileVariblesTexts>STR</ProfileVariblesTexts>
              </RowContainer>
              {isStartFight &&
                  <TextsContainer>
                      <BattleButton onPress={()=>{battleStart()}} disabled={isButtonPress}>
                      <ButtonStyle source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/Buttons%2FlaunchBattle.png?alt=media&token=2c3f73ed-e51a-4eaf-8a12-edc53271213f' }} />
                      </BattleButton>
                  </TextsContainer>
              }
          </LeftContainer>
          <RightContainer>
              <RosetePicture source={require('../../../assets/Rosete.png')} />
              {usersList && usersList.map((el, index) => {
                  const position = calculateArtifactPosition(index);
                  const styles = {
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  borderWidth: el.isReady ? 3 : 30,
                  borderColor: el.isReady ? 'white' : 'rgba(0, 0, 0, 0.4)',
                  position: 'absolute',
                  ...position,
                  };
                  return (
                      <AcolyteImage key={index} source={{ uri: el.imgURL }} style={styles} />
                  );
              })}
          </RightContainer>
      </ProfileContainer>
    )}
    
      {isBattleField && ( <BattleField /> )}
    
    </MainContainer>


  );
};


export default MortimerProfile;