// Step 1: Import Client & Exports
const { create } = require('domain');
const { client } = require('./index');

// Page Imports
const { createUser, getAllUsers, getUserById, getUserByUsername, loginUser } = require('./users');
const { createSuite, getSuiteById, getAllSuites, updateSuite, deleteSuite } = require('./salonSuites');
const { createRenter, getRenterById, getRentersByUserId, getAllRenters, updateRenter, deleteRenter } = require('./salonRenters');
const { createService, getAllServices, getServiceById, getServicesByUser, updateService, deleteService} = require('./services');
const { createAppointment, getAppointmentById, getAllAppointments, updateAppointment, deleteAppointment} = require('./appointments');
const { createPayment, getPaymentById, getAllPayments, updatePayment, deletePayment } = require('./payments');
const { createReview, getReviewById, getAllReviews, updateReview, deleteReview} = require ('./reviews');
const { createFranchiseLocation, getAllFranchiseLocations, getFranchiseLocationById, updateFranchiseLocation, getFranchiseLocationByName} = require('./franchiseLocations');
const { createMessage, getMessagesByUserId, updateMessage, deleteMessage, getAllMessages,} = require('./messages');

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
            DROP TABLE IF EXISTS services CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
            DROP TABLE IF EXISTS promotions CASCADE;
            DROP TABLE IF EXISTS business_hours CASCADE;
            DROP TABLE IF EXISTS franchise_locations CASCADE;
        `);
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
            CREATE TABLE franchise_locations(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                address VARCHAR(255),
                city VARCHAR(50),
                state VARCHAR(50),
                zip_code VARCHAR(10),
                country VARCHAR(50),
                phone_number VARCHAR(15),
                business_hours TEXT,
                email VARCHAR(255),
                additional_info TEXT
            );
            CREATE TABLE salon_suites(
                id SERIAL PRIMARY KEY,
                franchise_location_id INTEGER REFERENCES franchise_locations(id),
                user_id INTEGER REFERENCES users(id),
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
            CREATE TABLE IF NOT EXISTS appointments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL, 
                service_id INTEGER REFERENCES services(id) NOT NULL,
                renter_id INTEGER REFERENCES salon_renters(id) NOT NULL, 
                appointment_date TIMESTAMP NOT NULL,
                appointment_end_date TIMESTAMP NOT NULL,
                UNIQUE(user_id, service_id, appointment_date),
                status VARCHAR(255) NOT NULL DEFAULT 'Booked',
                created_at TIMESTAMP DEFAULT NOW(), 
                updated_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS payments (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) NOT NULL, 
                appointment_id INTEGER REFERENCES appointments(id) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                payment_date TIMESTAMP NOT NULL,
                transaction_id VARCHAR(255),
                status VARCHAR(255) NOT NULL DEFAULT 'Pending',
                payment_method VARCHAR(255),
                created_at TIMESTAMP DEFAULT NOW(), 
                updated_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE reviews(
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                service_id INTEGER REFERENCES services(id),
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                content TEXT,
                created_at TIMESTAMP DEFAULT NOW(), 
                updated_at TIMESTAMP DEFAULT NOW()
            );
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                sender_id INTEGER REFERENCES users(id) NOT NULL,
                receiver_id INTEGER REFERENCES users(id) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                read_status BOOLEAN DEFAULT false
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

    // Method: createInitialFranchiseLocations:
    async function createInitialFranchiseLocations() {
        try {
            console.log("Creating initial franchise location...");
            const location = await createFranchiseLocation({
                name: "Chicago: South Loop",
                address: "1400 S Wabash Ave",
                city: "Chicago",
                state: "IL",
                zip_code: "60605",
                country: "USA",
                phone_number: "+13128282745", 
                business_hours: "24/7",
                email: "info@chicagosouthloop.example.com", 
                additional_info: "24/7 access to the building."
            });
            console.log("Initial franchise location created: ", location);
        } catch (error) {
            console.error("Error creating initial franchise location!");
            console.error(error);
        }
    };
    
    // Method: createInitialSalonSuite:
    async function createInitialSalonSuite() {
        try {
            console.log("Creating initial salon suite...");
            const initialSuite = await createSuite({
                user_id: 1, 
                franchise_location_id: 1,
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

    // Method: createInitialAppointments
    async function createInitialAppointments() {
        try {
            console.log("Creating initial appointments...");
            const appointment1 = await createAppointment({
                userId: 1,
                serviceId: 1, 
                renterId: 1,
                appointmentDate: new Date('2023-08-01T10:00:00'),
                appointmentEndDate: new Date('2023-08-01T11:00:00')
            });
            console.log(appointment1);
            console.log("Finished creating initial appointments.");
        } catch (error) {
            console.log("Error creating initial appointments!");
            console.log(error);
        }
    };

    // Method: createInitialPayments
    async function createInitialPayments() {
        try {
            console.log("Creating initial payments...");

            const payment1 = await createPayment({
                userId: 1,
                appointmentId: 1,
                amount: 50,
                paymentDate: new Date(),
                transactionId: "txn_1J2rZG2eZvKYlo2C5SCe2KHS",
                status: "Completed",
                paymentMethod: "Credit Card"
            });

            console.log(payment1);
            console.log("Finished creating initial payments.");
        } catch (error) {
            console.log("Error creating initial payments!");
            console.log(error);
        }
    };

    // Method: createInitialReviews
    async function createInitialReviews() {
        try {
            console.log("Creating initial reviews...");
            const review1 = await createReview({
                userId: 1,
                serviceId: 1, 
                rating: 5,
                content: "Great service! Would definitely recommend."
            });
            console.log(review1);
            console.log("Finished creating initial reviews.");
        } catch (error) {
            console.log("Error creating initial reviews!");
            console.log(error);
        }
    };

// Method: createInitialMessages
async function createInitialMessages() {
    try {
        console.log("Creating initial messages...");

        const message1 = await createMessage({
            sender_id: 1, 
            receiver_id: 2,
            content: "Hello! Looking forward to our appointment."
        });
        console.log("Message 1 created: ", message1);

        const message2 = await createMessage({
            sender_id: 2, 
            receiver_id: 1,
            content: "Hi, me too! Please confirm the time."
        });
        console.log("Message 2 created: ", message2);

    } catch (error) {
        console.error("Error creating initial messages!");
        console.error(error);
    }
};

    

    
    // Rebuild DB
    async function rebuildDB() {
        try {
            client.connect();
            await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialFranchiseLocations();
            await createInitialSalonSuite();
            await createInitialSalonRenter();
            await createInitialService();
            await createInitialAppointments();
            await createInitialPayments();
            await createInitialReviews();
            await createInitialMessages();


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

        // Test Franchise Locations

            // Test getAllFranchiseLocations
            // console.log("Calling getAllFranchiseLocations...");
            // const allLocations = await getAllFranchiseLocations();
            // console.log("All locations", allLocations);

            // Test getFranchiseLocationById
            // console.log("Calling getFranchiseLocationById for the first location...");
            // const singleLocationById = await getFranchiseLocationById(allLocations[0].id);
            // console.log("Location by ID", singleLocationById);

            // Test getFranchiseLocationByName
            // console.log("Calling getFranchiseLocationByName...");
            // const singleLocationByName = await getFranchiseLocationByName(allLocations[0].name);
            // console.log("Location by name", singleLocationByName);

            // Test updateFranchiseLocation
            // console.log("Calling updateFranchiseLocation for the first location...");
            // const updatedLocationData = {
            //     name: "Updated Name",
            //     address: "Updated Address",
            //     city: "Updated City",
            //     state: "Updated State",
            //     zip_code: "60605",
            //     country: "Updated Country",
            //     phone_number: "13124995648",
            //     business_hours: "Updated Business Hours",
            //     email: "Updated Email",
            //     additional_info: "Updated Additional Info"
            // };
            // const updatedLocation = await updateFranchiseLocation(allLocations[0].id, updatedLocationData);
            // console.log("Updated Location", updatedLocation);

            // console.log("Finished testing franchise locations database.");


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
            // console.log("Creating a new service...");
            // const newService = await createService({
            //     user_id: 1, 
            //     name: "Hair Styling",
            //     description: "Includes hair wash, styling, and finish.", 
            //     price: 30.00,
            //     duration: 90,
            //     image_link: 'www.example.com/image2.jpg'
            // });
            // console.log(newService);

            // Test getServiceById 
            // console.log("Getting service by id...");
            // const service = await getServiceById(newService.id);
            // console.log(service);

            // Test getAllServices 
            // console.log("Getting all services...");
            // const allServices = await getAllServices();
            // console.log(allServices);

            // Test updateService 
            // console.log("Updating service...");
            // const updatedService = await updateService({
            //     id: newService.id,
            //     user_id: newService.user_id, 
            //     name: "Hair Styling Deluxe",
            //     description: "Includes hair wash, deep conditioning, styling, and finish.", 
            //     price: 50.00,
            //     duration: 120, 
            //     image_link: 'www.example.com/image2_deluxe.jpg'
            // });
            // console.log(updatedService);

            // Test deleteService 
            // console.log("Deleting service...");
            // await deleteService(updatedService.id);
            // console.log("Service deleted.");


        // Test Appointments
            // Test getAllAppointments
            // console.log("\n---Testing Appointments---");
            // console.log("Getting all appointments...");
            // let appointments = await getAllAppointments();
            // console.log(appointments);
        
            // Test getAppointmentById
            // console.log("\nGetting appointment with id 1...");
            // let appointment = await getAppointmentById(1);
            // console.log(appointment);

            // Test updateAppointment
            // console.log("\nUpdating appointment with id 1...");
            // let updatedAppointment = await updateAppointment({
            //     id: 1,
            //     userId: 1, 
            //     serviceId: 1, 
            //     renterId: 1, 
            //     appointmentDate: new Date('2023-08-02T10:00:00'), 
            //     appointmentEndDate: new Date('2023-08-02T11:00:00'), 
            //     status: 'Completed'
            // });
            // console.log(updatedAppointment);
        
             // Test deleteAppointment           
            // console.log("\nDeleting appointment with id 1...");
            // let result = await deleteAppointment(1);
            // console.log(result);
        
            // console.log("---Finished Testing Appointments---\n");

        // Test Payments
                // Test getAllPayments
                // console.log("Getting all payments...");
                // const allPayments = await getAllPayments();
                // console.log(allPayments);

                // Test getPaymentById
                // console.log("Getting payment by ID...");
                // const payment = await getPaymentById(1);
                // console.log(payment);

                // Test updatePayment
                // console.log("Updating payment with id 1...");
                // const updatedPayment = await updatePayment({
                //     id: 1,
                //     userId: 1,
                //     appointmentId: 1,
                //     amount: 60,
                //     paymentDate: new Date(),
                //     transactionId: "txn_1J2rZG2eZvKYlo2C5SCe2KHS",
                //     status: "Completed",
                //     paymentMethod: "Credit Card"
                // });
                // console.log(updatedPayment);

        // Test Reviews
                // console.log("---Starting to Test Reviews---");

            // Test getAllReviews
                // console.log("Getting all reviews...");
                // const allReviews = await getAllReviews();
                // console.log("All Reviews:", allReviews);

            // Test getReviewById
                // console.log("Getting review with id 1...");
                // const reviewById = await getReviewById(1);
                // console.log("Review with ID 1:", reviewById);

            // Test updateReview
                // console.log("Updating review with id 1...");
                // const updatedReview = await updateReview({id: 1, rating: 4, content: "Service was good."});
                // console.log("Updated Review:", updatedReview);
                // console.log("---Finished Testing Reviews---");


        // Test Messages

            console.log("Testing 'createInitialMessages'...");
            await createInitialMessages();
            
        // Test getAllMessages
            console.log("Getting all messages...");
            const allMessages = await getAllMessages();
            console.log("All Messages: ", allMessages);

        // Test getMessagesByUserId
            console.log("Getting message by id...");
            const message = await getMessagesByUserId(allMessages[0].id);
            console.log("Message: ", message);

        // Test updateMessage
            console.log("Updating first message...");
            const updatedMessage = await updateMessage(allMessages[0].id, {
                content: "This message has been updated."
            });
            console.log("Updated Message: ", updatedMessage);

        // Test deleteMessage
            console.log("Deleting first message...");
            const deletedMessage = await deleteMessage(allMessages[0].id);
            console.log("Deleted Message: ", deletedMessage);

        // Test getAllMessages
            console.log("Getting all messages after delete...");
            const allMessagesAfterDelete = await getAllMessages();
            console.log("All Messages After Delete: ", allMessagesAfterDelete);

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