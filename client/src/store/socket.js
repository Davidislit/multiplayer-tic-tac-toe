import io from "socket.io-client";

const socketIoURL = process.env.REACT_APP_API_URL;

export const socket = io(socketIoURL);


// export const socket = io("localhost:5000");

