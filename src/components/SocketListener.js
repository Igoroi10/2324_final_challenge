import { useContext, useEffect, useState } from 'react';
import { Context } from '../helpers/Context';

function SocketListener(props) {
	if(props !== null){
		const currentSocketEvent = props.props;
		const [currentEvent, setEvent] = useState(currentSocketEvent);
		const {globalState, handleGlobalState} = useContext(Context);

		useEffect(() => { 
			setEvent(currentSocketEvent);  
		}, [currentSocketEvent]);
		
		useEffect(() => {
			const handler = handlers[currentEvent.event];
			handler(currentEvent.value);          
		}, [currentEvent]);

		const handleUserList = (data) => {
			handleGlobalState({userList: data});   

			data.forEach((userFromList) => {
				if(userFromList.email === globalState.user.email){
					handleGlobalState({user: userFromList});

				}
			}); 
		}
        const handleTest = (data) => {
            console.log("*********************SOCKET TEST ON HANDLER************************")
            console.log(data)
        }
		
		const handleNewUser = (data) => {
			console.log(`Conexión de socket: ${data}` )
		}
		const handlers = {
			userList: handleUserList,
            test_broadcast_response: handleTest,
			new_user: handleNewUser,
		}
	}
	return null;
}

export default SocketListener