require('dotenv').config()
import express from 'express';
import path from 'path';
import { isDatabaseConnected, getDataFromDatabase, getRealTimeData } from './database';
// importing routes
import IndexRoutes from './routes';
import cors from 'cors';
import corsOptions from './configs/corsOptions';

// imports

// Initialization
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
app.get('/Charts', getRealTimeData)

// Statics
app.use(express.static(path.join(__dirname, 'public')));
// Starting server


app.listen(app.get('port'), async () => {
   const hasConexionWithDatabase = await isDatabaseConnected()
   console.log(`conectada ${hasConexionWithDatabase}`)
   console.log('app server on port', app.get('port'))
})


