const prisma = require("../prisma/client");

// Get All Users
const getAllUsers = async () => {
    const users = await prisma.user.findMany();
  
    const userResponse = users.map((user) => {
      const { id, email, name } = user;
      return { id, email, name };
    });
    return { users: userResponse };
};

module.exports = {
    getAllUsers
};