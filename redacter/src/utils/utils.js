import axios from 'axios';
const port = process.env.REACT_APP_HEROKU_PORT

console.log(`Running on port: ${port}`)
const replaceNamesAPI = axios.create({
    baseURL: `http://localhost:${port}/`
});

const testReq = async() => {
    const res = await replaceNamesAPI.post('replace', {
        text: 'Liam Power fell on the ground and Jayden Reynolds picked him up'
    });
    console.log(res);
};

export default replaceNamesAPI;