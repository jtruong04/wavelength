import express from 'express';
import { roomManager } from './services';
import path from 'path';
const app = express();
app.use(express.json());

// // Test home
// app.get('/', (req, res) => {
//     res.send('Test!');
// });

// Game creation
app.post('/games', (req, res) => {
    res.status(200).send(roomManager.createRoom());
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

export default app;
