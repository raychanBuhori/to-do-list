const axios = require('axios');

const movieDbAPI = axios.create({
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

module.exports = movieDbAPI;