import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import { Image, StyleSheet } from 'react-native';

import Stats from './Stats';

const Profile = ({ }) => {

  const { globalState, globalStateHandler } = useContext(Context);

  return (

    <ProfileContainer>

      <Image source={{ uri: globalState.user.imgURL }} style={styles.image} />

      <ProfileText> {globalState.user.name}</ProfileText>

      < Stats />

    </ProfileContainer>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 200
  },
});

const ProfileText = styled.Text`
 color: white;
 font-size: 20px;
 text-align: center;
`

const ProfileContainer = styled.View`
  height: 50%;
  align-items: center;
  border: rgba(255,255,255, 0.6);
  width: 88%;
`


export default Profile