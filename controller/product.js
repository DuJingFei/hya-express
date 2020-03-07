const { exec , escape } = require('../db/mysql')
const xss = require('xss')

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

const getList = (params) => {
    let sql = `select * from t_products where 1=1 `;
    if (params.name) {
      sql += `and name='${name}' `
    }
    if (params.keyword) {
      sql += `and title like '%${keyword}%' `
    }
    if (params.typeId) {
      sql += `and type='${params.typeId}' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

const newProduct = (data = {}) => {
    const name = escape(data.name) || '';
    const model = escape(data.model|| '');
    const type = escape(data.type || '');
    const image = escape(data.image || '');
    const content =escape(xss(data.content));
    const specification =escape(xss(data.specification));
    const benefit =escape(xss(data.benefit));
    const createtime = dateSimpleVersion(Date.now());
    const updatetime = dateSimpleVersion(Date.now());

    let sql = `insert into t_products (name, model, type, image, content, specification, benefit,createtime, updatetime) values (${name}, ${model}, ${type}, ${image}, ${content}, "${specification}", "${benefit}", '${createtime}', '${updatetime}')`

    return exec(sql).then(entity => {
       return {
           id: entity.insertId
       }
    }) 
}

const updateProduct = (data) => {
  const id = data.id
  const name = escape(data.name) || '';
  const model = escape(data.model|| '');
  const type = escape(data.type || '');
  const image = escape(data.image || '');
  const content =escape(xss(data.content));
  const specification =escape(xss(data.specification));
  const benefit =escape(xss(data.benefit));
  const updatetime = dateSimpleVersion(Date.now());

  const sql = `update t_products set name=${name}, model=${model}, type=${type}, image=${image}, content=${content}, specification=${specification}, benefit=${benefit}, updatetime='${updatetime}' where id=${id}`;
  return exec(sql).then(row => {
    return row.affectedRows > 0 ? true : false;
  })
}

const getProduct = (id) => {
  const sql = `select * from t_products where id = ${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const deleteProduct = (id, author) => {
  // id 为更新博客的id
  const sql = `delete from t_products where id=${id}`;
  return exec(sql).then(delData => {
     if(delData.affectedRows > 0) {
         return true
     }
     return false
  })
}

module.exports = {
    getList,
    newProduct,
    updateProduct,
    getProduct,
    deleteProduct
}