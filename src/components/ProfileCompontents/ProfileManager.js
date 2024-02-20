import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';

// Imports de los componentes de User
import ReadyButton from './ReadyButton';
import FightButtons from './FightButtons';
import Profile from './Profile';
import ReadyModal from '../ReadyModal';

const ProfileManager = () => {
  
  const { globalState } = useContext(Context);
  const [fightOn, setFightOn] = useState(false)

  return (
    <MainContainer>

      {globalState.user.rol === "mortimer" ? 

        <>
        {/* Mortimer Profile */}
        </>
        :
        <>
          {!globalState.user.ready ? (
          <>
          <Profile />
  
          {fightOn && ( <FightButtons /> )}
  
          < ReadyButton /> 
          </>
          ): (
            <ReadyModal />
          )}
        </>
      }
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


export default ProfileManager;
