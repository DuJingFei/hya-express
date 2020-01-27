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

const newProduct = (data = {}) => {
    const name = escape(data.name) || '';
    const model = escape(data.model|| '');
    const type = escape(data.type || '');
    const image = escape(data.image || '');
    const content =escape(xss(data.content));
    const createtime = dateSimpleVersion(Date.now());
    const updatetime = dateSimpleVersion(Date.now());

    let sql = `insert into t_products (name, model, type, image, content, createtime, updatetime) values (${name}, ${model}, ${type}, ${image}, ${content}, '${createtime}', '${updatetime}')`

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
  const updatetime = dateSimpleVersion(Date.now());

  const sql = `update t_products set name=${name}, model=${model}, type=${type}, image=${image}, content=${content}, updatetime='${updatetime}' where id=${id}`;
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


module.exports = {
    getList,
    newProduct,
    updateProduct,
    getProduct
}