import axios from 'axios';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myenv = dotenv.config()
dotenvExpand(myenv)

const port = 5000

console.log(`Running on port: ${port}`)
const replaceNamesAPI = axios.create();

const testReq = async() => {
    const res = await replaceNamesAPI.post('replace', {
        text: 'Liam Power fell on the ground and Jayden Reynolds picked him up'
    });
    console.log(res);
};

export default replaceNamesAPI;