const db = require(`../dbConfig`);

const find = (id = undefined) => {
  return db(`users`).modify(qb => {
    if (id) {
      qb.where({ id });
    }
  });
};

const add = user => {
  return db(`users`).insert(user, "id");
};

const remove = id => {
  return db(`users`)
    .del()
    .where({ id });
};

module.exports = {
  find,
  add,
  remove
};
