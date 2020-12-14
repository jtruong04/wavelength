import express from 'express';
import { roomManager } from './services';
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

export default app;
