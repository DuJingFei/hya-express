const { exec , escape } = require('../db/mysql')

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

const getList = (name, keyword) => {
    let sql = `select * from t_products where 1=1 `
    if(name) {
        sql += `and name='${name}' `
    }
    if(keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    const title = blogData.title;
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();

    const sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${createTime}', '${author}')`

    return exec(sql).then(entity => {
        return {
            id: entity.insertId 
        }
    })
}

const updateBlog = (id, blogData = {}) => {
  // id 为更新博客的id
  const title = blogData.title;
  const content = blogData.content;

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  return exec(sql).then(updateData => {
      if(updateData.affectedRows > 0) {
          return true
      }
      return false
  })
}

const deleteBlog = (id, author) => {
    // id 为更新博客的id
    const sql = `delete from blogs where id='${id}' and author='${author}'`;
    return exec(sql).then(delData => {
       if(delData.affectedRows > 0) {
           return true
       }
       return false
    })
}

const getBannerList = () => {
  const sql = `select * from t_banners`
  return exec(sql).then(res => {
    return res
  }).catch(err => {
      console.log(1)
  })
}  


const newBanner = (bannerData = {}) => {
    const name = escape(bannerData.name) || '';
    const description = escape(bannerData.description|| '');
    const url = escape(bannerData.url || '');
    const path = escape(bannerData.path);
    const sort =escape(bannerData.sort || '');
    const createDate = dateSimpleVersion(bannerData.createDate);
    const updateDate = dateSimpleVersion(Date.now());

    const sql = `insert into t_banners (name, sort, description, path, url,  createDate, updateDate) values (${name}, ${sort}, ${description}, ${path}, ${url}, '${createDate}', '${updateDate}')`

    return exec(sql).then(entity => {
        return {
          id: entity.insertId 
        }
    })
}

const updateBanner = (bannerData = {}) => {
  const id = bannerData.id
  const name = escape(bannerData.name);
  const description = escape(bannerData.description || '');
  const url = escape(bannerData.url || '');
  const path = escape(bannerData.path);
  const sort = escape(bannerData.sort || '');
  const createDate = dateSimpleVersion(bannerData.createDate);
  const updateDate = dateSimpleVersion(Date.now()); // 获取的是时间戳 

  const sql = `update t_banners set name=${name}, sort=${sort}, description=${description}, path=${path}, url=${url}, createDate='${createDate}', updateDate='${updateDate}' where id=${id}`;
  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0 ? true : false;
  })
}

const getBanner = (id) => {
   const sql = `select * from t_banners where id = ${id}`
   console.log(sql)
   return exec(sql).then(rows => {
     return rows[0]
   })
}

const deleteBanner = (id, author) => {
    // id 为更新博客的id
    const sql = `delete from t_banners where id=${id}`;
    return exec(sql).then(delData => {
       if(delData.affectedRows > 0) {
           return true
       }
       return false
    })
}

module.exports = {
    getList,
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog,
    getBannerList,
    newBanner,
    getBanner,
    updateBanner,
    deleteBanner
}