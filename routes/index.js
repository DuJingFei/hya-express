var express = require('express');
var ip = require('ip');
//var images = require('images');

var myip = ip.address();

var router = express.Router();
const multer = require('multer');
//const upload = multer({ dest: 'public/upload/' });
const uuidV1 = require('uuid/v1')
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/upload/') // 保存的路径，备注：需要自己创建
  },
  filename: function(req, file, cb) {
    const fileFormat = (file.originalname).split('.') // 取后缀
    cb(null, uuidV1() + '.' + fileFormat[fileFormat.length - 1])
  } 
})
var upload = multer({ storage: storage })
const { ipAddress } = require('../controller/const')
const {  
  getDetail, 
  newBlog, 
  updateBlog, 
  deleteBlog,
  getBannerList, 
  newBanner,
  updateBanner,
  getBanner,
  deleteBanner
} = require('../controller/blog');

const { 
  getList,
  newProduct,
  updateProduct,
  getProduct
} = require('../controller/product');

const { SuccessModel , ErrorModel } = require('../model/resModel');

/* product start */
router.get('/product/list', function(req, res, next) {
  let name = req.query.name || '';
  let keyword = req.query.keyword || '';
  let typeId = req.query && req.query.typeId != null ? req.query.typeId : '';
  let params = {
    name: name,
    keyword: keyword,
    typeId: typeId
  }
  return getList(params).then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 查询单个 banner
router.get('/product/:id', function(req, res, next) {
  let id = req.params && req.params.id
  return getProduct(id).then( data => {
    if (!data) {
      res.json(new ErrorModel('资源不存在'))
    }
    res.json(new SuccessModel(data))
  }).catch(err => {
   
  })
})

router.get('/test', function(req, res, next) {
  res.json('11')
})

router.post('/product/add', function(req, res, next) {
  let params = { name , model , type , content , specification , benefit } = req.body;
  return newProduct(params).then(listData => {
    res.json(new SuccessModel(listData))
  }).catch(err => {})
});

// 更新 product
router.post('/product/:id', function(req, res, next) {
  let params = { id , name , model , type , content, specification , benefit } = req.body;
  return updateProduct(params).then( data => {
    if (!data) {
      res.json(new ErrorModel('资源不存在'))
    }
    res.json(new SuccessModel('更新成功'));
  }).catch(err => {
   
  }) 
})
/* product end */


router.get('/test', function(req, res, next) {
  res.json({
    name: 'djf'
  })
});

router.post('/upload', upload.single('file'), function(req, res, next) {
  res.json(new SuccessModel({ 
    path: `http://${myip}:86/api/upload/${req.file.filename}`,
    message: '上传成功'
   }))
});

// 新增banner
router.post('/banner', function(req, res, next) {
  let params = { name , path , description , sort , url , createDate } = req.body;
   return newBanner(params).then(listData => {
     res.json(new SuccessModel('新建banner成功'));
   })
})

// 查询bannerList 
router.get('/bannerlist', function(req, res, next) {
  return getBannerList().then(result => {
    res.json(new SuccessModel(result))
  })
})

// 查询单个 banner
router.get('/banner/:id', function(req, res, next) {
  let id = req.params && req.params.id
  return getBanner(id).then( data => {
    if (!data) {
      res.json(new ErrorModel('资源不存在'))
    }
    res.json(new SuccessModel(data))
  }).catch(err => {
   
  })
})

// 更新 banner
router.post('/banner/:id', function(req, res, next) {
  
  let params = {id , name , path , description , sort , url , createDate } = req.body;

  return updateBanner(params).then( data => {
    if (!data) {
      res.json(new ErrorModel('资源不存在'))
    }
    res.json(new SuccessModel('更新成功'));
  }).catch(err => {
   
  }) 
})

router.delete('/banner/:id', function(req, res, next) {
  let id = req.params && req.params.id
  return deleteBanner(id).then( data => {
    res.json(new SuccessModel(data))
  }) 
})
module.exports = router;
