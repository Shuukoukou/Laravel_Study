const { PrismaClient } =require('@prisma/client');

const prisma = new PrismaClient();

const words = {

  // 获取所有单词
  async all() {
    const words = await prisma.words.findMany()
    return words;
  },

  // 查询单词
  async findMany(formData) {

    const user_name = formData.user_name;
    const password = formData.password;
    const user_cd = formData.user_cd;
    const email = formData.email;
    const role_cd = formData.role_cd;      

    const words = await prisma.words.findMany({
    where: {
        email: {
            endsWith: "prisma.io"
        }
        },

    })
  },


};

module.exports = words;