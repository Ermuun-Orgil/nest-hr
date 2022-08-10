import request from "supertest";
import app from "../../src/app";
import { setupEnvironment, tearDown } from "../utils/setupEnvironment";

beforeAll(async () => {
  await setupEnvironment();
});

afterAll(async () => {
  await tearDown();
});

let userToken: string;
describe("Testing user CRUD", () => {
  it("Trying Login Service with wrong information", async () => {
    const res = await request(app).post("/login").send({
      email: "user5@gmail.com",
      password: "user5",
    });
    expect(res.status).toBe(404);
  });
  it("Trying access users Api without login", async () => {
    const res = await request(app).get("/users");
    // .set({ "Content-Type": "application/json", Authorization: `Bearer ${userToken}` });
    expect(res.status).toBe(401);
  });
  it("Trying access users with Expired token", async () => {
    const res = await request(app).get("/users").set({
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmU4OTNhNTc4NGY4OTU3YjE0YTg4ODciLCJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsInVzZXJHcm91cCI6WyI2MmU3NGE4NDAxNjc1ZjA3MjU0NTE3Y2UiLCI2MmYwNzg5NDdkMDllNWFhOWNiNTU4OGMiLCI2MmYwNzhlZTdkMDllNWFhOWNiNTU4OGQiXSwiaWF0IjoxNjYwMDI5OTE0LCJleHAiOjE2NjAwMjk5MTR9.WU7AlomJUWJ9PZuSraQIyzBQ_vB5A9aR20uvXzlFBqo",
    });
    expect(res.status).toBe(401);
    expect(res.text).toBe('{"message":"Expired token"}');
  });
  it("Trying access users with Invalid token 1", async () => {
    const res = await request(app).get("/users").set({
      "Content-Type": "application/json",
      Authorization: "Bearer 7AlomJUWJ9PZuSraQIyzBQ_vB5A9aR20uvXzlFBqo",
    });
    expect(res.status).toBe(403);
    expect(res.text).toBe('{"message":"Inviled Token"}');
  });
  it("Trying access users with Invalid token 2", async () => {
    const res = await request(app).get("/users").set({
      "Content-Type": "application/json",
      Authorization: "7AlomJUWJ9PZuSraQIyzBQ_vB5A9aR20uvXzlFBqo",
    });
    expect(res.status).toBe(403);
    expect(res.text).toBe('{"message":"Inviled Token"}');
  });
  it("Trying access users without Authorization", async () => {
    const res = await request(app).get("/users").set({
      "Content-Type": "application/json",
    });
    expect(res.status).toBe(401);
    expect(res.text).toBe('{"message":"No token provided or Inviled Token"}');
  });
  it("Trying access users with user with no group", async () => {
    const res = await request(app).get("/users").set({
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyMTQwYzdkMDllNWFhOWNiNTVhMWQiLCJlbWFpbCI6InVzZXI0QGdtYWlsLmNvbSIsInVzZXJHcm91cCI6W10sImlhdCI6MTY2MDAzMjgzMiwiZXhwIjoxNjkxNTY4ODMyfQ.8iKoI_rdIZdKMVFa6Rb42ynopy-lfbpmCDQvv92CTUM",
    });
    expect(res.status).toBe(403);
  });
  it("Trying Login Service and it should return data with success: true", async () => {
    const res = await request(app).post("/login").send({
      email: "user1@gmail.com",
      password: "user1",
    });
    expect(res.status).toBe(200);
    const data = JSON.parse(res.text);
    expect(data.data.email).toBe("user1@gmail.com");
    userToken = data.data.token;
  });

  it("Testing get users api", async () => {
    const res = await request(app)
      .get("/users")
      .set({ "Content-Type": "application/json", Authorization: `Bearer ${userToken}` });
    expect(res.status).toBe(200);
    const data = JSON.parse(res.text);
    expect(data[0].userName).toBe("user1");
    expect(data[1].userName).toBe("user2");
    expect(data[2].userName).toBe("user3");
  });
});
