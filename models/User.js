/**
 * @description 用户模型
 * @author 徐政 马昊晟
 * @date 2021-7-16
 */

const User = {
  title: 'user',
  version: 0,
  describe: 'user',
  type: 'object',
  properties: {
    _id: {
      primary: true,
      type: 'string',
    },
    plan:{
      type: 'number',
      default:15
    },
    today:{
      type: 'number',
      default:0
    },
    review:{
      type: 'number',
      default:10
    },
    loginAt:{
      type: 'string',
    },
    books: {
      ref: 'books',
      type: 'array',
      items: {
        type: 'string',
      },
      default:[]
    },
    temp: {
      ref: 'words',
      type: 'array',
      items: {
        type: 'string',
      },
      default:[]
    },
  },
};

export default User;
