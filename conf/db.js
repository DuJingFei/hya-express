const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONF
let REDIS_CONF
/*
if (env === 'dev') {
    MYSQL_CONF = {
        host: '39.104.160.139',
        user: 'root',
        password: 'ABCabc123.',
        port: '3306',
        database: 'blog'
    },

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    MYSQL_CONF = {
        host: '39.104.160.139',
        user: 'root',
        password: 'ABCabc123.',
        port: '3306',
        database: 'blog'
    },

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
} */

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}