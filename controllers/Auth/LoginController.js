const Auth = require('../../models/Auth');

const LoginController = {

    // 登录认证
    async login(req, res) {

        const user_name = req.body.user_name;
        const password = req.body.password;
        
        const result = await Auth.login(user_name);
        if(result.length === 0){
            const result = {status:'failed'}
            res.send(JSON.stringify(result))
        }else{
            if (result[0].password === password) {
                const r = {status:'success', user_name:result[0].user_name, email:result[0].email}
                res.send(JSON.stringify(r))
            }else{
                const result = {status:'failed'}
                res.send(JSON.stringify(result))
            }
        }
    },

};

module.exports = LoginController;