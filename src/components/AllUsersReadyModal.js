import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, StyleSheet} from 'react-native';


const AllUsersReadyModal = () => {


  return (
    <MainContainer>
      <ImageBackground source={require("../../assets/Splash.png")} style={styles.imageBackground}>
      
            <Text >ALL USERS ARE READY FOR BATTLE</Text>
        
      </ImageBackground>
    </MainContainer>
  )
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  }
});

const Text = styled.Text`
 color: black;
 text-align: center;
 top: 10%;
 width: 60%;
 left: 20%;
 font-family: 'Breathe Fire IV';
 font-size: 37px;
 fontWeight: bold;
 letter-spacing: 4px;
 text-shadow-color: white;
 text-shadow-offset: 3px 0px;
 text-shadow-radius: 10px; 
`
const MainContainer = styled.View`
  width: 110%;
  height: 110%; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: black;
`

export default AllUsersReadyModal;