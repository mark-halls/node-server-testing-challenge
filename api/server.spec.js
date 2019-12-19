const request = require(`supertest`);
const db = require(`../data/dbConfig`);
const server = require(`./server`);

describe(`server.js`, () => {
  beforeEach(async () => {
    await db(`users`).truncate();
  });

  describe(`get /`, () => {
    it(`should return a 200 OK`, () => {
      return request(server)
        .get(`/`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
    it(`should return {mgs: "api is up"}`, () => {
      return request(server)
        .get(`/`)
        .then(res => expect(res.body).toEqual({ msg: "api is up" }));
    });
  });

  describe(`post /user`, () => {
    it(`should return added user object`, () => {
      const user = { username: "bilbo", password: "baggins" };
      return request(server)
        .post(`/user`)
        .send(user)
        .then(res => expect(res.body).toMatchObject(user));
    });
  });
});
