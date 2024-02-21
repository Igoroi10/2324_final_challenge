import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';


const BattleField = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  const [acolites, setAcolites] = useState(null);
  const [knights, setKnights] = useState(null);
  const [currentTurnPlayer, setCurrentTurnPlayer] = useState("")

  
  useEffect(() => {
    const acolites  = globalState.userList.filter(user => user.rol === "acolyte");
    const knights   = globalState.userList.filter(user => user.rol === "knight");

    setAcolites(acolites);
    setKnights(knights);

  }, [globalState]);

  useEffect(() => {

    // Se recibe el email del jugador al que le toca
    // const currentTurnId = globalState.currentTurn
    const currentTurnId= "65d34053779787d852d6568f"

    // Se muestra en pantalla a que jugador le toca
    const currentTurnPlayer = globalState.userList.filter(user => user._id === currentTurnId)
    setCurrentTurnPlayer(currentTurnPlayer[0])

  }, [globalState]);
  
  if(acolites === null || knights === null){
    return null
  }

  return (
    <>
    
  <Image key={"imagen"} style={{width: '120%', height: '120%', position: 'absolute', zIndex: -1}} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/the-final-battle-287a4.appspot.com/o/Backgrounds%2FbattleField2.png?alt=media&token=24b9bde5-c60f-454f-b5c0-8bb74345c9f4' }} />

    
    <MainContainer>
      
      <AcolytesContainer>
      {
        acolites.map((acolite, idx) => 

          <AcolyteContainer key={acolite._id} isPair={idx % 2 == 0 ? true : false } >

            <AcolyteImageContainer >
              <AcolyteImage source={{ uri: acolite.imgURL }} />
            </AcolyteImageContainer>

            <Progress.Bar 
              color={'rgba(100, 255, 100, 1)'}
              style={styles.AcolyteProgressBar} 
              progress={acolite.characterStats.hp / acolite.characterMaxStats.maxHp} 
              
            />

          </AcolyteContainer >
        )
      }
      </AcolytesContainer>

      <Interface>
        <TurnContainer>
          <Text style={{color: 'white'}}>TURNO DE: </Text>
          <TurnImageContainer>
            <TurnImage source={{uri: currentTurnPlayer.imgURL }} alt='currentTurn'/>
          </TurnImageContainer>
        </TurnContainer>

        <Text style={{color: 'white'}}t> INTERFACE MESSAGES </Text>
      </Interface>

      <EnemiesContainer>
        {knights.map( knight => 
        <>
          <EnemyContainer key={knight._id}>

            <EnemyImageContainer>
              <EnemyImage source={{ uri: knight.imgURL }} />
            </EnemyImageContainer>

            <Progress.Bar 
              color={'rgba(255, 0, 0, 1)'}
              style={styles.KnightProgressBar} 
              progress={knight.characterStats.hp / knight.characterMaxStats.maxHp}
            />
          </EnemyContainer >
        </>
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

const Interface = styled.View`
  display: flex; 
  flex-direction: row;
  width: 95%;
  height: 30%;
  justify-content: space-between; 
  align-items: center;
`

const TurnImageContainer = styled.View`
  border: 2px solid white;
  borderRadius: 50px;
  width: 55px;
`

const TurnImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`

// ============================================
//                ENEMIES STYLES
// ============================================

const EnemiesContainer = styled.View`
  display: flex; 
  flex-direction: row;
  width: 70%;
  height: 28%;
  justifyContent: space-around; 
  align-items: top;
`
const EnemyContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`

const EnemyImageContainer = styled.View`
  border: 2px solid white;
  borderRadius: 100px;
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
   padding-top: ${(prop => prop.isPair ? '0': '10%')};
  `
  
const AcolyteImageContainer = styled.View`
  border: 2px solid white;
  borderRadius: 100px;

`

const AcolyteImage = styled.Image`
  height: 35px;
  width: 35px;
  border-radius: 100px;
`


const TurnContainer = styled.View`
  width: 15%;
`

export default BattleField