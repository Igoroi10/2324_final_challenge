import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';


const BattleField = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  const [acolites, setAcolites] = useState(null);
  const [knights, setKnights] = useState(null);
  
  useEffect(() => {
    const acolites  = (globalState.userList.filter(user => user.rol === "acolyte" ));
    const knights   = globalState.userList.filter(user => user.rol === "knight");

    setAcolites(acolites);
    setKnights(knights);

    console.log("Acolites: ")
    console.log("**************************")
    console.log(acolites.length)
    console.log("**************************")

    console.log("knights: ")
    console.log("**************************")
    console.log(knights[0].imgURL)
    console.log("**************************")
  }, []);

  if(acolites === null || knights === null){
    return null;
  }

  return (
    <MainContainer>
      
      <AcolytesContainer>
      {
        acolites.map( acolite => 
          <AcolyteContainer key={acolite._id}>

            <AcolyteImageContainer>
              <AcolyteImage source={{ uri: acolite.imgURL }} />
            </AcolyteImageContainer>

            <Progress.Bar 
              color={'rgba(0, 0, 255, 1)'}
              style={styles.AcolyteProgressBar} 
              progress={globalState.user.characterStats.agility / globalState.user.characterMaxStats.maxAgility} 
            />

          </AcolyteContainer >
        )
      }
      </AcolytesContainer>

      <Interface>
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
              progress={globalState.user.characterStats.agility / globalState.user.characterMaxStats.maxAgility} 
            />
          </EnemyContainer >
        </>
        )}

      </EnemiesContainer>

    </MainContainer>

  )
}

const styles = StyleSheet.create({
  AcolyteProgressBar: {
    width: 50,
    height: 5,
    marginBottom: 20,
  },
  KnightProgressBar: {
    width: 100,
    height: 5,
    marginBottom: 20,
  }
});

const MainContainer = styled.View`
  display: flex;
  justify-content: center;
  flex: 1;
`

const Interface = styled.View`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 25%;
  justifyContent: center; 
  alignItems: center;
`

// ============================================
//                ENEMIES STYLES
// ============================================

const EnemiesContainer = styled.View`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 37%;
  justifyContent: space-around; 
  alignItems: center;
`
const EnemyContainer = styled.View`
  display: flex;
`

const EnemyImageContainer = styled.View`
  border: 2px solid white;
  borderRadius: 100px;
`

const EnemyImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 100px;
`

// ============================================
//                ACOLITES STYLES
// ============================================

const AcolytesContainer = styled.View`
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 37%;
  text: center;
  justifyContent: space-around; 
  alignItems: center;
`

const AcolyteContainer = styled.View`
  display: flex;
  width: 55px;
`

const AcolyteImageContainer = styled.View`
  border: 2px solid white;
  borderRadius: 100px;
`

const AcolyteImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 100px;
`


export default BattleField