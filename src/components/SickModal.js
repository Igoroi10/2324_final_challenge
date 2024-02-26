import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Image, StyleSheet, View , Text, ImageBackground} from 'react-native';
import { Context } from '../helpers/Context';



const SickModal = ({ }) => {
  const { globalState, globalStateHandler } = useContext(Context);
  const [userDisease, setUserDisease] = useState([]);


  useEffect(() => {
    const filteredDiseases = Object.keys(globalState.user.diseases).filter((disease) => {
      if(globalState.user.diseases[disease] === true){
        return disease
      }
    });
    setUserDisease(filteredDiseases);
    
  }, [globalState.user])

  useEffect(() => {
    if(globalState.user._id === globalState.currentTurn){
      socket.emit("start_battle", dataToSend);
    }
  
  }, [globalState.currentTurn]);


  return (
    userDisease.length > 0  && (
      // <ImageBackground source={require("../../assets/wallpaper_login.jpeg")} style={styles.imageBackground}>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginLeft: '-40%', marginBottom: '7%'}}>Diseases:</Text>

          {userDisease.map((disease, index) => (
            <Text key={index} style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{disease}</Text>
          ))}
        </View>
      // </ImageBackground>

    )

  )
}


const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  }
});

export default SickModal