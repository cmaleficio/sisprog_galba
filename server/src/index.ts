require('dotenv').config()
import express from 'express';
import path from 'path';
import { isDatabaseConnected, getDataFromDatabase, getRealTimeData } from './database';
import { Server } from "socket.io";
const http = require('http');
const { Pool } = require('pg');

// importing routes
import IndexRoutes from './routes';
import cors from 'cors';
import corsOptions from './configs/corsOptions';

// imports

// Initialization
const app = express();

app.use(cors(corsOptions));

//Pool for DB connection

const pool = new Pool({
   user: process.env.POSTGRES_USER,
   host: process.env.POSTGRES_HOST,
   database: process.env.POSTGRES_DB,
   password: process.env.POSTGRES_PASSWORD,
   port: process.env.POSTGRES_PORT,
 });
 
const server = http.createServer(app);
const io = new Server(server);

// Pool Connect + query + actualizaciones

pool.connect();
pool.query(' LISTEN update_notification');
pool.on('notification', (msg: any) => {
   if (msg.channel === 'update_notifcation'){
      io.emit('t011_real_tag_update', JSON.parse(msg.payload))
   }
});

// Settings
app.set('port', process.env.PORT || 3300);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes)
app.get('/results', getDataFromDatabase)
app.get('/Charts', getRealTimeData)

// EndPoint for Client Connection W. websocket

app.get('/ws', (req: any, res: any)=>{
   res.sendFile(__dirname +'/index.html')
})

// Statics
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

// Starting server


app.listen(app.get('port'), async () => {
   const hasConexionWithDatabase = await isDatabaseConnected()
   console.log(`conectada ${hasConexionWithDatabase}`)
   console.log('app server on port', app.get('port'))
})

// Servidor HTTP

server.listen (3000,()=>{
   console.log(`servidor iniciado en el puerto 3000`)
})


