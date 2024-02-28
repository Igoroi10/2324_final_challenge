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
import ProfileAngelo from './ProfileAngelo';
import SickModal from '../SickModal';
import DeadModal from '../DeadModal';

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
    console.log("USEEFFECT CURRENTURN")

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


      console.log(`Turno de ${globalState.userList[turnNumber].name}`);
      
      if(globalState.userList[turnNumber].rol === "mortimer"){

        const initiativeUsersProfile = [];
        globalState.initiative.forEach((id)=>{
  
          globalState.userList.forEach((userObject)=>{
    
            if(userObject._id === id){
    
              initiativeUsersProfile.push(userObject);
            }
          })
        })

      const acolytes = initiativeUsersProfile.filter((userObject)=>{

          if(userObject.isAlive && userObject.rol === "acolyte" && (userObject.characterStats.hp < userObject.characterMaxStats.maxHp ||checkDisseases(userObject))){
            return userObject;
          }
        });

        if(acolytes.length === 0){

          let index;
          for (let i = 0; i < globalState.initiative.length; i++) {

            if (globalState.initiative[i] === globalState.currentTurn) {

              index = i;
            }
          }

          const dataToSend = {
            index: index,
            length: globalState.initiative.length,
            initiative: globalState.initiative
          }
          socket.emit("change_turn", dataToSend);
        }
      }

      if(!globalState.userList[turnNumber].isAlive || globalState.userList[turnNumber].diseases.ethazium){

        let index;
				for (let i = 0; i < globalState.initiative.length; i++) {

					if (globalState.initiative[i] === globalState.currentTurn) {

						index = i;
					}
				}

				const dataToSend = {
					index: index,
					length: globalState.initiative.length,
					initiative: globalState.initiative
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
    
  }, [globalState.currentMessage]);

  
  const checkDisseases = (user) => {

    if(user.diseases.rotting_plague === true || user.diseases.epic_weakness === true  || user.diseases.marrow_apocalypse === true || user.diseases.ethazium === true ){
      return true
    } else {
      return false;
    }
  } 



  return (
    <MainContainer>
    {globalState.user.rol === "villain" ? (
      <>
        {globalState.user.isAlive && (
          <>
            <ProfileVillano />
            <VillanoButtons />
            {(openEnemyList && globalState.userList.length > 0) && (
              <VillanoUserListModal setOpenEnemyList={setOpenEnemyList} />
            )}
          </>
        )}
        {!globalState.user.isAlive && (
          <DeadModal />
        )}
      </>
    ) : globalState.user.rol === "mortimer" ? (
      <MortimerProfile />
    ) : globalState.user.rol === "acolyte" || globalState.user.rol === "acolyteInterface" ? (
      <>
        {globalState.user.isAlive && (
          <>
            {!globalState.user.isReady && (
              <>
                <Profile />
                <ReadyButton />
              </>
            )}
          {globalState.battleStart && (
              <>
                <SickModal />
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
            {(globalState.user.isReady && !showAllUsersReadyModal && !globalState.battleStart && globalState.user.rol === "acolyte") && (
              <ReadyModal />
            )}
          </>
        )}
        {!globalState.user.isAlive && (
          <DeadModal />
        )}
      </>
    ) : globalState.user.rol === "guest" ? (
      <>
        {globalState.user.isAlive && (
          <>
            <ProfileAngelo />
            <ApplyEthazium setOpenEnemyList={setOpenEnemyList}/>
            {openEnemyList && (
              <UserListModal setOpenEnemyList={setOpenEnemyList} />
            )}
          </>
        )}
        {!globalState.user.isAlive && (
          <DeadModal />
        )}
      </>
    ) : null}
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
  background-color: #171717;
`
export default ProfileManager;
