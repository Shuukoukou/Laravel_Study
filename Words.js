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

    const book_name = formData.book_name;
    const lesson = formData.lesson;
    const word = formData.word;
    const user_cd = formData.user_cd;
    const email = formData.email;
    const role_cd = formData.role_cd;

    const query = ``;

    if (book_name !== '') {
      if (query !== ``) {
        query += ` AND `
      }
      query += ` book_name = ${book_name} `
    }

    if (lesson !== '') {
      if (query !== ``) {
        query += ` AND `
      }
      query += ` lesson = ${lesson} `
    }

    if (word !== '') {
      if (query !== ``) {
        query += ` AND `
      }
      query += ` word LIKE '%${word}%' `
    }

    if (query !== '') {
      query = ` WHERE ` + query
    }


    // const where = prisma.sql` book_name = ${book_name} `

    // const result= await prisma.$queryRaw`SELECT column FROM table ${condition ? where : Prisma.empty}`

    const users = await prisma.$queryRaw`SELECT * FROM words `

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