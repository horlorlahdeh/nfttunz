import axios from 'axios';

/** base url to make request to the BE end point */

const instance = axios.create({
	baseURL: 'https://api.nfttunz.io/'
});

export default instance;





// const API = $axios.create({
//     baseURL: $config.API_BASE_URL,
//     withCredentials: true
//   })