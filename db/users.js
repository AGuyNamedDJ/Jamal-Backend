// Requires
const { client } = require("./Index");
const bcrypt = require('bcrypt')

// createUsers
async function createUser({ username, password, email, full_name, user_role, profile_image, phone_number, address }) {
    try {
      // Hash the password
      const SALT_COUNT = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

      const result = await client.query(`
        INSERT INTO users(username, password, email, full_name, user_role, profile_image, phone_number) 
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `, [username, hashedPassword, email, full_name, user_role, profile_image, phone_number, address]);
  
      return result.rows[0];
    } catch (error) {
        console.error(`Could not create user ${username}`);
        console.log(error);
        throw error; // Re-throw the error after logging it
    }
}

// getUserByUsername
async function getUserByUsername(username) {
    try {
      const { rows } = await client.query(`
        SELECT *
        FROM users
        WHERE username = $1;
      `, [username]);
  
      return rows[0];
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
    getUserByUsername,
    loginUser
};
