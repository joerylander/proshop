import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin user",
    email: "admin@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: true,
  },
  {
    name: "Jon Doe",
    email: "jon@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bcrypt.hashSync("12345", 10),
    isAdmin: false,
  },
];

export default users;
