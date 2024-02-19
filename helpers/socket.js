const { io } = require("socket.io-client");
import { URL } from "../config";

const socket = io(URL);
export default socket;