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

-- **test**/

    -- appointments.test.js

    -- favorites.test.js

    -- franchiseLocations.test.js

    -- index.test.js

    -- messages.test.js

    -- notifications.test.js

    -- payments.test.js

    -- promotions.test.js

    -- review.test.js

    -- salonRenters.test.js

    -- salonSuites.test.js

    -- services.test.js

    -- users.test.js

-- appointments.js

-- favorites.js

-- franchiseLocations.js

-- index.js

-- messages.js

-- notifications.js

-- payments.js

-- promotions.js

-- review.js

-- salonRenters.js

-- salonSuites.js

-- seed.js

-- services.js

-- users.js

### /db <a name="db"></a>

This directory includes all the files related to the database. It contains the database configuration files and SQL scripts for creating and seeding the database.

-- appointments.js

-- favorites.js

-- franchiseLocations.js

-- index.js

-- messages.js

-- notifications.js

-- payments.js

-- promotions.js

-- review.js

-- salonRenters.js

-- salonSuites.js

-- seed.js

-- services.js

-- users.js 1. **Imports and Requires** - This block of code requires dependencies and files used throughout the module. It includes the client from the index file (which should be a PostgreSQL client based on the usage) and the bcrypt library used for password hashing and comparison. 2. createUser Function - This function takes an object with various properties (username, password, email, full_name, user_role, profile_image, phone_number) as an argument, hashes the password, and inserts a new user into the 'users' table in the database. If a user with the same username already exists, nothing will happen due to ON CONFLICT (username) DO NOTHING. 3. getAllUsers Function - The function retrieves all users from the 'users' table in the database, excluding their passwords for security reasons. 4. getUserById Function - This function accepts a user's ID as an argument and retrieves the corresponding user from the database, returning only the ID and username. 5. getUserByUsername Function - The function accepts a username as an argument and retrieves the corresponding user from the database. It returns the user's full profile except for the password. 6. loginUser Function - This function accepts an object containing a username and password, and attempts to log the user in. If the user is not found or the password does not match, an error is thrown. The password is deleted from the returned user object for security reasons. 7. deleteUser Function - This function deletes a user from the database based on their username. It performs a cascading delete, removing related data from the 'salon_renters' and 'salon_suites' tables before deleting the user from the 'users' table. It uses SQL transactions to ensure data consistency. 8. updateUser Function - This function updates a user's profile based on the fields provided. It takes a username and an object of fields to update. If the 'password' field is included, it will be hashed before being stored. It returns the updated user object. 9. Exports - The module exports all the user-related functions for use in other parts of the application.

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
