/**
 * @description 根路由集合
 * @author zhou
 * @date 2022-01-18
 */

const express = require ('express');
const cors = require('cors');
const app = express ();

// 登录模块路由
app.use('/',require('./Auth/Auth'))
// 单词模块路由
app.use('/',require('./Books/Books'))
// 句子模块路由
app.use('/',require('./Sentences/Sentences'))
// 用户模块路由
app.use('/',require('./Users/Users'))
// 单词模块路由
app.use('/',require('./Words/Words'))

let server = app.listen(5000, (err) => {
    if (!err) console.log('express开启成功')
})
server.setTimeout(0);


