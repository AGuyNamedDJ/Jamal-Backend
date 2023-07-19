// Requires
const { client } = require("./index");
const bcrypt = require('bcrypt')

// createUsers
async function createUser({ username, password, email, full_name, user_role, profile_image, phone_number }) {
    try {
      console.log(`Hashing password for ${username}`);
      const SALT_COUNT = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
      console.log(`Password hashed for ${username}`);
      console.log(`Inserting ${username} into database`);
  
      const result = await client.query(`
        INSERT INTO users(username, password, email, full_name, user_role, profile_image, phone_number) 
        VALUES($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, hashedPassword, email, full_name, user_role, profile_image, phone_number]);
  
      console.log(`User ${username} inserted into database`);
      return result.rows;
    } catch (error) {
      console.error(`Could not create user ${username}`);
      console.error("Error details: ", error);
      throw error;
    }
  }
 
// getAllUsers
async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT id, username, email, full_name, user_role, profile_image, phone_number
        FROM users;
    `);

        return rows;
    } catch (error) {
        console.error("Could not get all users.");
        console.log(error);
        throw error;
    }
}

// getUserById
// getUserById function
async function getUserById(id) {
    try {
        const { rows: [ users ] } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id= $1;
        `,[id]);

        if (!users) {
            return null
        }
        return users;
    } catch (error) {
        console.log(error)
    }
};


// getUserByUsername
async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT id, username, email, full_name, user_role, profile_image, phone_number
        FROM users
        WHERE username = $1;
    `, [username]);

  
      return user;
    } catch (error) {
        console.error(`Could not get user with username ${username}`);
        console.error(error);
        throw error;
    }
}
  

// loginUser
async function loginUser({ username, password }) {
    try {
        // Fetchh user from DB
        const result = await client.query(`
            SELECT * FROM users 
            WHERE username = $1;
        `, [username]);

        const user = result.rows[0];

        if (!user) {
            // Handle UNF
            throw new Error('User not found');
        }

        // Check if hashed.p = BN.p
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            // Handle invalid password
            throw new Error('Invalid password');
        }

        // Login successful
        return user;
    } catch (error) {
        console.error(`Could not log in user ${username}`);
        console.error(error);
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    loginUser
};
