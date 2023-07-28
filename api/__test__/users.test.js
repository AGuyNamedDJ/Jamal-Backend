// Requires
const request = require('supertest');
const { app } = require('../../server');
const { createUser, updateUser, getUserByUsername } = require('../../db/users');  // import updateUser
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Function for setting up database
async function setupDatabase() {
    await createUser({
        username: 'TestOwner1', 
        password: 'TestPassword1', 
        email: 'testowner1@example.com', 
        full_name: 'Test Robertson1', 
        user_role: 'stylist', 
        profile_image: 'url', 
        phone_number: '987-654-3210'
    });
    await createUser({
        username: 'TestOwner2', 
        password: 'TestPassword2', 
        email: 'testowner2@example.com', 
        full_name: 'Test Robertson2', 
        user_role: 'customer', 
        profile_image: 'url', 
        phone_number: '987-654-3211'
    });
}

// Function for cleaning up database
async function cleanupDatabase() {
    await updateUser('TestOwner1', { 
        password: 'TestPassword1',  
        email: 'testowner1@example.com', 
        full_name: 'Test Robertson1', 
        user_role: 'stylist', 
        profile_image: 'url', 
        phone_number: '987-654-3210' 
    });
    await updateUser('TestOwner2', { 
        password: 'TestPassword2', 
        email: 'testowner2@example.com', 
        full_name: 'Test Robertson2', 
        user_role: 'customer', 
        profile_image: 'url', 
        phone_number: '987-654-3211' 
    });
}

describe('User API', () => {
    // Run the setup function before tests
    beforeAll(async () => {
        await setupDatabase();
    });

    describe('PUT /api/users/update/:username', () => {
        it('should update an existing user', async () => {
          // Create a unique user
          const uniqueUsername = 'TestUser' + Date.now();
          const newUser = {
            username: uniqueUsername,
            password: 'TestPassword1',
            email: uniqueUsername + '@example.com',
            full_name: 'Test User',
            user_role: 'user',
            profile_image: 'test-image.jpg',
            phone_number: '987-654-3210'
          };
      
          const userRes = await request(app)
            .post('/api/users/register')
            .send(newUser);
      
          const user = userRes.body.user;
          const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1w" });
      
          // Update the user
          const res = await request(app)
            .put(`/api/users/update/${uniqueUsername}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              password: 'NewPassword', 
              email: 'updated@test.com', 
              full_name: 'Updated User', 
              user_role: 'admin', 
              profile_image: 'updated-image.jpg', 
              phone_number: '123-456-7890'
            });
      
          expect(res.statusCode).toEqual(200);
      
          const updatedUser = res.body.user;
          expect(updatedUser.password).not.toEqual('NewPassword'); 
          expect(updatedUser.email).toEqual('updated@test.com');
          expect(updatedUser.full_name).toEqual('Updated User');
          expect(updatedUser.user_role).toEqual('admin');
          expect(updatedUser.profile_image).toEqual('updated-image.jpg');
          expect(updatedUser.phone_number).toEqual('123-456-7890');
          console.log(res.body)
        });
      });
      

    describe('GET /api/users', () => {
        it('should show all users', async () => {
            const res = await request(app).get('/api/users');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('users');
            console.log(res.body)
        });
    });

    describe('GET /api/users/profile/:username', () => {
        it('should show specific user profile', async () => {
            const user = await getUserByUsername('TestOwner1');
            const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1w" });

            const res = await request(app).get(`/api/users/profile/${user.username}`).set('Authorization', `Bearer ${token}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('myUserInfo');
            expect(res.body.myUserInfo.username).toEqual('TestOwner1');
            console.log(res.body)
        });
    });

    describe('POST /api/users/register', () => {
        it('should register a new user', async () => {
            const timestamp = Date.now();
            const uniqueUsername = `TestUser3_${timestamp}`; 
            const uniqueEmail = `testuser3_${timestamp}@example.com`;  
            
            const res = await request(app)
                .post('/api/users/register')
                .send({
                    username: uniqueUsername, 
                    password: 'TestPassword3', 
                    email: uniqueEmail,  
                    full_name: 'Test User3', 
                    user_role: 'customer', 
                    profile_image: 'url', 
                    phone_number: '987-654-3212'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.username).toEqual(uniqueUsername);
            console.log(res.body)
        });
    });
    

    describe('POST /api/users/login', () => {
        it('should login an existing user', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    username: 'TestOwner1', 
                    password: 'TestPassword1' // use original password
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            console.log(res.body)
        });
    });

    // Run the cleanup function after tests
    afterAll(async () => {
        await cleanupDatabase();
    });
});
