import React, { useContext , useState} from 'react';
import styled from 'styled-components/native';
import { ImageBackground, StyleSheet} from 'react-native';
import { Context } from '../helpers/Context';

const DeadModal = () => {
   
    const { globalState, globalStateHandler } = useContext(Context);

      
        return (
          <MainContainer >
            <ImageBackground source={require("../../assets/cruz.jpg")} style={styles.imageBackground}>
              <Text>YOU ARE DEAD</Text>
            </ImageBackground>
          </MainContainer>
        );
      
    }
const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  }
});

const Text = styled.Text`
 color: white;
 font-size: 30px;
 text-align: center;
 top: 60%;
 width: 50%;
 left: 25%;
 font-family: 'Breathe Fire IV';
 font-size: 40px;
 letter-spacing: 4px;
`
const MainContainer = styled.View`
  width: 110%;
  height: 110%; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`

export default DeadModal;