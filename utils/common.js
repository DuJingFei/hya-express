const { loginValid } = require('../controller/user');

const dateSimpleVersion = function(date , symbal = '-') {
    if(typeof(date) == 'string') date = date.replace(/-/g, '/').replace('T',' ').substring(0,date.indexOf('.') == -1? date.length:date.indexOf('.'))
    date = new Date(date);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    let seconds = date.getSeconds();
    
    month = (month >= 1 && month <= 9) ? `0${month}`:month;
    day = (day >= 0 && day <= 9) ? `0${day}`:day;
    hour = (hour >= 0 && hour <= 9) ? `0${hour}`:hour;
    min = (min >= 0 && min <= 9) ? `0${min}`:min;

    return `${date.getFullYear()}-${month}-${day} ${hour}:${min}:${seconds}` 
}

const validLogin = (req) => {
  return new Promise((resolve, reject) => {
    if (req.signedCookies && req.signedCookies.usertoken) {
      loginValid(req.signeCookie.usertoken).then(result => {
        if (result) {
          resolve('success');
        }
        else {
          reject('err');
        }
      })
    }
    else {
     // reject('err')
    } 
  }).catch(err => {
    
  })
}

module.exports = {
  dateSimpleVersion,
  validLogin
}