const moment = require('moment');

const currentTime = moment.now();

// ##########################################################################
// DATE AND TIME FUNCTIONS
module.exports.getCurrentTimeStamp = () => Math.floor(currentTime / 1000);

module.exports.getCurrentDateTimeReadable = () =>
  moment(currentTime).format('YYYY-MM-DD HH:mm:ss');

module.exports.getTimeStamp = (date, HrsMins = '00:00') =>
  moment(`${date} ${HrsMins}`, 'YYYY-MM-DD HH:mm').unix();
