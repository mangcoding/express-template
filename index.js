const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware for parsing application/json (if needed)
app.use(bodyParser.json());
const bcrypt = require('bcrypt'); // Import bcrypt

app.get('/', async(req, res) => {
  const allUsers = await prisma.user.findMany()
  res.send(
    {
      "status": "success",
      "message": "All users fetched successfully",
      "data" :allUsers,
    }
  );
})

app.post('/user/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Input validation (optional)
    if (!email || !password || !name) {
      return res.status(400).send({
        status: "error",
        message: "Email, password, and name are required",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (existingUser) {
      return res.status(400).send({
        status: "error",
        message: "Email already in use",
      });
    }
    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Store hashed password
        name,
      },
    });

    // Send success response
    res.status(201).send({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error); // Log the error

    // Send error response
    res.status(500).send({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
});

app.get('/user/:id', async(req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    }
  });
  //find or null
  try {
    user.profile = await prisma.profile.findFirst({
      where: {
        userId: parseInt(id),
      }
    });
  } catch (error) {
    user.profile = null
  }
  res.send(
    {
      "status": "success",
      "message": "User fetched successfully",
      "data" :user,
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;