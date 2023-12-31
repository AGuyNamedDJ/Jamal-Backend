# Jamāl-Backend

## Description <a name="description"></a>

Jamāl-Backend is the robust server-side solution for a salon suite management platform. Developed with modern technologies like Node.js, Express.js, and PostgreSQL, it provides the robustness and scalability needed for a high-traffic system.

The application showcases a clean, modular structure designed around RESTful principles. It exposes endpoints for an extensive range of operations - from user registration and authentication to intricate management functions for appointments, clients, and staff.

Security is a paramount consideration in the design of Jamāl-Backend. It leverages bcrypt for secure password hashing, alongside JWT-based authentication to ensure user sessions remain secure.

Moreover, it exhibits a comprehensive error-handling strategy to ensure system robustness and maintainability. It has a systematic logging setup using Morgan, which helps track activity and diagnose potential issues.

The application's data persistence is managed through PostgreSQL, reflecting an understanding of relational databases and SQL. The utilization of the pg library demonstrates seamless interaction between the Node.js environment and the database.

The application follows the twelve-factor app methodology, with configurations stored in the environment rather than in the codebase, enhancing security and scalability. This approach is enabled through the use of dotenv for environment variable management.

Lastly, the testing framework Jest, in combination with Supertest for HTTP assertions, is used to uphold the quality of the codebase. These tools ensure that all components function as intended and continue to do so as the application evolves.

Overall, Jamāl-Backend embodies a high level of technical competency and a thoughtful, future-oriented design approach.

---

## Table of Contents <a name="table-of-contents"></a>

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [File & Directory Structure](#file-directory-structure)
   - [api/](#api)
   - [db/](#db)
5. [APIs & Libraries Used](#api)
6. [Testing](#testing)
7. [Credits](#credits)
8. [Contact Information](#contact-information)

---

## Installation <a name="installation"></a>

To get this project running on your local machine, follow the steps mentioned below.

### Prerequisites

Ensure that you have Node.js and npm (Node Package Manager) installed on your machine. You can verify if you have these installed by running the following commands in your terminal/command prompt:

    npm -v

If these commands return versions, then you have the necessary installations to proceed. If not, please install Node.js and npm first.

### Steps

1. Clone the repository

Open a terminal/command prompt and navigate to the folder where you want to clone the repository. Run the following command:

    git clone https://github.com/AGuyNamedDJ/Jamal-Backend.git

2. Navigate to the project directory

   cd Jamal-Backend

3. Install dependencies

Once you're in the root directory of the project, install the required dependencies by running:

npm install

This command will install all the project's dependencies mentioned in the package.json file, including React, React-DOM, cors, bcrypt, morgan, and others.

4. Start the server

Once all the dependencies are installed, you can start the server:

    npm start

This will start the server and the website should be available at localhost:3000 (or a port that your terminal indicates).

Note: If changes are made to the package.json file, you will need to stop the server (Ctrl + C in the terminal), reinstall the dependencies (npm install), and then start the server again (npm start).

Please ensure you have the necessary access rights and permissions when performing the above operations. If you encounter any issues, please refer to the 'issues' section of the repository.

---

## Usage <a name="usage"></a>

Jamāl-Backend is primarily intended to be used in conjunction with the corresponding frontend application. It exposes several endpoints for handling salon suite management functions, such as:

- User Registration and Authentication
- Appointment Scheduling
- Client Management
- Staff Management

Please refer to the API documentation for detailed information on how to interact with these endpoints.

---

## File & Directory Structure <a name="file-directory-structure"></a>

### /api <a name="api"></a>

This directory contains all the routes for the application. It's divided into subdirectories based on functionality, e.g., auth, appointments, clients, staff, etc.

    -- __test__/
        -- appointments.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/appointments/:id: This test checks if a GET request to this endpoint returns the correct appointment item.
                - PATCH /api/appointments/:id: This test verifies if a PATCH request correctly updates an existing appointment. The date comparison takes into account the possibility of slight discrepancies, allowing for a difference of less than one day.
                - DELETE /api/appointments/:id: This test ensures that a DELETE request correctly removes an appointment. It also verifies that a subsequent GET request for the same appointment returns a 404 status code, indicating that the appointment no longer exists.

        -- favorites.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/favorites/:id: This test verifies if a GET request to this endpoint returns the correct favorite item.
                - POST /api/favorites: This test checks if a POST request correctly creates a new favorite item.
                - DELETE /api/favorites/:id: This test ensures that a DELETE request correctly removes a favorite item.

        -- franchiseLocations.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/locations: This test case sends a GET request to /api/locations, expecting a 200 status code in response and the response body to be an array containing at least one object (a franchise location).
                - POST /api/locations: This test case sends a POST request to /api/locations with the information of a new franchise location. It expects a 200 status code in response and the response body to match the new location object that was sent.
                - GET /api/locations/:id: This test case sends a GET request to /api/locations with a specific location's ID. It expects a 200 status code in response and the response body to match the previously created testLocation object.
                - PATCH /api/locations/:id: This test case sends a PATCH request to /api/locations with a specific location's ID and a payload containing the updated data (in this case, the name of the location). It expects a 200 status code in response and the name of the location in the response body to match the new name.
                - DELETE /api/locations/:id: This test case sends a DELETE request to /api/locations with a specific location's ID. It expects a 200 status code in response and the response body to match the testLocation object. After deleting, it retrieves the location using its ID to ensure it has indeed been deleted

        -- index.test.js
            1. Imports:
                - Import functions
            2. Test:
                - Server Running Test
                    - Checks if the server is running by accessing the root route /. Since it's not defined, it expects a 404 status code.
                - API Route Test
                    - Accesses the /api route and checks if it's working correctly. It expects a 200 status code and a message API is running.
                - Get All Users Test
                    - Sends a GET request to /api/users. It expects a 200 status code and an array of users.

        -- messages.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/messages: Checks that the endpoint correctly returns a list of messages.
                - POST /api/messages: Tests the creation of a new message and subsequently deletes it.
                - DELETE /api/messages/:id: Validates the deletion of a specific message.

        -- notifications.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - POST /api/notifications: Validates the creation of a new notification.
                - GET /api/notifications/:id: Confirms a specific notification can be fetched using its id.
                - PUT /api/notifications/:id: Checks whether a specific notification can be updated.
                - DELETE /api/notifications/:id: Tests the deletion of a specific notification.

        -- payments.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/payments/:id: Checks if a payment can be fetched using its id.
                - PATCH /api/payments/:id: Tests whether the payment details can be updated.
                - DELETE /api/payments/:id: Validates if a payment can be deleted successfully.

        -- promotions.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/promotions/:id: Validates a promotion can be retrieved by its id.
                - POST /api/promotions: Tests the creation of a new promotion.
                - DELETE /api/promotions/:id: Ensures a promotion can be successfully deleted.

        -- review.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - GET /api/reviews/:id: Verifies a review can be fetched by its id.
                - POST /api/reviews: Tests the creation of a new review.
                - PATCH /api/reviews/:id: Updates a review and validates the change.
                - DELETE /api/reviews/:id: Checks if a review can be successfully deleted.

        -- salonRenters.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Test:
                - POST /api/renter and GET /api/renter/:id: Tests the creation of a new renter and retrieves the same using its id.
                - GET /api/renter/:id: Checks if a renter with a specific id can be retrieved.
                - PATCH /api/renter/:id: Updates the monthly rental fee of a renter and verifies the change.
                - DELETE /api/renter/:id: Checks if a renter can be successfully deleted.

        -- salonSuites.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
                2. Test:
                    - GET /api/suites: This test verifies that all suites can be retrieved. It checks that the server responds with a 200 status and an array of suites.
                    - POST /api/suites: This test creates a new suite and checks that the server responds with a 200 status and the information of the created suite.
                    - GET /api/suites/:id: This test retrieves a specific suite by id. A suite is created directly in the database using createSuite function. Then the test attempts to retrieve this suite by its id and checks that the server responds with a 200 status and the information of the suite.
                    - PATCH /api/suites/:id: This test updates a suite's information and checks that the server responds with a 200 status and the updated information. A suite is created, updated with a PATCH request, and then the response is checked for the updated information.
                    - DELETE /api/suites/:id: This test deletes a suite and checks that the server responds with a 204 status and that the suite no longer exists in the database. A suite is created and then deleted with a DELETE request. The suite is then attempted to be retrieved again to check it has indeed been deleted.


        -- services.test.js
            1. Requires:
                - Modules like request, app from the server file, and several functions from the services database file are required.
            2. Tests:
                - POST /api/services and GET /api/services/:id: This test case verifies that a new service can be created and then retrieved using its id. A new service is created, the response is checked for the correct status code and service information. The id of the created service is stored in the createdServiceId variable for use in other tests.
                - GET /api/services/:id: This test case verifies that the created service can be retrieved using its id. The response is checked for the correct status code and that the id in the response matches the createdServiceId.
                - PATCH /api/services/:id: This test case verifies that the service can be updated. The service identified by createdServiceId is updated and the response is checked for the correct status code and that the updated information matches the updates sent in the request.
                - DELETE /api/services/:id: This test case verifies that the service can be deleted. The service identified by createdServiceId is deleted, the response is checked for the correct status code, and then the service is attempted to be retrieved again to ensure it has been deleted.

        -- users.test.js
            1. Requires:
                - Modules like request, app from the server file, functions from the users database file, jsonwebtoken and the JWT_SECRET from environment variables are required.
            2. Setup and Cleanup Database Functions:
                - Two users are created in the setupDatabase function, and these users are updated in the cleanupDatabase function.
            3. Tests:
                - PUT /api/users/update/:username: This test case verifies that a user can be updated. A unique user is created, a token is generated for that user, and then the user is updated with new data.
                - GET /api/users: This test case verifies that all users can be fetched.
                - GET /api/users/profile/:username: This test case verifies that a specific user's profile can be fetched. The user is identified by their username.
                - POST /api/users/register: This test case verifies that a new user can be registered. A unique user is created and the response is checked for the correct status code and user information.
                - POST /api/users/login: This test case verifies that an existing user can log in. The response is checked for the correct status code and presence of a token.

    -- appointments.js
        1. Imports:
            - Express, appointmentsRouter, and a collection of methods from the appointments database file are imported.
        2. Endpoints:
            - GET /: Returns all appointments.
            - GET /:id: Returns a specific appointment identified by its ID. If the appointment doesn't exist, a 404 status code and a 'not found' message are sent.
            - POST /: Creates a new appointment with the data in the request body.
            - PATCH /:id: Updates a specific appointment identified by its ID with the data in the request body.
            - DELETE /:id: Deletes a specific appointment identified by its ID. Sends a 'deleted' message upon success.
        3. Exports:
            - Exports appointmentsRouter for use elsewhere in the application.

    -- favorites.js
        1. Imports:
            - Express, favoritesRouter, and a collection of methods from the favorites database file are imported.
        2. Endpoints:
            - POST /: Creates a new favorite with the data in the request body.
            - GET /: Returns all favorites.
            - GET /:id: Returns a specific favorite identified by its ID.
            - DELETE /:id: Deletes a specific favorite identified by its ID.
        3. Logging Middleware:
            - Logs a console message whenever a request is made to any /favorites endpoint.
        4. Exports:
            - Exports favoritesRouter for use elsewhere in the application.

    -- franchiseLocations.js
        1. Imports:
            - The express and franchiseLocationsRouter are imported, as well as several functions from the franchiseLocations database file.
        2. Endpoints:
            - GET /: Fetches and returns all franchise locations.
            - GET /:id: Fetches a specific franchise location by its ID and returns it. If the location isn't found, an error message is returned.
            - POST /: Creates a new franchise location with the data in the request body and returns the created location.
            - PATCH /:id: Updates a specific franchise location with data provided in the request body. Only fields provided in the request body will be updated.
            - DELETE /:id: Deletes a specific franchise location by its ID and returns the deleted location.
        3. Exports:
            - The franchiseLocationsRouter is exported for use in other parts of the application.

    -- index.js
        1. Imports:
            - The dotenv module, express, express router, JSON Web Token (JWT), a function from a users database file, and a secret JWT key from environment variables are imported.
        2. JWT Middleware:
            - This middleware checks the 'Authorization' header of each incoming request. If it starts with 'Bearer', it takes the following token and tries to verify it. If it is a valid JWT, the user associated with it is retrieved from the database and added to the request object. If the 'Authorization' header is not present or doesn't start with 'Bearer', the middleware just calls the next middleware/route handler.
        3. Endpoints:
            - GET /: Returns a simple JSON message.
        4. Error Handling Middleware:
            - This middleware handles all the errors that might occur in the preceding routes. It logs the error and sends a response with a status code of 500 and the error message.
        5. Child Routers:
            - The child routers for different endpoints like appointments, favorites, locations, messages, etc., are imported and attached to the main apiRouter.
        6. Exports:
            - The apiRouter is exported for use in other parts of the application.

    -- messages.js
        1. Imports:
            - The express module, express router, and several functions from the 'messages' database file are imported.
        2. Endpoints:
            - GET /: Retrieves all messages.
            - GET /:userId: Retrieves messages associated with a specific user ID.
            - POST /: Creates a new message with the provided details in the request body.
            - PUT /:id: Updates a specific message by its ID with the provided details in the request body.
            - DELETE /:id: Deletes a specific message by its ID.
        3. Exports:
            - The 'messagesRouter' is exported for use in other parts of the application.

    -- notifications.js
        1. Imports:
            - Express and a router for 'notifications' endpoints are imported, along with several functions from the 'notifications' database file.
        2. Endpoints:
            - GET /: Fetches all notifications.
            - GET /:id: Fetches a specific notification by its ID. If not found, it returns a 404 status.
            - POST /: Creates a new notification with details provided in the request body.
            - PUT /:id: Updates a specific notification identified by its ID. If not found, it returns a 404 status.
            - DELETE /:id: Deletes a specific notification identified by its ID. If not found, it returns a 404 status.
        3. Exports:
            - The 'notificationsRouter' is exported for use in other parts of the application.

    -- payments.js
        1. Imports:
            - The necessary modules are imported, which include Express for setting up the server, a router for handling requests to 'payments' endpoints, and several functions from the 'payments' database file.
        2. Endpoint to createPayment:
            - A POST request to the root of the 'payments' route creates a new payment in the database. The details of the payment are provided in the request body. A HTTP status of 201 (Created) is returned along with the newly created payment.
        3. Endpoint to getAllPayments:
            - A GET request to the root of the 'payments' route retrieves all payments from the database. The payments are sent back as a JSON response.
        4. Endpoint to getPaymentById:
            - A GET request to '/:id' fetches a specific payment by its ID from the database. If the payment doesn't exist, a HTTP 404 (Not Found) status is returned. Otherwise, the payment is returned as a JSON response.
        5. Endpoint to updatePayment:
            - A PATCH request to '/:id' updates a specific payment identified by its ID. The new details for the payment are provided in the body of the request. If the payment doesn't exist, a HTTP 404 (Not Found) status is returned. Otherwise, the updated payment is sent back as a JSON response.
        6. Endpoint to deletePayment:
            - A DELETE request to '/:id' deletes a specific payment identified by its ID from the database. If the operation is successful, a HTTP 204 (No Content) status is returned.
        7. Exports:
            - The 'paymentsRouter' is exported to be used in other parts of the application.

    -- promotions.js
        1. Imports:
            - The required modules and functions are imported. The express module is imported to create the server and a router is created to handle requests to the 'promotions' endpoints. Various functions from the 'promotions' database file are imported.
        2. Middleware:
            - There is a middleware function that logs a message whenever a request is made to the '/promotions' route.
        3. Endpoint to getAllPromotions:
            - A GET request to the root of the 'promotions' path retrieves all promotions from the database.
        4. Endpoint to getPromotionById:
            - A GET request to '/:id' retrieves a specific promotion by its id from the database.
        5. Endpoint to createPromotion:
            - A POST request to the root of the 'promotions' path creates a new promotion in the database. The details for the new promotion are provided in the body of the request.
        6. Endpoint to updatePromotion:
            - A PATCH request to '/:id' updates a specific promotion, identified by its id. The new details for the promotion are included in the body of the request.
        7. Endpoint to deletePromotion:
            - A DELETE request to '/:id' removes a specific promotion, identified by its id, from the database.
        8. Exports:
            - Finally, 'promotionsRouter' is exported so that it can be used in other parts of the application.

    -- review.js
        1. Imports:
            - Imported modules and functions, such as Express for creating the server, and various functions from the 'reviews' database file.
        2. Endpoint to getAllReviews:
            - A GET request to the root of the 'reviews' path retrieves all reviews from the database.
        3. Endpoint to getReviewById:
            - A GET request to '/:reviewId' retrieves a specific review by its id from the database.
        4. Endpoint to createReview:
            - A POST request to the root of the 'reviews' path creates a new review in the database. The details for the new review are provided in the body of the request.
        5. Endpoint to updateReview:
            - A PATCH request to '/:reviewId' updates a specific review, identified by its id. The new details for the review are included in the body of the request.
        6. Endpoint to deleteReview:
            - A DELETE request to '/:reviewId' removes a specific review, identified by its id, from the database.
        7. Exports:
            - Exported 'reviewsRouter' so that it can be used in other parts of the application.

    -- salonRenters.js
        1. Imports:
            - Imported Express for creating the server and various functions from the 'salonRenters' database file. Also created a router using Express to handle requests to the 'salonRenters' endpoints.
        2. Endpoint to getAllRenters:
            - A GET request to the root of the 'salonRenters' path retrieves all renters from the database.
        3. Endpoint to getRenterById:
            - A GET request to '/:id' retrieves a specific renter by their id from the database.
        4. Endpoint to getRentersByUserId:
            - A GET request to '/user/:userId' fetches all renters associated with a specific user, identified by their user id.
        5. Endpoint to createRenter:
            - A POST request to the root of the 'salonRenters' path creates a new renter in the database. The details for the new renter are provided in the body of the request.
        6. Endpoint to updateRenter:
            - A PATCH request to '/:id' updates a specific renter, identified by their id. The new details for the renter are included in the body of the request.
        7. Endpoint to deleteRenter:
            - A DELETE request to '/:id' removes a specific renter, identified by their id, from the database.
        8. Exports:
            - Exported 'salonRentersRouter' so that it can be used in other parts of the application.

    -- salonSuites.js
        1. Imports:
            - The Express server and the functions from the services database file are imported.
        2. Router Middleware:
            - The router for handling services' endpoints is created.
        3. Endpoint to createService:
            - A POST request to create a new service in the database is handled. The service details are sent in the body of the request.
        4. Endpoint to getAllServices:
            - A GET request to fetch all the services from the database is handled.
        5. Endpoint to getServiceById:
            - A GET request to fetch a specific service by its id from the database is handled.
        6. Endpoint to getServicesByUser:
            - A GET request to fetch all the services offered by a specific user is handled.
        7. Endpoint to updateService:
            - A PATCH request to update the details of a service in the database is handled. The id of the service to be updated is sent in the parameters, and the new details are sent in the body of the request.
        8. Endpoint to deleteService:
            - A DELETE request to remove a service from the database is handled. The id of the service to be deleted is sent in the parameters.
        9. Exports:
            - The servicesRouter is exported for use in other modules.

    -- services.js
        1. Imports:
            - The Express server and the functions from the services database file are imported.
        2. Router Middleware:
            - The router for handling services' endpoints is created.
        3. Endpoint to createService:
            - A POST request to create a new service in the database is handled. The service details are sent in the body of the request.
        4. Endpoint to getAllServices:
            - A GET request to fetch all the services from the database is handled.
        5. Endpoint to getServiceById:
            - A GET request to fetch a specific service by its id from the database is handled.
        6. Endpoint to getServicesByUser:
            - A GET request to fetch all the services offered by a specific user is handled.
        7. Endpoint to updateService:
            - A PATCH request to update the details of a service in the database is handled. The id of the service to be updated is sent in the parameters, and the new details are sent in the body of the request.
        8. Endpoint to deleteService:
            - A DELETE request to remove a service from the database is handled. The id of the service to be deleted is sent in the parameters.
        9. Exports:
            - The servicesRouter is exporte

    -- users.js
        1. Imports:
            - The express server, database methods, jwt for authentication, dotenv for environment variables, and bcrypt for password hashing are all imported.
        2. Router Middleware:
            - The router for handling users' endpoints is set up.
        3. Authenticate Middleware:
            - A middleware function is created to authenticate users by verifying the JWT passed in the authorization header of the request.
        4. Router Handlers:
            - The server logs a message whenever a request is made to the users' route.
        5. Endpoint to getAllUsers:
            - Retrieves all users from the database and sends the response.
        6. Endpoint to register:
            - Allows a new user to register. The function first checks whether the username already exists. If not, it creates a new user and returns a signed JWT along with the new user data.
        7. Endpoint to login:
            - Logs in a user. The function checks whether the provided username and password are valid, signs a new JWT, and sends it in the response.
        8. Endpoint to getUserByUsername:
            - Fetches a user by their username and sends the response.
        9. Endpoint to authenticateUser:
            - Updates a user's data. The function first authenticates the user, then updates their data in the database and sends the response.
        10. Exports:
            - The usersRouter is exported for use in other modules.

### /db <a name="db"></a>

This directory includes all the files related to the database. It contains the database configuration files and SQL scripts for creating and seeding the database.

    -- appointments.js
        1. Imports:
            - The PostgreSQL database client is imported from the index file.
        2. Create Appointment:
            - Inserts a new appointment into the database using userId, serviceId, renterId, appointmentDate, and appointmentEndDate.
        3. Get All Appointments:
            - Retrieves all appointments present in the database.
        4. Get Appointment by ID:
            - Fetches a particular appointment using its ID.
        5. Update Appointment:
            - Updates a specific appointment in the database using id, userId, serviceId, renterId, appointmentDate, appointmentEndDate, and status.
        6. Delete Appointment:
            - Removes a specific appointment from the database using its ID.
        7. Exports:
            - The functions are exported for use in other modules.

    -- favorites.js
        1. Imports:
            - Client for PostgreSQL database interaction is imported from the index file.
        2. Create Favorite:
            - Adds a new favorite to the database using user_id, service_id, and renter_id.
        3. Get All Favorites:
            - Fetches all the favorites from the database.
        4. Get Favorite by ID:
            - Retrieves a specific favorite using its ID.
        5. Delete Favorite:
            - Deletes a specific favorite from the database using its ID.
        6. Exports:
            - Exports all the functions for use in other modules.

    -- franchiseLocations.js
        1. Imports:
            - Imports the client from the index file for PostgreSQL database interaction.
        2. Create Franchise Location:
            - Creates a new franchise location in the database with information including name, address, city, state, zip code, country, phone number, business hours, email, and additional info.
        3. Get All Franchise Locations:
            - Fetches all franchise locations from the database.
        4. Get Franchise Location by ID:
            - Fetches a specific franchise location from the database using its ID.
        5. Get Franchise Location by Name:
            - Fetches a specific franchise location from the database using its name.
        6. Update Franchise Location:
            - Updates a specific franchise location in the database using its ID and the fields to be updated.
        7. Delete Franchise Location:
            - Deletes a specific franchise location from the database using its ID.
        8. Exports:
            - Exports all the functions to be used in other modules.

    -- index.js
        1. Imports:
            - Incorporates the dotenv module for environment variable management and the pg module for PostgreSQL interactions.

        2. Establish a client/DB connection:
            - Sets up a new PostgreSQL client using either the database URL from the environment variables or a default local URL.

        3. Exports:
            - Exports the PostgreSQL client for use in other modules.

    -- messages.js
        1. Requires:
            - Imports the client from the index module.
        2. Method: createMessage:
            - Asynchronously creates a new message.
        3. Method: getAllMessages:
            - Retrieves all messages from the database.
        4. Method: getMessagesByUserId:
            - Fetches all messages associated with a specific user ID.
        5. Method: updateMessage:
            - Updates a specified message in the database.
        6. Method: deleteMessage:
            - Removes a specific message from the database using its ID.
        7. Exports:
            - The script exports the functions for creating, retrieving, updating, and deleting messages.

    -- notifications.js
        1. Requires:
            - Imports the client from the index module.
        2. Method: createNotification:
            - Asynchronously creates a new notification.
        3. Method: getAllNotifications:
            - Retrieves all notifications from the database.
        4. Method: getNotificationById:
            - Fetches a notification using its ID.
        5. Method: updateNotification:
            - Updates a specified notification in the database.
        6. Method: deleteNotification:
            - Removes a specific notification from the database using its ID.
        7. Exports:
            - The script exports the functions for managing notifications in the database.

    -- payments.js
        1. Requires:
            - The script imports the client from the index module.
        2. Method: createPayment:
            - This asynchronous function creates a new payment in the payments table. It takes as parameters the user's ID, appointment ID, amount, payment date, transaction ID, status, and payment method, and returns the created payment object.
       3.  Method: getPaymentById:
            - This function retrieves a specific payment from the payments table in the database using the payment's ID. It returns the payment object if found, else it throws an error.
        4. Method: getAllPayments:
            - This function retrieves all the payments from the payments table in the database. It returns an array of payment objects, or throws an error if the operation fails.
        5. Method: updatePayment:
            - This function updates a specific payment in the payments table in the database. It uses the payment ID to find the specific payment and updates the fields specified in the parameters. It returns the updated payment object, or throws an error if the operation fails.
        6. Method: deletePayment:
            - This function deletes a specific payment from the payments table in the database using the payment's ID. It returns the result of the delete operation, or throws an error if the operation fails.
        7. Exports:
            - The script exports the createPayment, getPaymentById, getAllPayments, updatePayment, and deletePayment functions so they can be used in other parts of the application.

    -- promotions.js
        1. Requires:
            - The script imports the client from the index module.
        2. Method: createPromotion:
            - This function creates a new promotion, associating it with a specific salon renter and service. It inserts the promotion details, including the title, description, start date, end date, promo code, discount type, and discount value, into the database.
        3. Method: getAllPromotions:
            - This function retrieves all promotions from the database.
        4. Method: getPromotionById:
            - This function fetches a specific promotion from the database using its ID.
        5. Method: updatePromotion:
            - This function updates specific fields of a promotion in the database using the promotion's ID.
        6. Method: deletePromotion:
            - This function deletes a specific promotion from the database using its ID.
        7. Exports:
            - The module exports the functions for creating, retrieving, updating, and deleting promotions.

    -- review.js
        1. Requires
            - Description: The script imports the client from the index module.
        2. Method: createReview
            - Description: This function creates a new review with a specified user ID, service ID, rating, and content, and adds it into the database.
        3. Method: getAllReviews
            - Description: This function fetches all the reviews present in the database.
        4. Method: getReviewById
            - Description: This function retrieves a review by its ID from the database.
        5. Method: updateReview
            - Description: This function updates a specific review's rating and content in the database using the review's ID.
        6. Method: deleteReview
            - Description: This function removes a specific review from the database using its ID.
        7. Exports
            - Description: The module exports the functions for creating, retrieving, updating, and deleting reviews.

    -- salonRenters.js
        1. Requires
            - Loads the client from the index.
        2. Method: createRenter
            - Inserts a new renter into the salon_renters database table.
        3. Method: getRenterById
            - Fetches a renter from the database by their ID.
        4. Method: getRentersByUserId
            - Fetches all renters from the database who are associated with a specific user ID.
        5. Method: getAllRenters
            - Retrieves all renters from the database.
        6. Method: updateRenter
            - Updates a renter's information in the database.
        7. Method: deleteRenter
            - Deletes a renter from the database using their ID.
        8. Exports
            - Exports the methods for creating, retrieving, updating, and deleting renters.

    -- salonSuites.js
        1. Requires
            - Loads the client from the index.
        2. Method: createSuite
            - Inserts a new salon suite into the database.
        3. Method: getSuiteById
            - Fetches a salon suite from the database by its ID.
        4. Method: getAllSuites
            - Retrieves all salon suites from the database.
        5. Method: updateSuite
            - Updates a salon suite in the database.
        6. Method: deleteSuite
            - Deletes a salon suite from the database using its ID.
        7. Exports
            - Exports the methods for creating, retrieving, updating, and deleting salon suites.

    -- seed.js
        1. Imports
            - The block imports several functions from multiple modules, which includes operations related to users, salon suites, renters, services, appointments, payments, reviews, franchise locations, messages, notifications, favorites, and promotions.
        2. dropTables Method
            - The dropTables function drops all tables from the database, if they exist. It's primarily used for resetting the database.
        3. createTables Method
            - The createTables function creates several tables in the database. Each table corresponds to different entities such as users, franchise locations, salon suites, salon renters, services, appointments, payments, reviews, favorites, promotions, messages, and notifications. Each table includes specific attributes, constraints, and references as defined in the respective SQL commands.
        4. createInitialUsers
            - This function initializes two user profiles - a stylist and a customer.
        5. createInitialFranchiseLocations
            - This function creates an initial location for a franchise in Chicago.
        6. createInitialSalonSuite:
            - This function establishes an initial salon suite offering haircut, coloring, and styling services.
        7. createInitialSalonRenter
            - This function initializes a salon renter with a one-year lease.
        8. createInitialService
            - This function adds a "Haircut" service, including its details like price, duration, and image.
        9. createInitialAppointments
            - This function schedules an initial appointment.
        10. createInitialPayments
            - This function creates an initial payment related to the appointment made.
        11. createInitialReviews
            - This function adds a positive review for a service.
        12. createInitialFavorites
            - This function sets an initial favorite, marking a renter and service as favorites for a user.
        13. createInitialPromotions
            - This function launches an initial promotion offering a discount for a service.
        14. createInitialMessages
            - This function sends initial messages between two users.
        15. createInitialNotifications
            - This function triggers an initial system notification welcoming a new user to the platform.
        16. Rebuild DB
            - Initializes the database. Drops and recreates tables, then populates them with initial data like users, locations, suites, services, appointments, payments, reviews, favorites, promotions, messages, and notifications.
        17. Test DB
            - Calls the rebuildDB function to initialize the database and test its functionality.

    -- services.js
        1. Imports and Requires
            - The block imports necessary dependencies, particularly the database client from the db module.
        2. createService Method
            - The createService function adds a new service to the 'services' database table. It accepts an object that includes service-related details, including user_id, name, description, price, duration, and image_link.
        3. getAllServices Method
            - The getAllServices function retrieves all services from the 'services' database table.
        4. getServiceById Method
            - The getServiceById function retrieves a specific service from the 'services' table using the provided service ID.
        5. getServicesByUser Method
            - The getServicesByUser function retrieves all services related to a particular user from the 'services' database table. The user is identified using the provided userId.
        6. updateService Method
            - The updateService function updates a service's details in the 'services' database table. It accepts an object that includes the service's ID and the fields to be updated, such as name, description, price, duration, and image_link.
        7. deleteService Method
            - The deleteService function deletes a specific service from the 'services' database table based on the provided service ID.
        8. Exports
            - The module exports all the service-related functions for use in other parts of the application.

    -- users.js
        1. Imports and Requires
            - This block of code requires dependencies and files used throughout the module. It includes the client from the index file (which should be a PostgreSQL client based on the usage) and the bcrypt library used for password hashing and comparison.
        2. createUser Function
            - This function takes an object with various properties (username, password, email, full_name, user_role, profile_image, phone_number) as an argument, hashes the password, and inserts a new user into the 'users' table in the database. If a user with the same username already exists, nothing will happen due to ON CONFLICT (username) DO NOTHING.
        3. getAllUsers Function
            - The function retrieves all users from the 'users' table in the database, excluding their passwords for security reasons.
        4. getUserById Function
            - This function accepts a user's ID as an argument and retrieves the corresponding user from the database, returning only the ID and username.
        5. getUserByUsername Function
            - The function accepts a username as an argument and retrieves the corresponding user from the database. It returns the user's full profile except for the password.
        6. loginUser Function
            - This function accepts an object containing a username and password, and attempts to log the user in. If the user is not found or the password does not match, an error is thrown. The password is deleted from the returned user object for security reasons.
        7. deleteUser Function
            - This function deletes a user from the database based on their username. It performs a cascading delete, removing related data from the 'salon_renters' and 'salon_suites' tables before deleting the user from the 'users' table. It uses SQL transactions to ensure data consistency.
        8. updateUser Function
            - This function updates a user's profile based on the fields provided. It takes a username and an object of fields to update. If the 'password' field is included, it will be hashed before being stored. It returns the updated user object.
        9. Exports
            - The module exports all the user-related functions for use in other parts of the application.

### server.js <a name="server"></a>

This is the main entry point of the application. It sets up the Express server, middleware, and routes.

---

## APIs & Libraries Used <a name="api"></a>

### APIs:

- The application itself serves as a RESTful API.

### Libraries:

- express: For setting up the server and routing.
- pg: For interfacing with PostgreSQL database.
- bcrypt: For password hashing.
- jsonwebtoken: For user authentication.
- cors: For handling CORS.
- dotenv: For environment variable management.
- morgan: For logging HTTP requests.
- jest: For testing.
- supertest: For HTTP assertions.
- nodemon: For automatic server restart during development.

---

## Testing <a name="testing"></a>

This application uses Jest as the testing framework and Supertest for HTTP assertions. To run the tests, navigate to the project directory and run:

    npm test

---

## Credits <a name="credits"></a>

This project is developed and maintained by Dalron J. Robertson.

---

## Contact Information <a name="contact-information"></a>

For any questions or concerns, you can reach out to me through the following methods:

- Email: dalronj.robertson@gmail.com
- Github: [AGuyNamedDJ](https://github.com/AGuyNamedDJ)
- LinkedIn: [Dalron J. Robertson](https://www.linkedin.com/in/dalronjrobertson/)
- Website: [dalronjrobertson.com](https://dalronjrobertson.com)
- YouTube: [AGNDJ](https://youtube.com/@AGNDJ)

I'm always open to feedback, collaboration, or simply a chat. Feel free to get in touch!
