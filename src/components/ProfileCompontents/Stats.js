import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';


const Stats = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  return (

    <StatsContainer>

      <ProfileText>HP: {globalState.user.characterStats.hp}</ProfileText>
      <Progress.Bar 
        color={'rgba(255, 255, 255, 1)'}
        style={styles.progressBar} 
        progress={globalState.user.characterStats.hp / globalState.user.characterMaxStats.maxHp} 
      />

      <ProfileText>agility: {globalState.user.characterStats.agility}</ProfileText>
      <Progress.Bar 
        color={'rgba(255, 255, 255, 1)'}
        style={styles.progressBar} 
        progress={globalState.user.characterStats.agility / globalState.user.characterMaxStats.maxAgility} 
      />

      <ProfileText>strength: {globalState.user.characterStats.strength}</ProfileText>
      <Progress.Bar 
        color={'rgba(255, 255, 255, 1)'}
        style={styles.progressBar} 
        progress={globalState.user.characterStats.strength / globalState.user.characterMaxStats.maxStrength} 
      />

      <ProfileText>intelligence: {globalState.user.characterStats.intelligence}</ProfileText>
      <Progress.Bar 
        color={'rgba(255, 255, 255, 1)'}
        style={styles.progressBar} 
        progress={globalState.user.characterStats.intelligence / globalState.user.characterMaxStats.maxIntelligence} 
      />

    </StatsContainer>

  )
}

const styles = StyleSheet.create({
  progressBar: {
    width: 200,
    color: 'red',
    marginBottom: 20,
  }
});

const StatsContainer = styled.View`
  top: 10%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: rgba(255, 0, 255, 0.6);
  width: 90%;
`

const ProfileText = styled.Text`
 color: white;
 font-size: 20px;
 text-align: center;
`





export default Stats