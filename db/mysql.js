const mysql = require('mysql');

const { MYSQL_CONF } = require('../conf/db')

const con = mysql.createConnection({
    host: '39.104.160.139',
    user: 'root',
    password: 'ABCabc123.',
    port: '3306',
    database: 'blog'
});

con.connect();

// 统一执行 sql 的函数
function exec(sql) {
   const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if(err) {
              return reject(err);
            }
           resolve(res);
        })  
   })
   return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}

// con.end();