import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';

// Imports de los componentes de User
import ReadyButton from './ReadyButton';
import FightButtons from './FightButtons';
import Profile from './Profile';
import ReadyModal from '../ReadyModal';
import MortimerProfile from './MortimerProfile';
import UserListModal from '../UserListModal'

const ProfileManager = () => {
  
  const { globalState } = useContext(Context);
  const [fightOn, setFightOn] = useState(false);
  const [openEnemyList, setOpenEnemyList] = useState(false);

  useEffect(() => { 
    console.log("ENEMY LIST:")  
    console.log(openEnemyList);
  }, [openEnemyList]);
  

  return (
    <MainContainer>

      {globalState.user.rol === "mortimer" ? 

        <MortimerProfile/>
        :
        <>
          {!globalState.user.isReady ? (
          <>
          <Profile />
  
          {!fightOn && ( <FightButtons setOpenEnemyList = {setOpenEnemyList}/> )}
  
          < ReadyButton /> 
          {openEnemyList && globalState.userList.length > 0 && (
            <UserListModal setOpenEnemyList = {setOpenEnemyList} /> 
          )}

          </>
          ): (
            <>
            <ReadyModal />
            </>
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
