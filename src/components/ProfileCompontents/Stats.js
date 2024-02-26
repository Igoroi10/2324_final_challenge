import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';


const Stats = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  return (

    <StatsContainer>

    <StatContainerRow>
    <StatContainerblock>
      <ProfileText>HP: {globalState.user.characterStats.hp}</ProfileText>
      <Progress.Bar 
        color={'rgba(255, 0, 0, 1)'}
        style={styles.progressBar} 
        progress={globalState.user.characterStats.hp / globalState.user.characterMaxStats.maxHp} 
      />
      </StatContainerblock>

      <StatContainerblock>
        <ProfileText>agility: {globalState.user.characterStats.agility}</ProfileText>
        <Progress.Bar 
          color={'rgba(255, 255, 255, 1)'}
          style={styles.progressBar} 
          progress={globalState.user.characterStats.agility / globalState.user.characterMaxStats.maxAgility} 
        />
      </StatContainerblock>

    </StatContainerRow>
      
    <StatContainerRow>
      <StatContainerblock>
        <ProfileText>strength: {globalState.user.characterStats.strength}</ProfileText>
        <Progress.Bar 
          color={'rgba(255, 255, 255, 1)'}
          style={styles.progressBar} 
          progress={globalState.user.characterStats.strength / globalState.user.characterMaxStats.maxStrength} 
        />
      </StatContainerblock>
     
      <StatContainerblock>
        <ProfileText>intelligence: {globalState.user.characterStats.intelligence}</ProfileText>
        <Progress.Bar 
          color={'rgba(255, 255, 255, 1)'}
          style={styles.progressBar} 
          progress={globalState.user.characterStats.intelligence / globalState.user.characterMaxStats.maxIntelligence} 
        />
      </StatContainerblock>
    </StatContainerRow>

    </StatsContainer>

  )
}

const styles = StyleSheet.create({
  progressBar: {
    width: '88%',
  }
});

const StatsContainer = styled.View`
  top: 5%;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const StatContainerRow = styled.View`
  display: flex;
  flex-direction: row;
  width:80%;
  margin-bottom: 2%;
`
const StatContainerblock = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`

const ProfileText = styled.Text`
 color: white;
 font-size: 20px;
 text-align: center;
 font-family: 'Breathe Fire IV';
 letter-spacing: 4px;
`





export default Stats