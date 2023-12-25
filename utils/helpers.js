const { DateTime } = require('luxon');

module.exports = {
    // the helper method 'format_time' will take in a timestamp and return a string with only the time
    format_time: (date) => {
      // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
      return date.toLocaleTimeString();
    },
    loop: (n, options) => {
      let ret = '';
      for (let i = 0; i < n; i++) {
        ret += options.fn(i);
      }
      return ret;
    },
    returnFormatDate: (timestamp) => {
      if (timestamp === null || timestamp === undefined) {
        return 'Sometime';
      }

      return DateTime.fromMillis(timestamp).toFormat('MM-dd-yyyy hh:mma');
    
      // const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
    
      // if (typeof timestampNumber === 'number' && !isNaN(timestampNumber)) {
      //   const date = new Date(timestampNumber);
      //   return format(date, 'MM-dd-yyyy');
      // } else {
      //   // Handle the case where timestamp is not a valid number
      //   return 'A long time ago in a galaxy far far away....';
      // }
    },
    eq: function (arg1, arg2, options) {
      if (arg1 === arg2) return true;
      return false;
    }
  };
  