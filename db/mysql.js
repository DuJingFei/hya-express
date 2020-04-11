const mysql = require('mysql');

const { MYSQL_CONF } = require('../conf/db')

var logger = require('morgan');

/*
const con = mysql.createConnection({
  //  host: '39.104.160.139',
    host: 'localhost',
    user: 'root',
  //  password: 'ABCabc123.',
    port: '3306',
    database: 'blog'
});
*/

const mysqlConf = {
 // host: '39.104.160.139',
  host: 'localhost',
  user: 'root',
 // password: 'ABCabc123.',
  port: '3306',
  database: 'blog'
}

// 用于保存数据连接实例
var con = null;
var pingInterval;

// 如果数据连接出错，则重新连接
function handleError(err) {
  logger.info(err.stack || err);
  connect();
}

function connect() {
  if (con !== null) {
    con.destroy();
    con = null;
  }

  con = mysql.createConnection(mysqlConf);
  con.connect(function (err) {
    if (err) {
        logger.info("error when connecting to db,reConnecting after 2 seconds:", err);
        setTimeout(connect, 2000);
    }
  });
  con.on("error", handleError);

  // 每个小时ping一次数据库，保持数据库连接状态
  clearInterval(pingInterval);
  pingInterval = setInterval(() => {
      console.log('ping...');
      con.ping((err) => {
          if (err) {
              console.log('ping error: ' + JSON.stringify(err));
          }
      });
  }, 3600000);
}

connect();



//con.connect();

// 统一执行 sql 的函数
function exec(sql) {
   const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, res) => {
            if(err) {
               reject(err);
            }
            else {
              resolve(res);
            }
        })  
       // con.release()
   })
   return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}

// con.end();