import React, { useContext , useEffect} from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ProfileAngelo = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);
  
  return (
    <> 
        <ProfileContainer>
          <Image source={require('../../../assets/angelo.jpg' )} style={styles.image} />
          <Image source={require('../../../assets/profileFrame.png')} style={styles.image2} />
          <ProfileText>ANGELO DI MORTIS</ProfileText>
          
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
        </ProfileContainer> 
        
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '45%',
    height: '45%',
    objectFit: 'contain',
  },
  image2: {
    position: 'absolute',
    width: '90%',
    height: '45%',
    objectFit: 'contain',
    zIndex: 2,
  },
  progressBar: {
    width: '85%',
  }
});

const ProfileText = styled.Text`
 color: white;
 font-size: 22px;
 text-align: center;
 font-family: 'Breathe Fire IV';
 letter-spacing: 4px;
`

const ProfileContainer = styled.View`
  align-items: center;
  width: 120%;
  display: flex;
  flex: 1;
`  

const StatsContainer = styled.View`
  top: 10%;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const StatContainerRow = styled.View`
  display: flex;
  flex-direction: row;
  width:80%;
  margin-bottom: 5%;
`
const StatContainerblock = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`
export default ProfileAngelo;