import mongoose from "mongoose";
import Group from "../../src/models/Group";
import Movie from "../../src/models/Movie";
import Ticket from "../../src/models/ticket/ticket";
import User from "../../src/models/User";

const setupEnvironment = async () => {
  /* istanbul ignore next */
  if (!process.env.MONGODB_URL) {
    process.env.MONGODB_URL = "mongodb://localhost:27017/test_nest_hr";
    process.env.JWT_SECRET = "thisisasamplesecret";
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URL, {});
    await Movie.deleteMany();
    await Ticket.deleteMany();
    await User.deleteMany();
    await Group.deleteMany();
    await Group.create({
      _id: "62e74a8401675f07254517ce",
      name: "default",
      permissions: {
        kpiInfo: { read: true },
        salaryInfo: { read: true },
        ladderInfo: { read: true },
        profile: { read: true },
      },
      __v: 0,
    });
    await Group.create({
      _id: "62f078947d09e5aa9cb5588c",
      name: "HR-1",
      permissions: {
        users: { read: true, update: true },
        "kpiInfo-all": { read: true, update: true },
        "salary-all": { read: true },
        "ladderInfo-all": { read: true, update: true },
        "profile-all": { read: true, update: true },
      },
      __v: 0,
    });
    await Group.create({
      _id: "62f078ee7d09e5aa9cb5588d",
      name: "accountant",
      permissions: { users: { read: true }, "salary-all": { update: true, read: true } },
      __v: 0,
    });
    await Group.create({
      _id: "62f079cb7d09e5aa9cb5588e",
      name: "HR-2",
      permissions: { users: { read: true } },
      __v: 0,
    });
    await User.create({
      _id: "62e893a5784f8957b14a8887",
      userName: "user1",
      email: "user1@gmail.com",
      password: "user1",
      userGroup: ["62e74a8401675f07254517ce", "62f078947d09e5aa9cb5588c", "62f078ee7d09e5aa9cb5588d"],
      createdAt: "1659409317603",
      __v: 0,
      role: "admin",
    });

    await User.create({
      _id: "62e8f13b40eee4ce60fa373e",
      userName: "user2",
      email: "user2@gmail.com",
      password: "user2",
      userGroup: ["62e74a8401675f07254517ce", "62f078947d09e5aa9cb5588c", "62f078ee7d09e5aa9cb5588d"],
      createdAt: "1659409317603",
      __v: 0,
      role: "admin",
    });
    await User.create({
      _id: "62e8ca16e385b0a0864164ef",
      userName: "user3",
      email: "user3@gmail.com",
      password: "user3",
      role: "admin",
      userGroup: ["62e74a8401675f07254517ce", "62f078947d09e5aa9cb5588c"],
      createdAt: "1659423254990",
      __v: 0,
    });
  }
};

const tearDown = async () => {
  await Movie.deleteMany();
  await Ticket.deleteMany();
  await User.deleteMany();
  await Group.deleteMany();
  await mongoose.connection.close();
};

export { setupEnvironment, tearDown };
