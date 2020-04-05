var express = require('express');
//var images = require('images');
var router = express.Router();



const { SuccessModel , ErrorModel } = require('../model/resModel');
const {  
  getServiceList,
  newService,
  getServiceItem,
  updateService,
  deleteService
} = require('../controller/service');

const { validLogin } = require('../utils/common')

// 获取service集
router.get('/service/list', function(req, res, next) {
  
//  validLogin(req).then(result => {
    return getServiceList().then(listData => {
      res.json(new SuccessModel(listData))
    }).catch(err => {
      
    })
//  })
});

// 获取指定service
router.get('/service/:id', function(req, res, next) {
  let id = req.params && req.params.id;
 // validLogin(req).then(result => {
    return getServiceItem(id).then(listData => {
      res.json(new SuccessModel(listData))
    }).catch(err => {
      
    })
 // })
});

// 新增service
router.post('/service/add', function(req, res, next) {
  let params = {name, description, type, path, sort , createDate, updateDate } = req.body;
  return newService(params).then(result => {
    res.json(new SuccessModel(result))
  })
})

// 更新service
router.post('/service/:id', function(req, res, next) {
    let params = {name, description, type, path, sort , createDate, updateDate } = req.body;
    return updateService(params).then(result => {
      res.json(new SuccessModel(result))
    })
})

router.delete('/service/:id', function(req, res, next) {
  let id = req.params && req.params.id
  return deleteService(id).then( data => {
    res.json(new SuccessModel(data))
  }) 
})
module.exports = router
