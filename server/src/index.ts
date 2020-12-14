import io from './io';
import app from './app';
import http from 'http';

import dotenv from 'dotenv';
dotenv.config();
// const hostname = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;
// const port = 5000;
const server = new http.Server(app);

server.listen(port, () => {
    console.log(`HTTP server is listening on ${port}`);
});

io(server);
