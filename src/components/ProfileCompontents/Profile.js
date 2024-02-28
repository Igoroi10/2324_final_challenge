import React, { useContext , useEffect} from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';
import Stats from './Stats';

const Profile = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);
  
  useEffect(() => {
    //console.log(globalState.user.isAlive);
  }, [globalState]);
  
  return (
    <> 
        <ProfileContainer>
          <Image source={{ uri: globalState.user.imgURL }} style={styles.image} />
          <Image source={require('../../../assets/profileFrame.png')} style={styles.image2} />
          <ProfileText>{globalState.user.name}</ProfileText>
          <Stats />
        </ProfileContainer> 
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '65%',
    height: '45%',
    objectFit: 'contain',
  },
  image2: {
    position: 'absolute',
    width: '80%',
    height: '45%',
    objectFit: 'cover',
    zIndex: 2,
  },
});

const ProfileText = styled.Text`
 color: white;
 font-size: 25px;
 text-align: center;
 font-family: 'Breathe Fire IV';
 letter-spacing: 4px;
`

const ProfileContainer = styled.View`
  align-items: center;
  width: 120%;
  display: flex;
  flex: 1;
`
export default Profile