import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../helpers/Context';
import { Image, StyleSheet, Text, View} from 'react-native';



const FinalResults = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  return (

   <MainContainer>
    {globalState.battleEnd === "villainsWin" && (
      <VillainContainer>
        <EpicPicture source={require('../../assets/DefeatImage.png')} />
        <BlackFilter>
        <TextResult> OH NO ZARATE AND ANGELO WON THIS TIME</TextResult>
        </BlackFilter>
      </VillainContainer>
    )}
      

    {globalState.battleEnd === "acolyteWin" && (
      <VillainContainer>
        <EpicPicture source={require('../../assets/VictoryImage.png')} />
        <BlackFilter>
        <TextResult> CONGRATULATIONS YOU WON THE BATTLE! </TextResult>
        <TextResult>AND DEFEATED THE VILLAINS ZARATE AND ANGELO</TextResult>
        </BlackFilter>
    </VillainContainer>
    )}

   </MainContainer>
  )
}



const MainContainer = styled.View`
  display: flex; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const VillainContainer = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const BlackFilter = styled.View`
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0, 0.4);
  padding: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const EpicPicture = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
`

const TextResult = styled.Text`
  font-size: 40px;
  letter-spacing: 4px;
  font-family: 'Breathe Fire IV';
  color: white;
  text-align: center;
  margin-bottom: 3%;
  text-shadow-color: grey;
  text-shadow-offset: 1px 0px; 
  text-shadow-radius: 3px;
`

export default FinalResults