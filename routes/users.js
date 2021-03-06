var express = require('express');
var router = express.Router();
const { 
  getLogin
} = require('../controller/user');

const { SuccessModel , ErrorModel } = require('../model/resModel');

/* GET users listing. */
router.post('/login', function(req, res, next) {
   const { username , password } = req.body;
   return getLogin(username, password).then(result => {
     if (result) {
      //  res.setHeader('Set-Cookie', `username=${username};path=/;max-age=60000`);

        res.cookie("usertoken", password, {
          signed: true,
          maxAge: 1000000 * 3,
          path:'/',
          httpOnly: true

        });

       res.json(new SuccessModel(result))
     }
     else {
       res.json(new ErrorModel())
     }
    
   })
   res.json({
     errorCode: 0,
     data: {
       username,
       password
     }
   })
});



function loginCheck(req, res, next) {
  console.log('即将模拟登录成功');
  setTimeout(() => {
    next();
  }, 1000)
}

router.post('/loginCheck', loginCheck , function(req, res, next) {
  const { username , password } = req.body;
  console.log('模拟成功')
  res.json({
    errorCode: 0,
    data: {
      username,
      password
    }
  })
});

module.exports = router;
