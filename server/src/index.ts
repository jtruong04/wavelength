import io from './io';
import app from './app';
import http from 'http';

const port = 5000;
const server = new http.Server(app);

server.listen(port, () => {
    console.log(`HTTP server is listening on ${port}`);
});

io(server);
