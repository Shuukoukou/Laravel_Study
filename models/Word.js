/**
 * @description 单词模型
 * @author 徐政 马昊晟
 * @date 2021-7-12
 */

const Word = {
  title: 'Word',
  version: 0,
  describe: 'Word',
  type: 'object',
  properties: {
    _id: {
      primary: true,
      type: 'string',
    },
    kana: {
      type: 'string',
    },
    kanji: {
      type: 'string',
    },
    sem: {
      type: 'string',
    },
    pos: {
      type: 'string',
    },
    ex: {
      type: 'string',
    },
    audio: {
      type: 'string',
    },
    book: {
      type: 'string',
    },
    lesson: {
      type: 'string',
    },
    fav:{
      type: 'number',
      default:0
    },
    remembered:{
      type: 'number',
      default:0
    },
    tested:{
      type: 'number',
      default:0
    }
  },
  required: ['_id', 'kana', 'kanji', 'sem', 'pos',
    'book', 'lesson'],
};

export default Word;
