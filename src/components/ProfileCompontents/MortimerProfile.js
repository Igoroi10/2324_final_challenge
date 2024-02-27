import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import socket from '../../../helpers/socket';
import BattleField from '../MortimerComponents/battleField';
import { all } from 'axios';

const imageBackground_urt = 'https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/Backgrounds%2FMortimer.png?alt=media&token=d663c266-cbcb-48df-9080-8375fcef2427'

const ProfileContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;
  width: 100%;
`

const LeftContainer = styled.View`
  padding-top: 2%;
  padding-bottom: 2%;
  width: 40%;
  height:100%;
  align-items: center; 
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
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const ProfilePicture = styled.Image`
  border-radius: 300px;
  width: 45%;
  height: 50%;
`

const ProfileVariblesTitle = styled.Text`
  font-size: 20px;
  letter-spacing: 4px;
  color: white;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 1);
  margin-top: 6%;
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
  const [isButtonPress, setIsButtonPress] = useState(false);
  
  const [isStartFight, setIsStartFight] = useState(false);
  const [isBattleField, setIsBattleField] = useState(false);

  const [acolyteList, setAcolyteList] = useState([]);


  // const [isTESTBattleField, setIsTESTBattleField] = useState(false);
  const [isTESTStartFight, setIsTESTStartFight] = useState(true);

  useEffect(() => {
    const connectedUsers = globalState.userList.filter(user => (user.rol === "acolyte" || user.rol === "guest" || user.rol === "villain") && user.isConnected);

    setUsersList(connectedUsers);

    //filtramos la lista para guardar solo los acolitos que se mostrarán en la roseta
    const onlyAcolyteList = connectedUsers.filter(user => user.rol === "acolyte")
    setAcolyteList(onlyAcolyteList);

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

  


  const calculateAcolytesPosition = (index) => {
    if (usersList) {
      const acolytes = usersList.length;
  
      const radiusPercentage = 37; // ajusta este valor según tus necesidades
      const screenWidth = Dimensions.get('window').width * 0.7;
      const screenHeight = Dimensions.get('window').height;
  
      // Convierte el radio a porcentaje del tamaño de la pantalla
      const radius = (radiusPercentage / 100) * Math.min(screenWidth, screenHeight);
  
      const centerX = screenWidth / 2.28;
      const centerY = screenHeight / 2.15;
      const angle = (((index * (360 / acolytes)) + 270) * (Math.PI / 180));
      
      // Convierte las coordenadas a porcentaje del tamaño de la pantalla
      const x = (centerX + radius * Math.cos(angle)) / screenWidth * 100;
      const y = (centerY + radius * Math.sin(angle)) / screenHeight * 100;
  
      return { left: `${x}%`, top: `${y}%` };
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
              <ImageBackground 
                imageStyle={{ borderRadius: 20}} style={styles.imageLeft} 
                key={"imagen"} 
                source={{ uri: imageBackground_urt }}
              >

              <RowContainer>
                <ProfilePicture source={require('../../../assets/mortimer.jpg' )} style={styles.image} />
                <ProfileVariblesTitle> MORTIMER </ProfileVariblesTitle>
              </RowContainer>

              {isStartFight &&
                  <TextsContainer>
                      <BattleButton onPress={()=>{battleStart()}} disabled={isButtonPress}>
                      <ButtonStyle source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/Backgrounds%2FButtonLaunchBattle.png?alt=media&token=1af48244-6ba7-452b-bd5a-ab40849d04fb' }} />
                      </BattleButton>
                  </TextsContainer>
              }
              </ImageBackground>
          </LeftContainer>
          <RightContainer>
              <RosetePicture source={require('../../../assets/Rosete.png')} />
              {acolyteList && acolyteList.map((el, index) => {
                  
                  const position = calculateAcolytesPosition(index);
                  const styles = {
                  width: 100,
                  height: 100,
                  borderRadius: 40,
                  borderWidth: el.isReady ? 4 : 30,
                  borderColor: el.isReady ? 'rgba(216,147,222,1)' : 'rgba(0, 0, 0, 0.4)',
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

const styles = StyleSheet.create({
  imageLeft: {
    width: '100%', 
    height: '100%', 
    borderRadius: '20px'
  }
});


export default MortimerProfile;