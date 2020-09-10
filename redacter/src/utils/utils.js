import axios from 'axios';

const replaceNamesAPI = axios.create({
    baseURL: 'http://localhost:5000/'
});

const testReq = async() => {
    const res = await replaceNamesAPI.post('replace', {
        text: 'Liam Power fell on the ground and Jayden Reynolds picked him up'
    });
    console.log(res);
};

export default replaceNamesAPI;