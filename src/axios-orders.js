import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-63ff8.firebaseio.com'
});

export default instance;