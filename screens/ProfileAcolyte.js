import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../src/helpers/Context';

// Imports de los componentes de User
import ReadyButton from '../src/components/ProfileCompontents/ReadyButton';
import FightButtons from '../src/components/ProfileCompontents/FightButtons';
import Profile from '../src/components/ProfileCompontents/Profile';
import ReadyModal from '../src/components/ReadyModal';

const ProfileAcolyte = ({ }) => {
  
  const { globalState, globalStateHandler } = useContext(Context);
  const [blockButtonSocket, setBlockButtonSocket] = useState(false)
  const [fightOn, setFightOn] = useState(false)

  return (
    <MainContainer>

      {!globalState.user.ready ? (
        <>
        <Profile />

        {fightOn && ( <FightButtons /> )}

        < ReadyButton /> 
        </>
      ): (
        <ReadyModal />
      )}

      
    </MainContainer>

  );
};


const MainContainer = styled.View`
  width: 100%;
  height: 100%; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: rgba(255, 255, 255, 0.6);
  background-color: black;
`


export default ProfileAcolyte;
