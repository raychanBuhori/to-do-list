const moment = require('moment');

const createDate = date => {
  return moment(date).format('DD MMMM YYYY, hh:mm');
}

const addDate = date => {
  return moment(date).format('YYYY-MM-DD HH:mm');
}

module.exports = {
  createDate,
  addDate
};