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

    it(`should return a 201 CREATED`, () => {
      const user = { username: "bilbo", password: "baggins" };
      return request(server)
        .post(`/user`)
        .send(user)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe(`delete /:id`, () => {
    it(`should delete the user by id`, async () => {
      const user = { username: "bilbo", password: "baggins" };
      return request(server)
        .post(`/user`)
        .send(user)
        .then(
          async res =>
            await request(server)
              .del(`/${res.body.id}`)
              .then(deleted => expect(deleted.body).toEqual(1))
        );
    });

    it(`should return a 200 OK`, () => {
      const user = { username: "bilbo", password: "baggins" };
      return request(server)
        .post(`/user`)
        .send(user)
        .then(
          async res =>
            await request(server)
              .del(`/${res.body.id}`)
              .then(deleted => expect(deleted.status).toEqual(200))
        );
    });
  });
});
