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

const getServiceList = () => {
  const sql = `select * from t_service`
  return exec(sql).then(res => {

    return res
  }).catch(err => {
      console.log(1)
  })
}  


const newService = (sourceData = {}) => {
    const name = escape(sourceData.name) || '';
    const description = escape(sourceData.description|| '');
    const type = escape(sourceData.type || 0);
    const path = escape(sourceData.path);
    const sort =escape(sourceData.sort || '');
    const createDate = dateSimpleVersion(sourceData.createDate);
    const updateDate = dateSimpleVersion(Date.now());

    const sql = `insert into t_service (name, sort, type, description, path,  createDate, updateDate) values (${name}, ${sort}, ${type}, ${description}, ${path}, '${createDate}', '${updateDate}')`
    
    console.log('begin：', sql)

    return exec(sql).then(entity => {
        return {
          id: entity.insertId 
        }
    })
}

const updateService = (sourceData = {}) => {
  const id = sourceData.id
  const name = escape(sourceData.name);
  const description = escape(sourceData.description || '');
  const type = escape(sourceData.type || '');
  const path = escape(sourceData.path);
  const sort = escape(sourceData.sort || '');
  const createDate = dateSimpleVersion(sourceData.createDate);
  const updateDate = dateSimpleVersion(Date.now()); // 获取的是时间戳 

  const sql = `update t_service set name=${name}, sort=${sort}, description=${description}, type=${type} , path=${path}, createDate='${createDate}', updateDate='${updateDate}' where id=${id}`;
  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0 ? true : false;
  })
}

const getServiceItem = (id) => {
   const sql = `select * from t_service where id = ${id}`
   console.log(sql)
   return exec(sql).then(rows => {
     return rows[0]
   })
}

const deleteService = (id, author) => {
    // id 为更新博客的id
    const sql = `delete from t_service where id=${id}`;
    return exec(sql).then(delData => {
       if(delData.affectedRows > 0) {
           return true
       }
       return false
    })
}

module.exports = { 
    getServiceList,
    newService,
    getServiceItem,
    updateService,
    deleteService
}