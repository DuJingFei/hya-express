const { exec , escape } = require('../db/mysql')
const xss = require('xss')

const { dateSimpleVersion } = require('../utils/common');

const newContact = (data = {}) => {
    const name = escape(data.name) || '';
    const country = escape(data.country|| '');
    const company = escape(data.company || '');
    const tel = escape(data.tel || '');
    const email = escape(data.email || '');
    const url = escape(data.url || '');
    const detail = escape(data.detail || '');
    const productmodel = escape(data.productmodel || '');
    const createtime = dateSimpleVersion(Date.now());

    let sql = `insert into t_contact (name, country, company, tel, email, url, detail, productmodel, createtime) values (${name}, ${country}, ${company}, ${tel}, ${email},  ${url}, ${detail},  ${productmodel}, '${createtime}')`;

    return exec(sql).then(entity => {
       return {
           id: entity.insertId
       }
    }) 
}

const geContactItem = (id) => {
  const sql = `select * from t_contact where id = ${id}`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const getContactList = (params) => {
    let sql = `select * from t_contact where 1=1 `;
    if (params && params.name) {
      sql += `and name='${name}' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

module.exports = {
  newContact,
  geContactItem,
  getContactList
}