import axios from 'axios'
const urlLink = 'http://localhost:3000'

export default axios.create({
    baseURL: `${urlLink}`,
  });

