// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index');

// Page Imports
const { createUser, getAllUsers, getUserById, getUserByUsername, loginUser } = require('./users');
const { createSuite, getSuiteById, getAllSuites, updateSuite, deleteSuite } = require('./salonSuites');
const { createRenter, getRenterById, getRentersByUserId, getAllRenters, updateRenter, deleteRenter } = require('./salonRenters');
const { createService, getAllServices, getServiceById, getServicesByUser, updateService, deleteService} = require('./services');

// Step 2: User Methods
    // Method: dropTables
    async function dropTables(){
        try {
            console.log("Dropping tables... ");
            await client.query(`
            DROP TABLE IF EXISTS messages CASCADE;
            DROP TABLE IF EXISTS notifications CASCADE;
            DROP TABLE IF EXISTS favorites CASCADE;
            DROP TABLE IF EXISTS reviews CASCADE;
            DROP TABLE IF EXISTS payments CASCADE;
            DROP TABLE IF EXISTS appointments CASCADE;
            DROP TABLE IF EXISTS salon_renters CASCADE;
            DROP TABLE IF EXISTS salon_suites CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS services CASCADE;
            DROP TABLE IF EXISTS promotions CASCADE;
            DROP TABLE IF EXISTS business_hours CASCADE;
            `)
            console.log("Finished dropping tables.")
        } catch(error){
            console.log("Error dropping tables!")
            console.log(error)
        }
    };

    // Method: Create Tables:
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
                "is_active" BOOLEAN DEFAULT true
            );
            CREATE TABLE salon_suites(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                franchise_location VARCHAR(255),
                suite_number VARCHAR(255) NOT NULL,
                services TEXT
            );
            CREATE TABLE salon_renters(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                suite_id INTEGER REFERENCES salon_suites(id),
                rent_start_date DATE NOT NULL,
                rent_end_date DATE NOT NULL,
                monthly_rental_fee DECIMAL(7,2) NOT NULL,
                lease_contract_link VARCHAR(1024)
            );
            CREATE TABLE services(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                name VARCHAR(50) NOT NULL,
                description TEXT,
                price DECIMAL(7,2) NOT NULL,
                duration INTEGER,
                image_link VARCHAR(255)
            );
            
            
            
            
            
        `);
        console.log('Finished building tables.');
        } catch (error) {
        console.error('Error building tables!');
        console.log(error);
        }
    };

    // Method: createInitialUsers:
    async function createInitialUsers() {
        console.log("Creating initial users...");
        try {
            await createUser({
                username: 'Owner1', 
                password: 'Dalron', 
                email: 'user1@example.com', 
                full_name: 'Dalron J. Robertson', 
                user_role: 'stylist', 
                profile_image: 'url', 
                phone_number: '123-456-7890'
            });
            await createUser({
                username: 'Owner2', 
                password: 'Dalron', 
                email: 'user2@example.com', 
                full_name: 'Mrs. Robertson', 
                user_role: 'customer', 
                profile_image: 'url', 
                phone_number: '123-456-7891'
            });
     
            console.log("Finished creating initial users.");
        } catch (error) {
            console.error("Error creating initial users!");
            console.log(error);
        }
    };

    // Method: createInitialSalonSuite:
    async function createInitialSalonSuite() {
        try {
            console.log("Creating initial salon suite...");
            const initialSuite = await createSuite({
                user_id: 1, 
                franchise_location: "Chicago: South Loop",
                suite_number: "Suite 101",
                services: "Haircut, Coloring, Styling"
            });
            console.log("Initial salon suite created: ", initialSuite);
        } catch (error) {
            console.error("Error creating initial salon suite!");
            console.error(error);
        }
    };

    // Method: createInitialSalonRenter
    async function createInitialSalonRenter() {
        try {
            console.log("Creating initial salon renter...");
            const renter = await createRenter({
                user_id: 1, 
                suite_id: 1, 
                rent_start_date: '2023-08-01', 
                rent_end_date: '2024-08-01', 
                monthly_rental_fee: 300.00, 
                lease_contract_link: 'www.example.com/leasecontract.pdf'
            });
            console.log(renter);
            console.log("Finished creating initial salon renter.");
        } catch(error){
            console.log("Error creating initial salon renter!")
            console.log(error)
        }
    };

    // Method: createInitialService
    async function createInitialService() {
        try {
            console.log("Creating initial service...");
            const service = await createService({
                user_id: 1, 
                name: "Haircut",
                description: "Includes wash, cut, and style.", 
                price: 35.00,
                duration: 60,
                image_link: 'www.example.com/image.jpg'
            });
            console.log(service);
            console.log("Finished creating initial service.");
        } catch(error){
            console.log("Error creating initial service!")
            console.log(error)
        }
    };

    

    
    // Rebuild DB
    async function rebuildDB() {
        try {
            client.connect();
            await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialSalonSuite();
            await createInitialSalonRenter();
            await createInitialService();


        } catch (error) {
            console.log("Error during rebuildDB!")
            console.log(error.detail);
        }
    };

    // Test DB
    async function testDB() {
        try {
          console.log("Starting to test database...");
      
          // User Testing
            // Test createUser
            // console.log("Calling createUser...");
            // const usersData = [
            //     {
            //     username: 'Owner1',
            //     password: 'Dalron',
            //     email: 'user1@example.com',
            //     full_name: 'Dalron J. Robertson',
            //     user_role: 'stylist',
            //     profile_image: 'url',
            //     phone_number: '123-456-7890',
            //     },
            //     {
            //     username: 'Owner2',
            //     password: 'Dalron',
            //     email: 'user2@example.com',
            //     full_name: 'Mrs. Robertson',
            //     user_role: 'customer',
            //     profile_image: 'url',
            //     phone_number: '123-456-7891',
            //     },
            // ];
        

            // Test createUser
            // console.log("Calling createUser...");
            // const createdUsers = [];
            // for (const userData of usersData) {
            //   const user = await createUser(userData);
            //   createdUsers.push(user);
            //   console.log("Created user", user);
            // }

            // // Test getAllUsers
            // console.log("Calling getAllUsers...");
            // const allUsers = await getAllUsers();
            // console.log("All users", allUsers);
        
            // // Test getUserById
            // console.log("Calling getUserById for the first user...");
            // const singleUserById = await getUserById(createdUsers[1].id);
            // console.log("User by ID", singleUserById);
        
            // // Test getUserByUsername
            // console.log("Calling getUserByUsername for the second user...");
            // const singleUserByUsername = await getUserByUsername(usersData[1].username);
            // console.log("User by Username", singleUserByUsername);
        
            // console.log("Finished testing database.");


        // Test Salon Suite
            // console.log("Creating a new suite...");
            // const newSuite = await createSuite({
            //     user_id: 1, 
            //     franchise_location: "Chicago: South Loop",
            //     suite_number: "Suite 101",
            //     services: "Haircut, Coloring, Styling"
            // });
            // console.log(newSuite);

            // Test getSuiteById 
            // console.log("Getting suite by id...");
            // const suite = await getSuiteById(newSuite.id);
            // console.log(suite);

            // Test getAllSuites 
            // console.log("Getting all suites...");
            // const allSuites = await getAllSuites();
            // console.log(allSuites);

            // Test updateSuite 
            // console.log("Updating suite...");
            // const updatedSuite = await updateSuite({
            //     id: newSuite.id,
            //     user_id: newSuite.user_id,
            //     franchise_location: "Chicago: South Loop",
            //     suite_number: "Suite 102",
            //     services: "Haircut, Coloring, Styling, Makeup"
            // });
            // console.log(updatedSuite);

            // Test deleteSuite 
            // console.log("Deleting suite...");
            // await deleteSuite(updatedSuite.id);
            // console.log("Suite deleted.");


        // Test Salon Renter
            // console.log("Creating a new renter...");
            // const newRenter = await createRenter({
            //     user_id: 1, 
            //     suite_id: 1,
            //     rent_start_date: '2023-08-01', 
            //     rent_end_date: '2024-08-01', 
            //     monthly_rental_fee: 300.00, 
            //     lease_contract_link: 'www.example.com/leasecontract.pdf'
            // });
            // console.log(newRenter);
            
            // Test getRenterById 
            // console.log("Getting renter by id...");
            // const renter = await getRenterById(newRenter.id);
            // console.log(renter);
            
            // Test getRentersByUserId 
            // console.log("Getting renter by user id...");
            // const rentersByUser = await getRentersByUserId(newRenter.user_id);
            // console.log(rentersByUser);
            
            // Test getAllRenters 
            // console.log("Getting all renters...");
            // const allRenters = await getAllRenters();
            // console.log(allRenters);
            
            // Test updateRenter 
            // console.log("Updating renter...");
            // const updatedRenter = await updateRenter({
            //     id: newRenter.id,
            //     user_id: newRenter.user_id, 
            //     suite_id: newRenter.suite_id,
            //     rent_start_date: '2024-08-01', // Notice the column name here
            //     rent_end_date: '2025-08-01', 
            //     monthly_rental_fee: 350.00, 
            //     lease_contract_link: 'www.example.com/new_leasecontract.pdf'
            // });
            // console.log(updatedRenter);
           
            // Test deleteRenter 
            // console.log("Deleting renter...");
            // await deleteRenter(updatedRenter.id);
            // console.log("Renter deleted.");


        // Test Services
            console.log("Creating a new service...");
            const newService = await createService({
                user_id: 1, 
                name: "Hair Styling",
                description: "Includes hair wash, styling, and finish.", 
                price: 30.00,
                duration: 90,
                image_link: 'www.example.com/image2.jpg'
            });
            console.log(newService);

            // Test getServiceById 
            console.log("Getting service by id...");
            const service = await getServiceById(newService.id);
            console.log(service);

            // Test getAllServices 
            console.log("Getting all services...");
            const allServices = await getAllServices();
            console.log(allServices);

            // Test updateService 
            console.log("Updating service...");
            const updatedService = await updateService({
                id: newService.id,
                user_id: newService.user_id, 
                name: "Hair Styling Deluxe",
                description: "Includes hair wash, deep conditioning, styling, and finish.", 
                price: 50.00,
                duration: 120, 
                image_link: 'www.example.com/image2_deluxe.jpg'
            });
            console.log(updatedService);

            // Test deleteService 
            console.log("Deleting service...");
            await deleteService(updatedService.id);
            console.log("Service deleted.");


        } catch (error) {
        console.log("Error during testDB!");
        console.log(error);
        }
    };
        
   // Rebuild Call
    rebuildDB()
        .then(testDB)
        .catch(console.error)
        .finally(() => client.end())