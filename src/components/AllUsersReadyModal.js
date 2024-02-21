import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, StyleSheet} from 'react-native';


const AllUsersReadyModal = () => {


  return (
    <MainContainer>
      <ImageBackground source={require("../../assets/wallpaper_login.jpeg")} style={styles.imageBackground}>
      
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
 color: white;
 font-size: 30px;
 text-align: center;
 top: 20%;
 width: 50%;
 left: 25%;
`
const MainContainer = styled.View`
  width: 110%;
  height: 110%; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: rgba(255, 255, 255, 0.6);
  background-color: black;
`

export default AllUsersReadyModal;