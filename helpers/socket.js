const { io } = require("socket.io-client");
import { SOCKET_URL } from "../config";

const socket = io(SOCKET_URL);
export default socket;