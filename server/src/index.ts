require('dotenv').config()
import express from 'express';
import path from 'path';
import { isDatabaseConnected, getDataFromDatabase } from './database';
// importing routes
import IndexRoutes from './routes';
import cors from 'cors';
import corsOptions from './configs/corsOptions';
// imports
const io = require('socket.io')(3001)

io.on ('connection', (socket: any) => {
   console.log(socket.id)
})
// Initializations
const app = express();

app.use(cors(corsOptions));

// Settings
app.set('port', process.env.PORT || 3300);


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', IndexRoutes)
app.get('/results', getDataFromDatabase)

// Statics
app.use(express.static(path.join(__dirname, 'public')));
// Starting server


app.listen(app.get('port'), async () => {
   const hasConexionWithDatabase = await isDatabaseConnected()
   console.log(`conectada ${hasConexionWithDatabase}`)
   console.log('app server on port', app.get('port'))
})

