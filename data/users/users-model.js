const db = require(`../dbConfig`);

const add = user => {
  return db(`users`).insert(user, "id");
};

const remove = id => {
  return db(`users`)
    .del()
    .where({ id });
};

module.exports = {
  add,
  remove
};
