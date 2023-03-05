import store from "store";

const USER_KEY = "user";
const Q_ID = "questionId";

export default {
  //?存储用户
  saveUser(user) {
    store.set(USER_KEY, user);
    //console.log(user)
  },

  //?得到用户信息
  getUser(user) {
    return store.get(USER_KEY) || {};
  },

  //?删除用户
  removeUser(user) {
    store.remove(USER_KEY);
    //console.log(user)
  },

  //?存储问题id
  saveQuestionId(questionId) {
    store.set(Q_ID, questionId);
    //console.log(Q_ID)
  },
  //?得到问题id
  getQuestionId() {
    return store.get(Q_ID) || null;
  },
};
