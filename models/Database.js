/**
 * @description 数据库初始化文件
 * @author 徐政 马昊晟
 * @date 2021-7-16
 */

import {
  createRxDatabase,
  addRxPlugin,
} from 'rxdb';
import Word from './Word';
import User from './User';
import dayjs from 'dayjs'

addRxPlugin(require('pouchdb-adapter-idb'));

const collections = {
  words: {
    schema: Word,
  },
  users: {
    schema: User,
  },
};

let dbPromise = null;

const _create = async () => {
  console.log('DatabaseService: creating database..');
  const db = await createRxDatabase({
    name: 'jwords'+ new Date().getTime(),
    adapter: 'idb',
  });
  console.log('DatabaseService: created database');
  window.db = db; // write to window for debugging

  // create collections
  console.log('DatabaseService: create collections');
  await db.addCollections(collections);

  const user = await db.users.findOne().exec()
  if(!user){
    await db.users.insert({loginAt:dayjs().format("YYYY-MM-DD")})
  }else{
    const today = dayjs().format("YYYY-MM-DD")
    if(user.loginAt !== today){
      await user.update({
        $set:{
          loginAt:today,
          today:0
        }
      })
    }
  }

  return db;
};

const getDB = () => {
  if (!dbPromise) dbPromise = _create();
  return dbPromise;
};

export default getDB;
