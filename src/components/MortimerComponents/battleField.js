import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';


const BattleField = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  const [acolites, setAcolites] = useState(null);
  const [knights, setKnights] = useState(null);
  const [villains, setVillains] = useState(null);

  const [currentTurnPlayer, setCurrentTurnPlayer] = useState("")

  useEffect(() => {

    if(globalState.initiative.length !== 0){
      
        const acolites = [];
        const knights = [];
        const villains = [];

        globalState.initiative.forEach((intiativeId)=>{

        globalState.userList.forEach((userObject)=>{
          // console.log("userlist*****************")
          // console.log(userObject.rol)

          if(intiativeId === userObject._id){

            if(userObject.rol === "acolyte"){

              acolites.push(userObject);
            }else if(userObject.rol !== "knight"){
              villains.push(userObject);
            } 
            else{
              knights.push(userObject);

            }

          }
        })      
      })

      setAcolites(acolites);
      setKnights(knights);
      setVillains(villains)

    }

    

  }, [globalState.userList, globalState.initiative]);

  useEffect(() => {

    if(globalState.currentTurn != ""){
      // Se recibe el email del jugador al que le toca
      const currentTurnId = globalState.currentTurn

      // Se muestra en pantalla a que jugador le toca
      const currentTurnPlayer = globalState.userList.filter(user => user._id === currentTurnId)
      setCurrentTurnPlayer(currentTurnPlayer[0])
    }else{
      
    }
    

  }, [globalState]);

  useEffect(()=>{
    setTimeout(() => {  
      globalStateHandler({currentMessage: ""});
    }, 4000);
  },[globalState.currentMessage])
  
  if(acolites === null || knights === null || villains === null){
    return null
  }

  return (
    <>
    
  <Image key={"imagen"} style={{width: '120%', height: '120%', position: 'absolute', zIndex: -1}} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/Backgrounds%2FbattleField2.png?alt=media&token=24b9bde5-c60f-454f-b5c0-8bb74345c9f4' }} />

    
    <MainContainer>
      
      <AcolytesContainer>
      {
        acolites.map((acolite, idx) => 

          <AcolyteContainer key={acolite._id} isAlive={acolite.isAlive} >

            <AcolyteImageContainer >
              <AcolyteImage source={{ uri: acolite.imgURL }} />
            </AcolyteImageContainer>

            <Progress.Bar 
              color={'rgba(100, 255, 100, 1)'}
              style={styles.AcolyteProgressBar} 
              progress={acolite.characterStats.hp/acolite.characterMaxStats.maxHp } 
              
            />

          </AcolyteContainer >
        )
      }
      </AcolytesContainer>
    <Spacer></Spacer>
      <Interface>
        <TurnContainer>
          <Text style={{color: 'white'}}>TURNO DE: </Text>
          {currentTurnPlayer.isAlive ? 
            <TurnImageContainer>
              <TurnImage source={{uri: currentTurnPlayer.imgURL }} alt='currentTurn'/>
            </TurnImageContainer>
          :
            null
          }
         
        </TurnContainer>
        <MessagesContainer>
          {globalState.currentMessage !== "" &&
            <>
            <BattleActionPicture source={require('../../../assets/BattleAction.png')} /> 
            <BlackFilter></BlackFilter>
            <InterfaceMessage>
              <TurnMessageImage source={{ uri: globalState.attacker.imgURL }} alt='attackerImg'/>
              <TurnMessageImage source={{ uri: globalState.icon.imgURL }} alt='pruebar'/>
              <TurnMessageImage source={{uri: globalState.defender.imgURL }} alt='defenderImg'/>
            </InterfaceMessage>
            <InterfaceMessage>
              
              <MessageText > {globalState.currentMessage} </MessageText>
            </InterfaceMessage>
            </>
          }
        </MessagesContainer>
      </Interface>

      <EnemiesContainer>
        {knights.map( knight => 
          <EnemyContainer key={knight._id}>

            <EnemyImageContainer>
              <EnemyImage source={{ uri: knight.imgURL }} />
            </EnemyImageContainer>

            <Progress.Bar 
              color={'rgba(255, 0, 0, 1)'}
              style={styles.KnightProgressBar} 
              progress={knight.characterStats.hp / knight.characterMaxStats.maxHp }
            />

          </EnemyContainer >
        )}

      </EnemiesContainer>
      <EnemiesContainer>
        {villains.map( villain => 
          <EnemyContainer key={villain._id}>

            <EnemyImageContainer>
              <EnemyImage source={{ uri: villain.imgURL }} />
            </EnemyImageContainer>

            <Progress.Bar 
              color={'rgba(255, 0, 0, 1)'}
              style={styles.KnightProgressBar} 
              progress={villain.characterStats.hp / villain.characterMaxStats.maxHp }
            />

          </EnemyContainer >
        )}

      </EnemiesContainer>
    </MainContainer>
    
    </>
  )
}


const styles = StyleSheet.create({
  AcolyteProgressBar: {
    width: 50,
    height: 5,
    marginTop: 5,

  },
  KnightProgressBar: {
    width: 60,
    height: 5,
    marginLeft: 5,
    marginTop: 3, 
  }
  
});

const MainContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items:center;
  flex: 1;
`

const Spacer = styled.View`
  height: 40%;
`

const Interface = styled.View`
  display: flex; 
  flex-direction: row;
  width: 95%;
  height: 80%;
  justify-content: space-between; 
  align-items: center;
  position: absolute;
  z-index: 3;
`

const InterfaceMessage = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  align-items:center;
  justify-content: space-around;
  padding-top: 3%;
`

const TurnImageContainer = styled.View`
  border: 2px solid white;
  border-radius: 50px;
  width: 55px;
`

const TurnImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`

const TurnMessageImage = styled.Image`
  height: 100%;
  width: 30%;
  object-fit: contain;
`

// ============================================
//                ENEMIES STYLES
// ============================================

const EnemiesContainer = styled.View`
  display: flex; 
  flex-direction: row;
  width: 70%;
  height: 10%;
  justify-content: space-around; 
  align-items: top;
`
const EnemyContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`

const EnemyImageContainer = styled.View`
  border: 2px solid white;
  border-radius: 100px;
  margin-top: 5%; 
`

const EnemyImage = styled.Image`
  height: 45px;
  width: 45px;
  border-radius: 100px;
`

// ============================================
//                ACOLITES STYLES
// ============================================

const AcolytesContainer = styled.View`
padding-top: 3%;
  display: flex; 
  flex-direction: row;
  width: 80%;
  height: 27%;
  justify-content: center; 
  align-items: top;
`

const AcolyteContainer = styled.View`
  margin-right: 1%;
  margin-left: 1%;
  align-items: center;
  justify-content: center;
  opacity: ${(prop => prop.isAlive ? '1': '0.4')};
`
  
const AcolyteImageContainer = styled.View`
  border: 2px solid white;
  border-radius: 100px;
`

const AcolyteImage = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 100px;
`


const TurnContainer = styled.View`
  width: 15%;
`

const MessagesContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 4;
  position: absolute;
`

const BattleActionPicture = styled.Image`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
`
const BlackFilter = styled.View`
  background-color: rgba(0,0,0,0.6);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`

const MessageText = styled.Text`
  font-family: 'Breathe Fire IV';
  color: white;
  letter-spacing: 3px;
  font-size: 25px;
`

export default BattleField