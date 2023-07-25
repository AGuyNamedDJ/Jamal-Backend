// Requires
const { client } = require("./index");
const bcrypt = require('bcrypt')

// createUser
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
      return result.rows[0];
    } catch (error) {
      console.error(`Could not create user ${username}`);
      console.error("Error details: ", error);
      throw error;
    }
};
 
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
};

// getUserById
async function getUserById(id) {
    try {
        const { rows: [ user ] } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id= $1;
        `,[id]);

        if (!user) {
            return null
        }
        return user;
    } catch (error) {
        console.log(error)
        throw error;
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
};  

// loginUser
async function loginUser({ username, password }) {
    try {
        const result = await client.query(`
            SELECT * FROM users 
            WHERE username = $1;
        `, [username]);

        const user = result.rows[0];

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Removes password from the user object before returning
        delete user.password;

        return user;
    } catch (error) {
        console.error(`Could not log in user ${username}`);
        console.error(error);
        throw error;
    }
};


// deleteUser
async function deleteUser(username) {
    try {
        await client.query('BEGIN');

        await client.query(`
            DELETE FROM salon_renters WHERE suite_id IN (
                SELECT id FROM salon_suites WHERE user_id = (
                    SELECT id FROM users WHERE username = $1
                )
            )
        `, [username]);

        await client.query(`
            DELETE FROM salon_suites WHERE user_id = (
                SELECT id FROM users WHERE username = $1
            )
        `, [username]);

        const result = await client.query(`
            DELETE FROM users WHERE username = $1 RETURNING *
        `, [username]);

        await client.query('COMMIT');

        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');

        console.error(`Could not delete user ${username}`);
        console.error(error);
        throw error;
    }
};

// updateUser
async function updateUser(username, fields = {}) {
    // Generate the SET clause of the SQL statement
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    // Check if there are fields to update
    if (setString.length === 0) {
        return;
    }

    // Check if the 'password' field is present
    // If it is, hash the new password before updating
    if ('password' in fields) {
        const SALT_COUNT = 10;
        fields.password = await bcrypt.hash(fields.password, SALT_COUNT);
    }

    // Execute the update query
    try {
        const { rows: [user] } = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE username=$${Object.keys(fields).length + 1}
            RETURNING *;
        `, Object.values(fields).concat(username));

        return user;
    } catch (error) {
        console.error("Could not update user.");
        console.error("Error details: ", error);
        throw error;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    loginUser,
    deleteUser,
    updateUser
};
