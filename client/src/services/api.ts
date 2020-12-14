// Libraries
import axios from 'axios';
// Types
import { RoomID } from 'types';

const api = {
    getRoomID: async (): Promise<RoomID> => {
        const res = await axios.post('/games');
        return res.data;
    },
};

export default api;
