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
        console.log(disease)
        console.log(globalState.user.diseases)
        return disease
      }
    });
    setUserDisease(filteredDiseases);
    
  }, [globalState])



  return (
    <ModalContainer  transparent={true} visible={globalState.user.diseases.ethazium}>
      <ContentContainer>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop:'0%'}}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: '0%' }}>You have been cursed with ethazium</Text>
            </View>
      </ContentContainer>
    </ModalContainer>
    

  )
}

const ModalContainer = styled.Modal`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.View`
  top: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;


const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  }
});

export default SickModal