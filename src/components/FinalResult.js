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
        <Text> </Text>
      </VillainContainer>
    )}
      

    {globalState.battleEnd === "acolyteWin" && (
      <VillainContainer>
        <EpicPicture source={require('../../assets/VictoryImage.png')} />
        <Text>GANADOR ACOLITOS</Text>
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
  display: flex;
  flex: 1;
`

const EpicPicture = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ButtonText = styled.Text`

`

export default FinalResults