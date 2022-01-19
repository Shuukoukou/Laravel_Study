/**
 * @description 书籍模型
 * @author 徐政 马昊晟
 * @date 2021-6-29
 */

const Book = {
  title: 'book',
  version: 0,
  describe: 'book',
  type: 'object',
  properties: {
    _id: {
      primary: true,
      type: 'string',
    },
    title: {
      type: 'string',
    },
    author: {
      ref: 'users',
      type: 'string',
    },
  },
  required: ['_id', 'title'],
};

export default Book;
