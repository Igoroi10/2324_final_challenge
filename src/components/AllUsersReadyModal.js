import React from 'react';
import styled from 'styled-components/native';
import { ImageBackground, StyleSheet} from 'react-native';


const AllUsersReadyModal = () => {


  return (
    <ImageBackground source={require("../../assets/wallpaper_login.jpeg")} style={styles.imageBackground}>
    
          <Text >ALL USERS ARE READY FOR BATTLE</Text>
      
    </ImageBackground>
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

export default AllUsersReadyModal;