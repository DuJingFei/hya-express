var express = require('express');
//var images = require('images');
var router = express.Router();



const { SuccessModel , ErrorModel } = require('../model/resModel');
const {  
  getTypes,
  newType,
  updateType,
  getTypeItem,
  deleteType
} = require('../controller/types');

// 根据 classfy 获取
router.get('/typelist', function(req, res, next) {
  if (!req.query || !req.query.classfy) {
    res.json(new ErrorModel())
    return
  } 
  return getTypes(req.query.classfy).then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 新增type
router.post('/type/add', function(req, res, next) {
  let params = {name, parentId , content , classfy, orderIndex} = req.body;
  return newType(params).then(result => {
    res.json(new SuccessModel(result))
  })
})

// 获取type item
router.get('/type/:id', function(req, res, next) {
  if (!req.params.id) return
  let id = req.params.id;
  return getTypeItem(id).then(result => {
    res.json(new SuccessModel(result))
  })
})

// 更新type
router.post('/type/:id', function(req, res, next) {
  let params = {Id, name, parentId , content , classfy, orderIndex} = req.body;
  return updateType(params).then(result => {
    res.json(new SuccessModel(result))
  })
})

// 删除type
router.delete('/type/:id', function(req, res, next) {
  let id = req.params && req.params.id;
  if (!id) return 
  return deleteType(id).then(result => {
    res.json(new SuccessModel(result))
  })
})

module.exports = router
