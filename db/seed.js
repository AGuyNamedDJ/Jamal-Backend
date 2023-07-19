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
            `)
        
            console.log("Finished dropping tables.")
        } catch(error){
            console.log("Error dropping tables!")
            console.log(error)
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