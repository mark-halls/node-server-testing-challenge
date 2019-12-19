const request = require(`supertest`);

const server = require(`./server`);

describe(`server.js`, () => {
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
        .then(res => expect(res.body).toBe({ msg: "api is up" }));
    });
  });
});
