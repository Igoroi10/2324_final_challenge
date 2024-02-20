import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Image, StyleSheet, View , Text} from 'react-native';


const ReadyModal = ({ }) => {


  return (

    <View style={{  justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}> User ready</Text>
    </View>
  )
}




export default ReadyModal