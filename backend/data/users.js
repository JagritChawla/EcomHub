import bcrypt from "bcryptjs";

const users=[
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jagrit Chawla',
        email: 'jagrit@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Janit Chawla',
        email: 'janit@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]
export default users;