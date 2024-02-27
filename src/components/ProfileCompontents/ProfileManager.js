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
import UserListModal from '../UserListModal';
import VillanoUserListModal from '../VillanoComponents/VillanoUserListModal';
import ProfileVillano from './ProfileVillano';
import VillanoButtons from '../VillanoComponents/ViillanoButtons';
import ApplyEthazium from './ApplyEthazium'
import socket from '../../../helpers/socket';
import SpecialAttackListModal from '../SpecialAttackListModal'

const ProfileManager = () => {
  const { globalState, globalStateHandler } = useContext(Context);
  const [openEnemyList, setOpenEnemyList] = useState(false);
  const [showAllUsersReadyModal, setShowAllUsersReadyModal] = useState(false);
  const [openSpecialEnemyList, setOpenSpecialEnemyList] = useState(false);

  useEffect(() => {
    // console.log("ENEMY LIST:") 
    // console.log(openEnemyList);
  }, [openEnemyList]);

  useEffect(() => {
    if (globalState.userList && globalState.user.rol === "acolyte") {
      const readyUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isReady && user.isConnected);
      const connectedUsers = globalState.userList.filter(user => user.rol === "acolyte" && user.isConnected);
      // console.log('conected', connectedUsers);
      // console.log('ready', readyUsers);
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

      if(!globalState.userList[turnNumber].isAlive){

        let index;
				for (let i = 0; i < globalState.initiative.length; i++) {

					if (globalState.initiative[i] === globalState.currentTurn) {

						index = i;
					}
				}

				const initiativeUsers = [];

				globalState.initiative.forEach((id) => {
					globalState.userList.forEach((user) => {

						if (id === user._id) {
							initiativeUsers.push(user);
						}
					})
				})


				const dataToSend = {
					index: index,
					length: globalState.initiative.length,
					initiativeUsers: initiativeUsers
				}
				socket.emit("change_turn", dataToSend);
      }

      if (globalState.userList[turnNumber].rol === "knight" && globalState.userList[turnNumber].isAlive) {
        let acolyteArray = [];
        for (let i = 0; i < globalState.userList.length; i++) {

          for (let j = 0; j < globalState.initiative.length; j++) {

            if (globalState.initiative[j] === globalState.userList[i]._id && globalState.userList[i].rol === "acolyte" && globalState.userList[i].isAlive) {
              acolyteArray.push(globalState.userList[i]);
            }
          }
        }

        if(acolyteArray.length !== 0){

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
      {globalState.user.rol === "villain" ? (
        <>
          <ProfileVillano />
          <VillanoButtons />
          {(openEnemyList && globalState.userList.length > 0) && (
            <VillanoUserListModal setOpenEnemyList={setOpenEnemyList} />
          )}
        </>
      ) : (
        <>

          {globalState.user.rol === "mortimer" && ( <MortimerProfile /> )}
        
          {globalState.user.rol !== "mortimer" && (
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
              <FightButtons setOpenEnemyList={setOpenEnemyList} setOpenSpecialEnemyList={setOpenSpecialEnemyList} />
              {openEnemyList && (
              <UserListModal setOpenEnemyList={setOpenEnemyList} />
              )}
              {openSpecialEnemyList && (
              <SpecialAttackListModal setOpenSpecialEnemyList={setOpenSpecialEnemyList} />
              )}
            </>
          )}
          {(globalState.user.isReady && !globalState.battleStart && globalState.user.rol === "acolyteInterface") && (
            <ReadyModal />
            )}
            </>
          )}
        </>
      )}
      {showAllUsersReadyModal && !globalState.battleStart && (
        <AllUsersReadyModal />
      )}
    </MainContainer>
  );
      }  

const MainContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #171717;
`
export default ProfileManager;
