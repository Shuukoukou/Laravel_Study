const { PrismaClient } =require('@prisma/client');

const prisma = new PrismaClient();

const users = {

  // 获取所有用户
  async all() {
      const users = await prisma.users.findMany()
      return users;
  },

  // 查询用户
  async findOne(id) {
      const user = await prisma.users
      .findUnique({
      where: { id: Number(id), },
      })
      return user;
  },

  // 添加用户
  async create(formData) {

      const user_name = formData.user_name;
      const password = formData.password;
      const user_cd = formData.user_cd;
      const email = formData.email;
      const role_cd = formData.role_cd;

      const result = await prisma.users.create({
        data: {
          user_name,
          password,
          user_cd,
          email,
          role_cd,
        },
      })

      return result;
  },

  // 更新用户
  async update(id, formData) {

      const user_name = formData.user_name;
      const password = formData.password;
      const user_cd = formData.user_cd;
      const email = formData.email;
      const role_cd = formData.role_cd;

      try {
        const userData = await prisma.users.findUnique({
          where: { user_name: user_name },
        })

        const updatedUser = await prisma.users.update({
          where: { id: Number(id) || undefined },
          data: {
            user_name,
            password,
            user_cd,
            email,
            role_cd,
          },
        })

        return updatedUser
      } catch (error) {
        return { error: `用户${user_name}不存在！` }
      }
    
  },

  // 删除用户
  async delete(id) {

      const result = await prisma.users.delete({
          where: { id: Number(id), },
      })

      return result;
  },

    
  //   try {
  //     const result = await prisma.users.findUnique({
  //       where: { 
  //         user_name: user_name,
  //         password: password,
  //        },
  //     })

  //     return result;
  //   } catch (error) {

  //     return { error: `用户${user_name}不存在！` }
  //   }

  // }


};

module.exports = users;

// async function main(user_name,password) {
//     // user_name,password
//     const users = await prisma.$queryRaw`SELECT * FROM users WHERE user_name = ${user_name} AND password = ${password}`
//     console.log(users)
  
//   }
  
//   main()
//     .catch((e) => {
//       throw e
//     })
//     .finally(async () => {
//       await prisma.$disconnect()
//     })

// module.exports = result;