export const demoUser = [
  {
    _id: "62e893a5784f8957b14a8887",
    userName: "user1",
    email: "user1@gmail.com",
    password: "user1",
    userGroup: [
      "62e74a8401675f07254517ce",
      "62f078947d09e5aa9cb5588c",
      "62f078ee7d09e5aa9cb5588d",
      "62f079cb7d09e5aa9cb5588e",
    ],
    createdAt: "1659409317603",
    __v: 0,
  },
  {
    _id: "62e8f13b40eee4ce60fa373e",
    userName: "user2",
    email: "user2@gmail.com",
    password: "user2",
    userGroup: ["62e74a8401675f07254517ce", "62f078947d09e5aa9cb5588c", "62f078ee7d09e5aa9cb5588d"],
    createdAt: "1659409317603",
    __v: 0,
  },
  {
    _id: "62e8ca16e385b0a0864164ef",
    userName: "user3",
    email: "user3@gmail.com",
    password: "user3",
    userGroup: ["62e74a8401675f07254517ce", "62f078947d09e5aa9cb5588c"],
    createdAt: "1659423254990",
    __v: 0,
  },
  {
    _id: "62f2140c7d09e5aa9cb55a1d",
    userName: "user4",
    email: "user4@gmail.com",
    password: "user4",
    userGroup: ["62e74a8401675f07254517ce"],
    createdAt: "1659409317603",
    __v: 0,
  },
  {
    _id: "62f2140c7d09e5aa9cb55a2d",
    userName: "user5",
    email: "user5@gmail.com",
    password: "user5",
    userGroup: [],
    createdAt: "1659409317603",
    __v: 0,
  },
];
export const demoGroup = [
  {
    _id: "62e74a8401675f07254517ce",
    name: "default",
    permissions: {
      kpiInfo: { read: true },
      salaryInfo: { read: true },
      ladderInfo: { read: true },
      profile: { read: true },
    },
    __v: 0,
  },
  {
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
  },
  {
    _id: "62f079cb7d09e5aa9cb5588e",
    name: "HR-2",
    permissions: { users: { read: true } },
    __v: 0,
  },
  {
    _id: "62f078ee7d09e5aa9cb5588d",
    name: "accountant",
    permissions: { users: { read: true }, "salary-all": { update: true, read: true } },
    __v: 0,
  },
];

export const modules = [
  "kpiInfo",
  "salaryInfo",
  "ladderInfo",
  "profile",
  "kpiInfo-all",
  "salary-all",
  "ladderInfo-all",
  "profile-all",
];
export const actions = ["read", "create", "update", "delete"];
