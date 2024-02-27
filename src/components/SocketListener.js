import { useContext, useEffect, useState } from 'react';
import { Context } from '../helpers/Context';
import socket from '../../helpers/socket';
import calculateIcon from '../helpers/calculateIcon';

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
				userList: data.usersToUpdate
			});

			data.usersToUpdate.forEach((user)=>{
				if(user._id === globalState.user._id){
					globalStateHandler({user:user});
				}
			})
		}

		const handleChangeTurn = (data) => {

			for (let i = 0; i < globalState.userList.length; i++) {

				if (globalState.userList[i]._id === globalState.initiative[data.index] && globalState.userList[i].isAlive ) {
					console.log("TURNO DE EN HANDLER CHANGE_TURN")
					console.log(globalState.userList[i].name)

				}
			}
			globalStateHandler({
				currentTurn: globalState.initiative[data.index],
			});


			let turnNumber = 0

			globalState.userList.forEach((el, index) => {
				if (globalState.initiative[data.index] === el._id)
					turnNumber = index;

			})

			globalStateHandler({ battleEnd: data.battleEnd })
		}

		const handleAttack = (data) => {
			globalState.userList.forEach(el => el._id === data.id && globalStateHandler({
				icon: { imgURL: calculateIcon(el) }, attacker: el, currentMessage: data.message
			}
			));

			globalState.userList.forEach((element) => {
				if (element._id === data.targId) {
					globalStateHandler({ defender: element })
				}
			})

			globalStateHandler({ userList: data.userList });

			data.userList.forEach((userFromList) => {
				if (userFromList.email === globalState.user.email) {
					globalStateHandler({ user: userFromList });

				}
			});

			if (globalState.user.rol === "mortimer") {

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
				globalStateHandler({ turnCounter: globalState.turnCounter + 1 })
			}
		}

		const handleTry = (data) => { }

		const handleDisease = (data) => {

			globalStateHandler({ userList: data.userList });

			data.userList.forEach((userFromList) => {
				if (userFromList.email === globalState.user.email) {
					globalStateHandler({ user: userFromList });

				}
			});

			globalState.userList.forEach((el) => {
				if (el.rol === data.user.rol) {
					const iconPic = calculateIcon(data.user)
					globalStateHandler({ icon: { imgURL: iconPic }, attacker: el });

					globalState.userList.forEach((element) => {
						if (element._id === data.id) {
							globalStateHandler({ defender: element })
							globalStateHandler({ currentMessage: data.message });

						}
					})
				}
			})

			if (globalState.user.rol === "mortimer") {

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
				globalStateHandler({ turnCounter: globalState.turnCounter + 1 })
			}
		}

		const handlers = {
			test_broadcast_response: handleTest,
			new_user: handleNewUser,
			user_list: handleUserList,
			start_battle_response: handleBattleResponse,
			switch_turn: handleChangeTurn,
			attack: handleAttack,
			attack_try: handleTry,
			specialAttack_Try: handleTry,
			specialAttack_response: handleAttack,
			disease_try: handleTry,
			disease: handleDisease,

		}
	}
	return null;
}

export default SocketListener