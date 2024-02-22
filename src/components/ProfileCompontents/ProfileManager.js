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
import socket from '../../../helpers/socket';

const ProfileManager = () => {
  const { globalState, globalStateHandler } = useContext(Context);
  const [openEnemyList, setOpenEnemyList] = useState(false);
  const [showAllUsersReadyModal, setShowAllUsersReadyModal] = useState(false);

  useEffect(() => {
    // console.log("ENEMY LIST:") 
    // console.log(openEnemyList);
  }, [openEnemyList]);

  useEffect(() => {
    if (globalState.userList && globalState.user.rol === "acolyte") {
      const readyUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isReady);
      const connectedUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isConnected);
      // console.log('conected', connectedUsers.length);
      // console.log('ready', readyUsers.length);
      if (readyUsers.length === connectedUsers.length && readyUsers.length !== 0) {
        setShowAllUsersReadyModal(true);
      } else {
        setShowAllUsersReadyModal(false);
      }
    }
  }, [globalState.userList, globalState.user.rol]);

  useEffect(() => {
    console.log("_____________________________")

    console.log("_____________________________")

    console.log("USEEFFECT CURRENTURN")
    console.log("_____________________________")
    console.log("_____________________________")


    if (globalState.currentTurn !== "" && globalState.user.rol === "mortimer" && (globalState.currentMessage === "" || globalState.turnCounter === 0)) {



      let user;

      globalState.userList.forEach((el) => {
        if (globalState.currentTurn === el._id)
          user = el;

      })

      let turnNumber;
      globalState.userList.forEach((el, index) => {

        if (el.name === user.name) {
          turnNumber = index
        }
      })


      console.log("_____________________________")
      console.log("TURNO DE ")
      console.log(globalState.userList[turnNumber].name);

      if (globalState.userList[turnNumber].rol === "knight") {
        let acolyteArray = [];
        for (let i = 0; i < globalState.userList.length; i++) {

          for (let j = 0; j < globalState.initiative.length; j++) {

            if (globalState.initiative[j] === globalState.userList[i]._id && globalState.userList[i].rol === "acolyte") {
              acolyteArray.push(globalState.userList[i]);
            }
          }
        }

        setTimeout(() => {
          const randomAcolyte = Math.floor(Math.random() * acolyteArray.length);
          const dataToSend = {
            id: globalState.userList[turnNumber]._id,
            targId: acolyteArray[randomAcolyte]._id,
            stat: "strength"
          }
          socket.emit('attack_try', dataToSend);
        }, 4000);
      }

    }

  }, [globalState.currentMessage, globalState.currentTurn])

  useEffect(() => {

    if(globalState.currentMessage !== ""){
      setTimeout(() => {
     
        globalStateHandler({ currentMessage: "" });
      }, 4000);
    }
    
  }, [globalState.currentMessage])


  return (
    <MainContainer>
      {globalState.user.rol === "mortimer" ?
        <MortimerProfile />
        :
        <>
          {!globalState.user.isReady && (
            <>
              <Profile />
              <ReadyButton />
            </>
          )}
          {globalState.battleStart && (
            <>
              <Profile />
              <FightButtons setOpenEnemyList={setOpenEnemyList} />
              {(openEnemyList && globalState.userList.length > 0) && (
                <UserListModal setOpenEnemyList={setOpenEnemyList} />
              )}
            </>
          )}

          {globalState.user.isReady && !globalState.battleStart && (<ReadyModal />)}

        </>
      }
      {showAllUsersReadyModal && !globalState.battleStart && <AllUsersReadyModal />}
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
