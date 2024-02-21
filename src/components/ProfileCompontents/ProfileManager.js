import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Context } from '../../helpers/Context';
import AllUsersReadyModal from '../AllUsersReadyModal';

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
  const [showAllUsersReadyModal, setShowAllUsersReadyModal] = useState(false);

  useEffect(() => { 
    console.log("ENEMY LIST:")  
    console.log(openEnemyList);
  }, [openEnemyList]);
  

  useEffect(() => {
    if (globalState.userList && globalState.user.rol === "acolyte") {
      const readyUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isReady);
      const connectedUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isConnected);
      if (readyUsers.length === connectedUsers.length && readyUsers.length !== 0) {
        setShowAllUsersReadyModal(true);
      } else {
        setShowAllUsersReadyModal(false);
      }
    }
  }, [globalState.userList, globalState.user.rol]);

return (
    <MainContainer>
      {globalState.user.rol === "mortimer" ? 
        <MortimerProfile/>
        :
        <>
          {!globalState.user.isReady && (
            <>
              <Profile showAllUsersReadyModal={showAllUsersReadyModal} />
              <ReadyButton />
            </> 
          )}
  
          {globalState.battleStart && ( 
            <>
              <Profile showAllUsersReadyModal={showAllUsersReadyModal} />
              <FightButtons setOpenEnemyList = {setOpenEnemyList}/> 
              {(openEnemyList && globalState.userList.length > 0) && (
                <UserListModal setOpenEnemyList = {setOpenEnemyList} /> 
              )}
            </>
          )}

          {globalState.user.isReady && !globalState.battleStart && (<ReadyModal showAllUsersReadyModal={showAllUsersReadyModal} />)}

        </>
      }
      {showAllUsersReadyModal && <AllUsersReadyModal />}
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
