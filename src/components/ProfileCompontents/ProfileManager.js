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

const ProfileManager = () => {
  
  const { globalState } = useContext(Context);
  const [fightOn, setFightOn] = useState(false)
  const [showAllUsersReadyModal, setShowAllUsersReadyModal] = useState(false);

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
          {!globalState.user.isReady ? (
            <>
              <Profile showAllUsersReadyModal={showAllUsersReadyModal} /> 
              {fightOn && <FightButtons />}  
              <ReadyButton /> 
            </>
          ) : (
            <ReadyModal showAllUsersReadyModal={showAllUsersReadyModal} />
          )}
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
