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
import SickModal from '../SickModal';

const ProfileManager = () => {
  const { globalState, globalStateHandler } = useContext(Context);
  const [openEnemyList, setOpenEnemyList] = useState(false);
  const [showAllUsersReadyModal, setShowAllUsersReadyModal] = useState(false);
  const [isSick, setIsSick] = useState(false);


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

  useEffect(() => {
    // setIsSick(false);
    Object.keys(globalState.user.diseases).forEach((disease) => {
      if(globalState.user.diseases[disease] === true){
        // setIsSick(true);

        //change turn
        if (globalState.user._id === globalState.currentTurn){
          console.log("current turn *******************************s")
          let index;
          for(let i = 0; i < globalState.initiative.length; i++){
  
            if(globalState.initiative[i] === globalState.currentTurn){
              
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

          setTimeout(() => {  
            socket.emit("change_turn", dataToSend)
          }, 4000);
          globalStateHandler({turnCounter: globalState.turnCounter + 1})
  
        }

      }
    });
    
  }, [globalState.user, globalState.currentTurn])

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

            {((!globalState.user.diseases["rotting_plague"]) && (!globalState.user.diseases["epic_weakness"]) && (!globalState.user.diseases["marrow_apocalypse"]) && (!globalState.user.diseases["ethazium"]))&& (
              <>
              <Profile />
              <FightButtons setOpenEnemyList={setOpenEnemyList} />
              {(openEnemyList && globalState.userList.length > 0) && (
                <UserListModal setOpenEnemyList={setOpenEnemyList} />
                )}
                </>
            )}
            {((globalState.user.diseases["rotting_plague"]) || (globalState.user.diseases["epic_weakness"]) || (globalState.user.diseases["marrow_apocalypse"]) || (globalState.user.diseases["ethazium"]))&& (

              <>
                <SickModal />
              </>
            )}
            </>
            
              )}
          {globalState.user.isReady && !globalState.battleStart && (
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
