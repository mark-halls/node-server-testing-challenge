const express = require(`express`);

const Users = require(`../data/users/users-model`);

const server = express();
server.use(express.json());
server.get(`/`, (req, res) => res.status(200).json({ msg: `api is up` }));

server.post(`/user`, (req, res) => {
  const user = req.body;
  Users.add(user).then(([id]) =>
    Users.find(id).then(user => res.status(200).json(user))
  );
});
module.exports = server;
