const { exec , escape} = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const getLogin = (username, password) => {
    username = escape(username);
    password = escape(password);

   const sql = `select username, realname from users where username=${username} and password=${password}`;

   return exec(sql).then(rows => {
       return rows[0];
   })
}

// 验证是否登录，通过密码（加密存入到客户端cookie中）
const loginValid = (password) => {
    const sql = `select username, realname from users where password=${password}`;

    return exec(sql).then(rows => {
        return rows[0];
    })
}

module.exports = {
    getLogin,
    loginValid
}