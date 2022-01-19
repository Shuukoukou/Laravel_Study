const Users = require('../models/Users');
//const redirectPath = '/users';

const UsersController = {

    async list(req, res) {
        const result = await Users.all();
        res.json({ users: result })
        //res.send(result);
        // res.render('../pages/user/user.js', {
        //     title: '一覧画面',
        //     datas: results
        // });
    },

    async findOne(req, res) {
        const { id } = req.params;
        const result = await Users.findOne(id);
        res.send(result);
    },

    // create(req, res) {
    //     res.render('../pages/user/creatuser.js', {
    //         title: '登録画面'
    //     });
    // },

    async create(req, res) {
        const formData = req.body;
        const result = await Users.create(formData);
        res.send(result);
        //res.redirect(redirectPath);
    },

    async update(req, res) {
        const id = req.params.id;
        const formData = req.body;
        const result = await Users.update(id, formData);
        res.send(result);
        //res.redirect(redirectPath);
    },

    async delete(req, res) {
        const id = req.params.id;
        const result = await Users.delete(id);
        return result;
        //res.redirect(redirectPath);
    },


    // async edit(req, res) {
    //     const id = req.params.id;
    //     const result = await users.selectById(id);
    //     res.render('users/edit.ejs', {
    //         title: '編集画面',
    //         data: result
    //     });
    // },
};

module.exports = UsersController;