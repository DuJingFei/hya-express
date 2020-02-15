var express = require('express');
//var images = require('images');
var router = express.Router();



const { SuccessModel , ErrorModel } = require('../model/resModel');
const {  
  newContact,
  geContactItem,
  getContactList
} = require('../controller/contact');

const { validLogin } = require('../utils/common')

// 根据 classfy 获取
router.get('/contact/list', function(req, res, next) {

  validLogin(req).then(result => {
    return getContactList().then(listData => {
      res.json(new SuccessModel(listData))
    }).catch(err => {
      
    })
  })
});

// 根据 classfy 获取
router.get('/contact/:id', function(req, res, next) {
  let id = req.params && req.params.id
  validLogin(req).then(result => {
    return geContactItem(id).then(listData => {
      res.json(new SuccessModel(listData))
    }).catch(err => {
      
    })
  })
});

// 新增type
router.post('/contact/add', function(req, res, next) {
  let params = {name, parentId , content , classfy, orderIndex} = req.body;
  return newContact(params).then(result => {
    res.json(new SuccessModel(result))
  })
})

module.exports = router
