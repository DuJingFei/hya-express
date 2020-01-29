const { exec , escape } = require('../db/mysql')

const getTypes = (classfy) => {
  let sql = `select * from t_types where classfy = ${classfy} order by orderIndex desc`;
  return exec(sql).then(rows => {
    return rows;
  })
}

const newType = (typeData = {}) => {
  const name = escape(typeData.name);
  const parentId = escape(typeData.parentId);
  const content = escape(typeData.content);
  const classfy = escape(typeData.classfy);
  const orderIndex = escape(typeData.orderIndex);

  const sql = `insert into t_types (name,parentId,content,classfy,orderIndex) values (${name},${parentId},${content},${classfy},${orderIndex})`;

  return exec(sql).then(entity => {
    return {
      id: entity.insertId
    }
  })
}

const getTypeItem = (id) => {
  if (!id) return
  const sql = `select * from t_types where Id=${id}`
  return exec(sql).then( rows => {
    return rows[0]
  })
}

const updateType = (typeData = {}) => {
  const name = escape(typeData.name);
  const parentId = escape(typeData.parentId);
  const content = escape(typeData.content);
  const classfy = escape(typeData.classfy);
  const orderIndex = escape(typeData.orderIndex);

  const sql = `update t_types set name=${name},parentId=${parentId},content=${content},classfy=${classfy},orderIndex=${orderIndex}`

  return exec(sql).then(entity => {
    return entity.affectedRows > 0 ? true : false
  })
}

const deleteType = (id) => {
  if (!id) return
  const sql = `delete from t_types where id=${id}`;
  return exec(sql).then(delData => {
    return delData.affectedRows > 0 ? true : false
  })
}

module.exports = {
  getTypes,
  newType,
  updateType,
  deleteType,
  getTypeItem
}