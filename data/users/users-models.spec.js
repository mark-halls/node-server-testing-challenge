const Users = require(`./users-model`);
const db = require(`../dbConfig`);

describe(`users-model`, () => {
  beforeEach(async () => {
    await db(`users`).truncate();
  });

  it(`should add a user to the db`, async () => {
    const user = { username: "test", password: "test" };
    const [id] = await Users.add(user);
    const dbUser = await db(`users`)
      .select("username", "password")
      .where({ id })
      .first();
    expect(dbUser).toEqual(user);
  });

  it(`should remove a user from the db`, async () => {
    const user = { username: "removeMe", password: "super-secure" };
    const [id] = await db(`users`).insert(user, "id");
    const dbUser = await db(`users`)
      .select("username", "password")
      .where({ id })
      .first();
    expect(dbUser).toEqual(user);
    const removed = await Users.remove(id);
    expect(removed).toBe(1);
    const removedUser = await db(`users`).where({ id });
    expect(removedUser).toEqual([]);
  });

  it(`should return all users`, async () => {
    const user = { username: "test", password: "test" };
    const user2 = { username: "test2", password: "test" };
    await Users.add(user);
    await Users.add(user2);
    const users = await Users.find();
    expect(users.length).toBe(2);
  });

  it(`should return 1 user`, async () => {
    const user = { username: "test", password: "test" };
    const user2 = { username: "test2", password: "test" };
    const [id] = await Users.add(user);
    const [id2] = await Users.add(user2);
    const found = await Users.find(id2);
    expect(found.username).toMatch(/test2/i);
  });
});
