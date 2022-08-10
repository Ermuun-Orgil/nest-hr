import mongoose from "mongoose";
import Group from "../../src/models/Group";
import Movie from "../../src/models/Movie";
import Ticket from "../../src/models/ticket/ticket";
import User from "../../src/models/User";
import { demoUser, demoGroup } from "./demoData";

const setupEnvironment = async () => {
  /* istanbul ignore next */
  if (!process.env.MONGODB_URL) {
    process.env.MONGODB_URL = "mongodb://localhost:27017/test_nest_hr";
  }
  if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = "thisisasamplesecret";
  }
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URL, {});
    await Movie.deleteMany();
    await Ticket.deleteMany();
    await User.deleteMany();
    await Group.deleteMany();
  }
};

const createDemoData = async () => {
  demoUser.forEach(async user => {
    await User.create(user);
  });
  demoGroup.forEach(async group => {
    await Group.create(group);
  });
};

const tearDown = async () => {
  await Movie.deleteMany();
  await Ticket.deleteMany();
  await User.deleteMany();
  await Group.deleteMany();
  await mongoose.connection.close();
};

export { setupEnvironment, tearDown, createDemoData };
