import React, { useContext , useState} from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const ProfileVillano = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);
  globalState.user.isReady = true;
  
  return (
    <> 
        <ProfileContainer>
          <Image source={{ uri: globalState.user.imgURL }} style={styles.image} />
          <ProfileText>VILLANO ZARATE</ProfileText>
          
          <StatsContainer>
            <ProfileText>HP: {globalState.user.characterStats.hp}</ProfileText>
              <Progress.Bar 
              color={'rgba(255, 255, 255, 1)'}
              style={styles.progressBar} 
              progress={globalState.user.characterStats.hp / globalState.user.characterMaxStats.maxHp} 
              >
              </Progress.Bar>
            </StatsContainer>
        </ProfileContainer> 
        
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 200
  },
});

const ProfileText = styled.Text`
 color: white;
 font-size: 20px;
 text-align: center;
`

const ProfileContainer = styled.View`
  height: 45%;
  align-items: center;
  border: rgba(255,255,255, 0.6);
  width: 80%;

`
const StatsContainer = styled.View`
  top: 10%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border: rgba(255, 0, 255, 0.6);
  width: 80%;
  height: 30%;
`
export default ProfileVillano;