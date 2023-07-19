// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index');

// Page Imports

// Step 2: User Methods
    // Method: dropTables
    async function dropTables(){
        try {
            console.log("Dropping tables... ");
            await client.query(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS suite_renters;
            DROP TABLE IF EXISTS salon_suites;
            DROP TABLE IF EXISTS services;
            DROP TABLE IF EXISTS appointments;
            DROP TABLE IF EXISTS payments;
            DROP TABLE IF EXISTS reviews;
            DROP TABLE IF EXISTS favorites;
            DROP TABLE IF EXISTS notifications;
            DROP TABLE IF EXISTS messages;
            DROP TABLE IF EXISTS services;
            DROP TABLE IF EXISTS promotions;
            DROP TABLE IF EXISTS business_hours;
            `)
        
            console.log("Finished dropping tables.")
        } catch(error){
            console.log("Error dropping tables!")
            console.log(error)
        }
    };

    // Create Tables
    async function createTables() {
        try {
            console.log('Starting to build tables...');
            await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(25) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                full_name VARCHAR(50),
                user_role VARCHAR(25),
                profile_image VARCHAR(255),
                phone_number VARCHAR(15),
                address VARCHAR(255),
                "is_active" BOOLEAN DEFAULT true
            );
            
            `);
            console.log('Finished building tables.');
            } catch (error) {
            console.error('Error building tables!');
            console.log(error);
            }
        };

    // Rebuild DB
    async function rebuildDB() {
        try {
            client.connect();
            await dropTables();
            await createTables();
        } catch (error) {
            console.log("Error during rebuildDB!")
            console.log(error.detail);
        }
    };

    // Test DB
    async function testDB() {
        try {
            console.log("Starting to test database...");
    
            // Test
            // console.log("Calling all ...");
            // const manufacturer = await ();
            // console.log("Results", );

            // Test Concluded
            console.log("Finished testing database.");
        } catch (error) {
            console.log("Error during testDB!");
            console.log(error);
        }
    };
  
   // Final Call
    rebuildDB()
        .then(testDB)
        .catch(console.error)
        .finally(() => client.end())