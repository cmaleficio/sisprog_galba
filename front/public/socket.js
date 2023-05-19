 
 // Reemplaza 'http://localhost:3300' con la dirección y el puerto de tu servidor
 const socket = io('http://localhost:3300');

let isConnected = false;

 socket.on('connect', () => {
   if (!isConnected) {
     console.log('Conectado al servidor:', socket.id);
     isConnected = true;
   } else {
     console.log('El usuario ya está conectado');
   }
 });
 
 socket.on('disconnect', () => {
   console.log('Desconectado del servidor');
   isConnected = false;
 });

// Controlador de eventos para recibir los datos en tiempo real
socket.on('t11update', (data) => {
    console.log('Evento de base de datos:', data);

// Aquí puedes actualizar la interfaz de usuario con los datos recibidos
  // Por ejemplo, puedes agregar los datos a una lista o tabla
  const noteList = document.getElementById('note-list');
  const newNote = document.createElement('li');
  newNote.textContent = data.note;
  noteList.appendChild(newNote);
});