import { useContext, useEffect, useState } from 'react';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';

function SocketListener(props) {
	// console.log(props)
	if (props !== null) {
		const currentSocketEvent = props.props;
		const [currentEvent, setEvent] = useState(currentSocketEvent);
		const { globalState, globalStateHandler } = useContext(Context);

		useEffect(() => {
			setEvent(currentSocketEvent);
		}, [currentSocketEvent]);

		useEffect(() => {
			const handler = handlers[currentEvent.event];
			handler(currentEvent.value);
		}, [currentEvent]);

		const handleUserList = (data) => {
			globalStateHandler({ userList: data });

			data.forEach((userFromList) => {
				if (userFromList.email === globalState.user.email) {
					globalStateHandler({ user: userFromList });

				}
			});
		}

		const handleTest = (data) => {
			// console.log("*********************SOCKET TEST ON HANDLER************************")
			// console.log(data)
		}

		const handleNewUser = (data) => {
			// console.log(`Conexión de socket: ${data}`)
		}

		const handleBattleResponse = (data) => {
			console.log("START BATTLE");
			globalStateHandler({
				battleStart: data.battleStart,
				initiative: data.initiative,
				currentTurn: data.initiative[0],
			  });
		}

		const handleChangeTurn = (data) => {
			
			globalStateHandler({
				currentTurn: `${globalState.initiative[data.index]}`,
			});

			// console.log(globalState.initiative[data.index])
			
			let turnNumber = 0

			globalState.userList.forEach((el, index) => {
				if(globalState.initiative[data.index] === el._id)
					turnNumber = index;

			})
			// console.log("//////////////// PRINCIPIO USERS EN COMBATE /////////////");
			// console.log("TURNO NUMERO ");
			// console.log(turnNumber);

			globalState.userList.forEach((el) => {
				for(let i = 0; i < globalState.initiative.length; i++){
					if(globalState.initiative[i]._id === el._id){

						// console.log("TURNO DE")
						// console.log(el.name)

					}
					
				}
			})	

			// console.log("//////////////// FIN USERS EN COMBATE /////////////")

			const userIndex = globalState.userList.findIndex(user => user._id.toString() === globalState.userList[data.index]);
			// console.log("//////// USER INDEX //////")
			// console.log(turnNumber)
			// console.log("///////////////////////////")
			// console.log("//////////// Current turn user ////////")
			// console.log(globalState.userList[turnNumber].name)
			
			if(globalState.userList[turnNumber].rol === "knight"){
				
				
				let acolyteArray = [];
				for(let i = 0; i< globalState.userList.length; i++){

					for(let j = 0; j< globalState.initiative.length; j++){

						if(globalState.initiative[j] === globalState.userList[i]._id && globalState.userList[i].rol === "acolyte"){
							acolyteArray.push(globalState.userList[i]);
						}
					}
				}

				const randomAcolyte = Math.floor(Math.random() * acolyteArray.length);  

				const dataToSend = {
					id: globalState.userList[turnNumber]._id,
					targId: acolyteArray[randomAcolyte]._id,
					stat: "strength"
				}
				socket.emit('attack_try', dataToSend);
			}
		}

		const handleAttack = (data) => {


			let turnNumber = 0
			

			for (let i=0; i< globalState.userList; i++){

				if(globalState.userList[i]._id === globalState.currentTurn){
					turnNumber = i;
				}
			}
			console.log("//////////////// PRINCIPIO USERS EN COMBATE /////////////");
			console.log("TURNO NUMERO ");
			console.log(turnNumber);

			globalState.userList.forEach((el) => {
				for(let i = 0; i < globalState.initiative.length; i++){
					if(globalState.initiative[i]._id === el._id){

						console.log("TURNO DE")
						console.log(el.name)

					}
			}})

			globalStateHandler({userList: data.userList});   

			data.userList.forEach((userFromList) => {
				if(userFromList.email === globalState.user.email){
					globalStateHandler({user: userFromList});

				}
			}); 

			//if target (data.targId) y origen (data.id)

			if(globalState.user.rol === "mortimer"){

				let index;
				for(let i = 0; i < globalState.initiative.length; i++){

					if(globalState.initiative[i] === globalState.currentTurn){

						index = i;
					}
				}

				const dataToSend = {
					index: index,
					length: globalState.initiative.length
				}
				socket.emit("change_turn", dataToSend);
			}
		}

		const handleTry = (data) => {}

		const handlers = {
			test_broadcast_response: handleTest,
			new_user: handleNewUser,
			user_list: handleUserList,
			start_battle_response: handleBattleResponse,
			switch_turn: handleChangeTurn,
			attack: handleAttack,
			attack_try: handleTry,
		}
	}
	return null;
}

export default SocketListener