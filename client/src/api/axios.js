import axios from 'axios'
const urlLink = 'http://35.187.245.8/'

export default axios.create({
    baseURL: `${urlLink}`,
  });

