import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:3001/ws", { forceNew: true});
socket.on("messages", (data) => {
  render(data);
  console.log(data);
});


