const { PrismaClient } =require('@prisma/client');

const prisma = new PrismaClient();

const books = {

  // 获取所有教材
  async all() {
      const books = await prisma.books.findMany()
      return books;
  },

  // 查询教材
  async findOne(id) {
      const book = await prisma.books
      .findUnique({
      where: { id: Number(id), },
      })
      return book;
  },

};

module.exports = books;