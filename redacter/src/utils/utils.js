import axios from 'axios';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const myenv = dotenv.config();
dotenvExpand(myenv);

const port = 8000;

console.log(`Running on port: ${port}`);

const replaceNamesAPI = axios.create();

export default replaceNamesAPI;
