const { PrismaClient } =require('@prisma/client');

const prisma = new PrismaClient();

const auth = {

  // 用户登录
  async login(user_name) {

    try {
      const result = await prisma.$queryRaw`SELECT * FROM users WHERE user_name = ${user_name} `
      return result;
    } catch (err) {
      throw err
    } finally {
      await prisma.$disconnect()
    }
    
  },

  // 用户注册
  async register(formData) {

    const user_name = formData.user_name;
    const password = formData.password;
    const user_cd = formData.user_cd;
    const email = formData.email;
    const role_cd = formData.role_cd;

    try {
      // 添加用户(开启事务)
      const result = await prisma.$transaction([
        prisma.users.create({
          data: {
            user_name,
            password,
            user_cd,
            email,
            role_cd,
          },})
      ])
      return result;
    } catch (error) {
      return { error: `用户${user_name}不存在！` }
    } finally {
      await prisma.$disconnect()
    }
  },

  // 更新密码
  async resetPassword(formData) {

    const user_name = formData.user_name;
    const password = formData.password;

    try {
        // 搜索用户
        const result = await prisma.users.findUnique({
        where: { user_name: user_name },})
        
        // 更新密码(开启事务)
        const result = await prisma.$transaction([
          prisma.users.update({
          where: { user_name: user_name },
          data: {
            password,
          },})
      ])
      return result
    } catch (error) {
      return { error: `用户${user_name}不存在！` }
    } finally {
      await prisma.$disconnect()
    }
  },

  // 确认密码
  async conformPassword(formData) {

  },



};

module.exports = auth;