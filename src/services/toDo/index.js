const axiosAPI = require('utils/axiosAPI');

const getToDoList = () => new Promise(async (resolve, reject) => {
  await axiosAPI({
    method: 'GET',
    url: 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'
  }).then(resp => {
    const { data } = resp;
    return resolve(data);
  }).catch(err => {
    return reject(err);
  })
})

module.exports = {
  getToDoList
};