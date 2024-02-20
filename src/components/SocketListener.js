import { useContext, useEffect, useState } from 'react';
import { Context } from '../helpers/Context';

function SocketListener(props) {
	console.log(props)
	if(props !== null){
		const currentSocketEvent = props.props;
		const [currentEvent, setEvent] = useState(currentSocketEvent);
		const {globalState, globalStateHandler} = useContext(Context);

		useEffect(() => { 
			setEvent(currentSocketEvent);  
		}, [currentSocketEvent]);
		
		useEffect(() => {
			const handler = handlers[currentEvent.event];
			handler(currentEvent.value);          
		}, [currentEvent]);

		const handleUserList = (data) => {
			globalStateHandler({userList: data});   

			data.forEach((userFromList) => {
				if(userFromList.email === globalState.user.email){
					globalStateHandler({user: userFromList});

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
            test_broadcast_response: handleTest,
			new_user: handleNewUser,
			user_list: handleUserList,
		}
	}
	return null;
}

export default SocketListener