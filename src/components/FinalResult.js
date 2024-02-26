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
        <Text>
          GANADOR VILLANOS
        </Text>
      </VillainContainer>
    )}
      

    {globalState.battleEnd === "acolyteWin" && (
      <VillainContainer>
        <Text>
          GANADOR ACOLITOS
        </Text>
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

`

const ButtonText = styled.Text`

`

export default FinalResults